import {REGIONS, ancestors, directory, regionOf, isRelated, editableField, normalizeUI} from './panel-model.js';

const UI_KEY = 'iq-dubai-booth-panels-v1';
const $ = selector => document.querySelector(selector);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shortName = o => o.name.split(' · ').slice(1).join(' · ') || o.name;
const icon = o => ({screen:'▣',cabinet:'▤',hatch:'□',hole:'○',socket:'⌑',strip:'▥',network:'▦',laptop:'▱',ldp:'▱',podium:'▰'}[o.kind] || '◇');

export function createPanels({getItems,getSelected,select,connections,cableTypes,getWarnings,onDisplayChange}) {
  let stored;
  try { stored=JSON.parse(localStorage.getItem(UI_KEY)); } catch { /* UI preferences are optional. */ }
  const state=normalizeUI(stored), media=matchMedia('(max-width: 1099px)');
  let drawer=null, query='', structure='', inspectorId=null, lastConnections='', lastChecks='';
  const nodeElements=new Map(), groupElements=new Map();
  const save=()=>{try{localStorage.setItem(UI_KEY,JSON.stringify(state));}catch{/* Layout export still works. */}};

  function updatePanels() {
    const mobile=media.matches;
    document.body.classList.toggle('compact-panels',mobile);
    document.body.classList.toggle('left-collapsed',!state.leftOpen);
    document.body.classList.toggle('right-collapsed',!state.rightOpen);
    for(const side of ['left','right']) {
      const shown=mobile?drawer===side:state[side+'Open'];
      const panel=$('.'+side+'-panel');
      panel.classList.toggle('drawer-open',mobile&&shown);
      panel.inert=!shown;
      panel.setAttribute('aria-hidden',String(!shown));
      const trigger=$('#open-'+side);
      trigger.hidden=!mobile&&shown;
      trigger.setAttribute('aria-expanded',String(shown));
      $('#close-'+side).setAttribute('aria-label',mobile?'关闭'+(side==='left'?'物件':'属性')+'面板':'收起'+(side==='left'?'物件':'属性')+'面板');
    }
    $('#panel-backdrop').hidden=!mobile||!drawer;
  }
  function closeDrawer() {
    if(!media.matches||!drawer)return false;
    const previous=drawer;drawer=null;updatePanels();$('#open-'+previous).focus();return true;
  }
  for(const side of ['left','right']) {
    $('#open-'+side).onclick=()=>{if(media.matches)drawer=side;else state[side+'Open']=true;save();updatePanels();$('#close-'+side).focus();};
    $('#close-'+side).onclick=()=>{if(media.matches)closeDrawer();else{state[side+'Open']=false;save();updatePanels();$('#open-'+side).focus();}};
  }
  $('#panel-backdrop').onclick=closeDrawer;
  media.addEventListener('change',()=>{drawer=null;updatePanels();});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&closeDrawer()){e.preventDefault();e.stopImmediatePropagation();}
    if(e.key==='Tab'&&media.matches&&drawer){
      const focusable=[...$('.'+drawer+'-panel').querySelectorAll('button,input,summary,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
      const first=focusable[0],last=focusable.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    }
  },true);

  function showTab(tab) {
    state.tab=tab;
    for(const button of document.querySelectorAll('[data-panel-tab]')){
      const active=button.dataset.panelTab===tab;
      button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
      $('#tab-'+button.dataset.panelTab).hidden=!active;
    }
    save();
  }
  $('.inspector-tabs').addEventListener('click',e=>{const button=e.target.closest('[data-panel-tab]');if(button)showTab(button.dataset.panelTab);});
  $('.inspector-tabs').addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    e.preventDefault();const buttons=[...document.querySelectorAll('[data-panel-tab]')];
    const index=buttons.findIndex(b=>b.dataset.panelTab===state.tab);
    const next=e.key==='Home'?0:e.key==='End'?2:(index+(e.key==='ArrowRight'?1:2))%3;
    showTab(buttons[next].dataset.panelTab);buttons[next].focus();
  });

  function buildDirectory(items) {
    const signature=JSON.stringify(items.map(o=>[o.id,o.parentId,o.name,o.label,o.wall]));
    if(signature===structure)return;
    structure=signature;nodeElements.clear();groupElements.clear();$('#objects').replaceChildren();
    const groups=directory(items);
    function buildNode(o,container,depth=0) {
      const children=items.filter(c=>c.parentId===o.id);
      const node=document.createElement('div');node.className='directory-node';
      node.innerHTML=`<div class="directory-line" style="--depth:${depth}">${children.length?`<button class="branch-toggle" data-expand="${escape(o.id)}" aria-label="展开 ${escape(shortName(o))} 的附属物件" aria-expanded="false">›</button>`:'<span class="branch-spacer"></span>'}<button class="object-row" data-id="${escape(o.id)}" aria-pressed="false" title="${escape(o.name)}"><span class="object-icon" aria-hidden="true">${icon(o)}</span><span class="object-text">${escape(shortName(o))}</span></button></div><div class="directory-children"></div>`;
      nodeElements.set(o.id,node);container.append(node);
      for(const child of children)buildNode(child,node.lastElementChild,depth+1);
    }
    for(const group of groups){
      const section=document.createElement('section');section.className='directory-group';
      section.innerHTML=`<button class="group-heading" data-group="${group.id}" aria-expanded="true"><span><span class="group-arrow" aria-hidden="true">⌄</span> ${group.name}</span><span class="group-count"></span></button><div class="group-content"></div>`;
      $('#objects').append(section);groupElements.set(group.id,section);
      for(const o of items.filter(o=>group.members.includes(o.id)&&!items.some(p=>p.id===o.parentId)))buildNode(o,section.lastElementChild);
    }
    const empty=document.createElement('p');empty.id='directory-empty';empty.className='empty-state';empty.textContent='没有匹配的物件，请尝试型号或名称。';$('#objects').append(empty);
  }
  function renderList() {
    const items=getItems(),selected=getSelected();buildDirectory(items);
    const searching=Boolean(query.trim()),groups=directory(items,query);
    let totalMatches=0;
    for(const group of groups){
      totalMatches+=group.matches.length;
      const section=groupElements.get(group.id),open=searching||state.groups[group.id]!==false;
      section.hidden=!group.visible.length;
      section.firstElementChild.setAttribute('aria-expanded',String(open));
      section.querySelector('.group-count').textContent=searching?`${group.matches.length} / ${group.members.length}`:group.members.length;
      section.lastElementChild.hidden=!open;
      for(const id of group.members){
        const node=nodeElements.get(id);node.hidden=!group.visible.includes(id);
        const row=node.querySelector(':scope > .directory-line > .object-row');
        row.classList.toggle('active',id===selected);row.setAttribute('aria-pressed',String(id===selected));
        row.classList.toggle('search-context',searching&&!group.matches.includes(id));
        const expanded=searching||state.nodes[id]===true;
        node.lastElementChild.hidden=!expanded;
        const toggle=node.querySelector(':scope > .directory-line > .branch-toggle');
        if(toggle){toggle.setAttribute('aria-expanded',String(expanded));toggle.disabled=searching;}
      }
    }
    $('#object-count').textContent=searching?`${totalMatches} / ${items.length}`:String(items.length);
    $('#directory-empty').hidden=totalMatches>0;
    $('#clear-search').hidden=!query;
  }
  function reveal(id) {
    const items=getItems();
    // Selecting on canvas should remain visible even when a search is active.
    if(query){query='';$('#object-search').value='';}
    state.groups[regionOf(items,id)]=true;
    for(const parent of ancestors(items,id))state.nodes[parent]=true;
    save();renderList();
    const row=nodeElements.get(id)?.querySelector('.object-row');
    if(row && !$('.left-panel').inert){
      const scroller=$('#objects'),r=row.getBoundingClientRect(),s=scroller.getBoundingClientRect();
      if(r.top<s.top)scroller.scrollTop-=s.top-r.top+8;
      else if(r.bottom>s.bottom)scroller.scrollTop+=r.bottom-s.bottom+8;
    }
  }
  $('#objects').addEventListener('click',e=>{
    const group=e.target.closest('[data-group]'),branch=e.target.closest('[data-expand]'),row=e.target.closest('[data-id]');
    if(group){state.groups[group.dataset.group]=state.groups[group.dataset.group]===false;save();renderList();}
    else if(branch){state.nodes[branch.dataset.expand]=!state.nodes[branch.dataset.expand];save();renderList();}
    else if(row){select(row.dataset.id);if(media.matches){drawer='right';updatePanels();$('#close-right').focus();}}
  });
  $('#object-search').addEventListener('input',e=>{query=e.target.value;renderList();});
  $('#clear-search').onclick=()=>{query='';$('#object-search').value='';renderList();$('#object-search').focus();};

  const field=(key,name,min,max)=>`<div class="field" data-field-row="${key}"><label for="field-${key}">${name}</label><span class="input-wrap"><input id="field-${key}" aria-label="${name}" data-field="${key}" type="number" min="${min}" max="${max}" step="10"/><span>mm</span></span><span class="readonly-value" data-readonly="${key}" hidden></span></div>`;
  $('#inspector').innerHTML=`<details data-section="position" open><summary>位置</summary><div class="section-body">${field('x','左右位置 X',-2300,2300)}${field('z','前后位置 Z',-2300,2500)}${field('bottom','下沿离地',0,4000)}<div class="nudge"><button data-nudge="-50">↓ 下移 50 mm</button><button data-nudge="50">↑ 上移 50 mm</button></div><p class="upper-edge">上沿离地 <strong id="upper-height"></strong></p><p id="attachment-note" class="compact-note" hidden></p></div></details><details data-section="size"><summary><span>外形尺寸</span><small id="size-summary"></small></summary><div class="section-body">${field('width','宽度',30,4600)}${field('height','高度',20,4000)}${field('depth','厚度 / 深度',20,2000)}<button id="resize-hatch" class="primary" hidden>调整开口高度 ↕</button><p id="hatch-help" class="compact-note" hidden>拖动顶部绿色手柄，下沿保持不变。</p></div></details><details data-section="source"><summary><span>参数依据与操作说明</span><small id="source-status"></small></summary><div class="section-body"><p id="source-text" class="compact-note"></p><p id="operation-note" class="compact-note"></p><p class="compact-note">数值输入单位为毫米；50 mm 吸附仅作用于拖动。</p></div></details>`;
  for(const detail of $('#inspector').querySelectorAll('details')){
    detail.open=state.sections[detail.dataset.section]===true;
    detail.addEventListener('toggle',()=>{state.sections[detail.dataset.section]=detail.open;save();});
  }
  function renderInspector() {
    const items=getItems(),o=items.find(o=>o.id===getSelected());if(!o)return;
    $('#selected-name').textContent=o.name;
    $('#selected-region').textContent=REGIONS.find(([id])=>id===regionOf(items,o.id))[1]+(o.parentId?' · 附属物件':o.wall==='floor'?' · 地面物件':' · 壁挂物件');
    if(inspectorId!==o.id){
      if(o.kind==='hatch')$('#inspector [data-section="size"]').open=true;
      inspectorId=o.id;
    }
    for(const key of ['x','z','bottom','width','height','depth']){
      const row=$(`[data-field-row="${key}"]`),input=$('#field-'+key),read=$(`[data-readonly="${key}"]`);
      row.hidden=(key==='x'&&!['floor','back','front'].includes(o.wall))||(key==='z'&&o.wall==='back');
      const editable=editableField(o,key)&&!(key==='bottom'&&o.wall==='floor'&&!o.parentId);
      input.parentElement.hidden=!editable;input.disabled=!editable;read.hidden=editable;
      input.value=Math.round(o[key]);read.textContent=`${Math.round(o[key])} mm`;
      if(key==='bottom')input.max=4000-o.height;
    }
    $('#inspector .nudge').hidden=o.wall==='floor'||!editableField(o,'bottom');
    $('#upper-height').textContent=`${Math.round(o.bottom+o.height)} mm`;
    $('#size-summary').textContent=`${o.width} × ${o.height} × ${o.depth} mm`;
    $('#attachment-note').hidden=!o.parentId;
    $('#attachment-note').textContent=o.parentId?`跟随 ${items.find(p=>p.id===o.parentId)?.name || o.parentId}；${['laptop','ldp'].includes(o.kind)?'可在台面范围内移动。':'位置与尺寸由附属关系确定。'}`:'';
    $('#source-status').textContent=/暂估|估算|示意|待/.test(o.source)?'含暂估 / 待核对':o.parentId?'附属物件':'';
    $('#source-text').textContent=o.source;
    $('#operation-note').textContent=o.kind==='hatch'?'开口可沿墙移动、升降；调整高度保持下沿不变。':o.parentId?'附属设备随所属物件更新位置。':o.wall==='floor'?'物件保持落地，拖动彩色轴沿地面移动。':'物件保持贴墙，拖动彩色轴沿墙移动或升降。';
    $('#resize-hatch').hidden=o.kind!=='hatch';$('#hatch-help').hidden=o.kind!=='hatch';
    renderConnections();
  }

  function renderConnections() {
    const items=getItems(),id=getSelected(),related=connections.filter(c=>isRelated(c,items,id));
    $('#connection-count').textContent=`${related.length} 条关联线路`;
    const signature=JSON.stringify([id,related,items.map(o=>[o.id,o.name])]);
    if(signature===lastConnections)return;lastConnections=signature;
    const byId=Object.fromEntries(items.map(o=>[o.id,o]));
    const groups=[['hdmi','视频'],['usb','USB'],['power','供电'],['lan','网络'],...Object.keys(cableTypes).filter(t=>!['hdmi','usb','power','lan'].includes(t)).map(t=>[t,cableTypes[t].name])];
    $('#connection-list').innerHTML=related.length?groups.map(([type,name])=>{
      const rows=related.filter(c=>c.type===type);if(!rows.length)return '';
      return `<section class="connection-group"><h3><i style="background:${cableTypes[type].color}"></i>${name}<small>${rows.length}</small></h3>${rows.map(c=>`<div class="connection-card" data-connection="${escape(c.id)}"><small>${escape(cableTypes[type].name)}</small><button class="text-link" data-select="${escape(c.source)}">${escape(byId[c.source]?.name||c.source)}</button><span class="connection-arrow">↓ 接至</span><button class="text-link" data-select="${escape(c.target)}">${escape(byId[c.target]?.name||c.target)}</button></div>`).join('')}</section>`;
    }).join(''):'<p class="empty-state">当前物件未配置关联线路</p>';
  }
  function renderChecks() {
    const items=getItems(),id=getSelected(),warnings=getWarnings();
    const signature=JSON.stringify([id,warnings]);if(signature===lastChecks)return;lastChecks=signature;
    $('#check-count').textContent=warnings.length?`${warnings.length} 项提醒`:'暂无提醒';
    // Existing checker returns readable messages; link exact, longest names first.
    const names=[...items].sort((a,b)=>b.name.length-a.name.length);
    function parts(message){
      const result=[];let rest=message;
      while(rest){let match=null,index=Infinity;for(const o of names){const at=rest.indexOf(o.name);if(at>=0&&at<index){match=o;index=at;}}
        if(!match){result.push({text:rest});break;}if(index)result.push({text:rest.slice(0,index)});result.push({id:match.id,text:match.name});rest=rest.slice(index+match.name.length);
      }return result;
    }
    const records=warnings.map(message=>parts(message));
    const current=records.filter(row=>row.some(p=>p.id===id)),other=records.filter(row=>!row.some(p=>p.id===id));
    const render=rows=>rows.map(row=>`<div class="warning">${row.map(p=>p.id?`<button class="text-link" data-select="${escape(p.id)}">${escape(p.text)}</button>`:escape(p.text)).join('')}</div>`).join('');
    $('#checks').innerHTML=`<h3>当前物件</h3>${current.length?render(current):'<p class="empty-state">当前物件没有空间提醒。</p>'}${other.length?`<h3>全场其他提醒</h3>${render(other)}`:''}<p class="checks-note">仅按简化包围盒检查，部分附属物不参与检测；不代表承重、支架、走线或施工验收。</p>`;
  }
  $('.right-panel').addEventListener('click',e=>{const button=e.target.closest('[data-select]');if(button){select(button.dataset.select);reveal(button.dataset.select);}});

  function syncDisplay() {
    $('#wiring').checked=state.scope!=='off';
    for(const button of document.querySelectorAll('[data-wire-scope]'))button.setAttribute('aria-pressed',String(button.dataset.wireScope===state.scope));
    $('#wire-scope-status').textContent=state.scope==='related'?'当前仅显示相关线路':state.scope==='all'?'当前显示全部线路':'走线已关闭';
    $('.wire-legend small').textContent=(state.scope==='related'?'仅相关线路':state.scope==='all'?'全部线路':'走线已关闭')+' · 虚线为隐藏段 · 接口及孔径示意';
  }
  for(const button of document.querySelectorAll('[data-wire-scope]'))button.onclick=()=>{state.scope=button.dataset.wireScope;save();syncDisplay();onDisplayChange();};
  $('#wiring').onchange=()=>{state.scope=$('#wiring').checked?'related':'off';save();syncDisplay();onDisplayChange();};
  for(const type of Object.keys(cableTypes)){
    const checkbox=$('#wire-'+type);checkbox.checked=state.types[type]!==false;
    checkbox.onchange=()=>{state.types[type]=checkbox.checked;save();onDisplayChange();};
  }
  $('#power-points').checked=state.powerPoints;
  $('#power-points').addEventListener('change',()=>{state.powerPoints=$('#power-points').checked;save();});
  showTab(state.tab);syncDisplay();updatePanels();
  return {renderList,renderInspector,renderChecks,reveal,closeDrawer,get scope(){return state.scope;}};
}
