export const BOOTH = { width: 5000, depth: 5000, height: 4000, wall: 200 };
const item = (id, name, label, kind, wall, width, height, depth, x, bottom, z, source) => ({id,name,label,kind,wall,width,height,depth,x,bottom,z,source});
export const INITIAL = [
  item('back-a','后墙 · IFP 01','IFP 01','screen','back',1501,930,90,-751,1000,-2255,'宽高、离地高度按图纸；厚度暂估'),
  item('back-b','后墙 · IFP 02','IFP 02','screen','back',1501,930,90,750,1000,-2255,'宽高、离地高度按图纸；厚度暂估'),
  item('left-ifp','左墙 · IFP 03','IFP 03','screen','left',1501,930,90,-2255,1000,0,'宽高、离地高度按图纸；沿墙位置示意'),
  item('left-small-a','左墙 · PD150（上）','PD150 A','screen','left',518,300,70,-2265,1700,1360,'宽度按图纸；高度、厚度与位置暂估'),
  item('left-small-b','左墙 · PD150（下）','PD150 B','screen','left',518,300,70,-2265,1250,1360,'宽度按图纸；高度、厚度与位置暂估'),
  item('right-ifp','右墙 · IFP 04','IFP 04','screen','right',1501,930,90,2255,1000,-985,'宽高、离地高度按图纸；沿墙位置示意'),
  item('left-cabinet','左侧 · 展示柜','CABINET L','cabinet','floor',2000,800,450,-2075,0,0,'2,000 × 800 × 450 mm 按1030图纸'),
  item('right-cabinet','右侧 · 展示柜','CABINET R','cabinet','floor',2000,800,600,2000,0,0,'2,000 × 800 × 600 mm 按1030图纸'),
  item('right-shelf','右墙 · 设备托板','SHELF','shelf','right',750,30,200,2200,1680,375,'750 × 30 × 200 mm 按图纸；高度示意'),
  item('right-device','右墙 · HY300','HY300','device','right',550,100,120,2240,1710,375,'占位模型：尺寸暂估'),
  item('podium','中央 · SL100','SL100','podium','floor',600,1100,500,0,0,-500,'占位模型：尺寸与位置暂估'),
];
export const LEGACY_INITIAL = JSON.parse(JSON.stringify(INITIAL));
for(const wall of ['left','right','back']) INITIAL.push(item(`${wall}-hatch`,`${{left:'左墙',right:'右墙',back:'后墙'}[wall]} · 检修口`,'ACCESS','hatch',wall,wall==='back'?500:1500,wall==='back'?250:450,20,wall==='left'?-2290:wall==='right'?2290:0,150,wall==='back'?-2290:0,'按用户最新要求：侧墙1500×450，主墙500×250；下沿150 mm，侧墙柜背须贯通，工厂修图待确认'));
for(const side of ['left','right']) {
  INITIAL.push({...item(`${side}-laptop`,`${side==='left'?'左':'右'}柜顶 · 笔记本`,'LAPTOP','laptop','floor',340,240,280,0,850,0,'笔记本占位；位置相对于柜顶'),parentId:`${side}-cabinet`,offsetX:0,offsetZ:0});
  INITIAL.push({...item(`${side}-strip`,`${side==='left'?'左':'右'}柜内 · 排插`,'POWER','strip','floor',300,40,70,0,150,0,'柜内电源终点，随柜体移动'),parentId:`${side}-cabinet`});
}
INITIAL.push({...item('back-strip','后墙检修口 · 排插','POWER','strip','floor',300,40,70,0,80,-2150,'后墙两块 IFP 电源终点'),parentId:'back-hatch'});
// 1030 design revision: old screen cavity is replaced by individual cable entries.
const ldp=INITIAL.find(o=>o.id==='right-laptop'); Object.assign(ldp,{name:'右柜顶 · LDP100（内置OPS）',label:'LDP100',kind:'ldp',width:650,height:150,depth:500,source:'照片估算650 × 150 × 500 mm；内置OPS；接口及深度待实测'});
INITIAL.push(item('right-shelf-lower','右墙 · 下层板','SHELF LOWER','shelf','right',1000,30,200,2200,1300,375,'1000 × 30 × 200；与上层板净距350 mm'));
for(const [id,bottom] of [['a',1675],['b',1225]]) INITIAL.push(item('wp55-'+id,'左墙 · WP55 '+id.toUpperCase(),'WP55','device','left',225,250,70,-2265,bottom,1980,'外形暂估；墙内齐平插座，接口待确认'));
for(const [id,parent] of [['a','left-small-a'],['b','left-small-b']]) INITIAL.push({...item('socket-'+id,'左墙 · 内嵌齐平插座 '+id.toUpperCase(),'UK SOCKET','socket','left',85,85,20,-2290,0,0,'墙面齐平插座；位置及实际供电待核对'),parentId:parent});
INITIAL.push(item('sa200','后墙 · SA200','SA200','device','back',500,80,90,0,800,-2255,'外形及高度示意，孔径待确认'));
INITIAL.push(item('cpl50','门头右外框 · CPL50','CPL50','screen','front',250,170,40,2380,1400,2500,'下沿1400 mm；尺寸暂估；PoE线终点待确认'));
INITIAL.push({...item('poe-node','左柜 · PoE交换机（型号待确认）','SWITCH','network','floor',250,45,150,-2075,260,0,'PoE能力和实际端口待确认'),parentId:'left-cabinet',offsetZ:0});
INITIAL.push({...item('router','左柜 · 路由器','ROUTER','network','floor',180,45,120,-2075,330,0,'型号、端口及联网来源待确认'),parentId:'left-cabinet',offsetZ:-350});
INITIAL.push({...item('server','左柜 · 服务器','SERVER','network','floor',220,100,180,-2075,180,0,'型号、数量及服务待确认'),parentId:'left-cabinet',offsetZ:350});
INITIAL.push({...item('podium-strip','SL100下方 · 英规排插','UK POWER','strip','floor',300,40,70,0,0,-500,'SL100专用取电点：位置示意，实际接入待确认'),parentId:'podium'});
const holeTargets=['back-a','back-b','left-ifp','right-ifp','right-device','right-shelf-lower','sa200','cpl50'];
for(const id of holeTargets){const parent=INITIAL.find(o=>o.id===id);INITIAL.push({...item('hole-'+id,parent.name+' · 穿线孔','Ø80?','hole',parent.wall,80,80,20,parent.x,parent.bottom,parent.z,'孔径80 mm为示意，设备接口和施工位置待确认'),parentId:id});}
export const clone = data => JSON.parse(JSON.stringify(data));
// Cabinets run along side walls; their local width maps onto world Z.
export function worldSize(o) {return (o.wall === 'left' || o.wall === 'right' || o.kind === 'cabinet' || o.kind === 'ldp') ? [o.depth,o.height,o.width] : [o.width,o.height,o.depth];}
export function constrain(o) {
  if(o.kind==='cabinet'){o.height=Math.min(o.height,3760);o.depth=Math.max(30,o.depth);}
  if(o.wall==='front'){o.x=2380;o.z=2500;o.bottom=Math.max(0,Math.min(4000-o.height,Math.round(o.bottom)));return o;}
  const [w,h,d] = worldSize(o), limit=2300;
  o.x=Math.max(Math.ceil(-limit+w/2),Math.min(Math.floor(limit-w/2),Math.round(o.x)));
  o.z=Math.max(Math.ceil(-limit+d/2),Math.min(Math.floor(2500-d/2),Math.round(o.z)));
  o.bottom=o.wall==='floor'?0:Math.round(Math.max(0,Math.min(4000-h,o.bottom)));
  if(o.wall==='back')o.z=-2300+o.depth/2;
  if(o.wall==='left')o.x=-2300+o.depth/2;
  if(o.wall==='right')o.x=2300-o.depth/2;
  return o;
}
export function bounds(o) {const [w,h,d]=worldSize(o); return {min:[o.x-w/2,o.bottom,o.z-d/2], max:[o.x+w/2,o.bottom+h,o.z+d/2]};}
export function checkLayout(items) {
  items=items.filter(o=>!['hatch','hole','socket','strip','network','laptop','ldp'].includes(o.kind)&&o.wall!=='front');
  const warnings=[];
  for(let i=0;i<items.length;i++) {
    const a=items[i], ab=bounds(a);
    if(ab.min[0]<-2300.1||ab.max[0]>2300.1||ab.min[2]<-2300.1||ab.max[2]>2500.1||ab.min[1]<0||ab.max[1]>4000.1) warnings.push(`${a.name} 超出展位边界`);
    for(let j=i+1;j<items.length;j++) {const b=items[j],bb=bounds(b);if(ab.min.every((v,k)=>Math.min(ab.max[k],bb.max[k])-Math.max(v,bb.min[k])>2))warnings.push(`${a.name} 与 ${b.name} 占用空间重叠`);}
  }
  return warnings;
}
export function parseLayout(raw) {
 if(![1,2,3,4].includes(raw?.version)||!Array.isArray(raw.items))throw Error('方案格式不匹配');
 const legacyIds=['back-a','back-b','left-ifp','left-small-a','left-small-b','right-ifp','left-cabinet','right-cabinet','right-shelf','right-device','podium','left-hatch','right-hatch','back-hatch','left-laptop','left-strip','right-laptop','right-strip','back-strip','left-screen-hole','left-screen-strip'];
 const removed=['hole-left-small-a','hole-left-small-b','hole-wp55-a','hole-wp55-b'];const added=['router','server','podium-strip'];
 const expected=raw.version===4?[...INITIAL.map(o=>o.id),...removed]:legacyIds.slice(0,raw.version===1?11:raw.version===2?19:21);
 if(raw.version===4){const ids=new Set(raw.items.map(o=>o.id));for(const o of INITIAL)if(!added.includes(o.id)&&!ids.has(o.id))throw Error('物件数量不匹配');}else if(raw.items.length!==expected.length)throw Error('物件数量不匹配');
 const seen=new Set(), result=clone(INITIAL);
 for(const o of raw.items){if(!expected.includes(o.id)||seen.has(o.id))throw Error('物件 ID 无效或重复');seen.add(o.id);
  for(const key of ['x','z','bottom','width','height','depth'])if(typeof o[key]!=='number'||!Number.isFinite(o[key])||Math.abs(o[key])>10000)throw Error('方案含无效尺寸或坐标');
  if(o.width<20||o.height<20||o.depth<20||o.width>4600||o.height>4000||o.depth>2000||o.bottom<0||o.bottom>4000)throw Error('尺寸超出范围');
  const target=result.find(x=>x.id===o.id);if(!target)continue;
  if(o.id==='poe-node')continue;
  if(raw.version<4&&o.id==='right-laptop'){target.offsetX=o.offsetX||0;target.offsetZ=o.offsetZ||0;continue;}
  for(const key of ['x','z','bottom','width','height','depth'])target[key]=o[key];
  if(['laptop','ldp'].includes(target.kind)){if(!Number.isFinite(o.offsetX)||!Number.isFinite(o.offsetZ))throw Error('台面偏移无效');target.offsetX=o.offsetX;target.offsetZ=o.offsetZ;}
  constrain(target);
 }
 return syncAttachments(result);
}
export function syncAttachments(items){
  for(const o of items.filter(o=>o.parentId)){
    const p=items.find(p=>p.id===o.parentId);if(!p)continue;
    if(['laptop','ldp'].includes(o.kind)){
      const [w,,d]=worldSize(p), [ow,,od]=worldSize(o);
      o.offsetX=Math.max(-(w-ow)/2,Math.min((w-ow)/2,o.offsetX||0));o.offsetZ=Math.max(-(d-od)/2,Math.min((d-od)/2,o.offsetZ||0));
      o.x=p.x+o.offsetX;o.z=p.z+o.offsetZ;o.bottom=p.bottom+p.height;
      o.height=Math.min(o.height,4000-o.bottom);
    }else if(o.kind==='network'){o.x=p.x;o.z=p.z+(o.offsetZ||0);o.bottom=o.id==='router'?330:o.id==='server'?180:260;}else if(o.id==='podium-strip'){o.x=p.x;o.z=p.z;o.bottom=0;}else if(o.kind==='socket'){o.x=-2290;o.z=p.z;o.bottom=p.bottom+p.height/2-o.height/2;}else if(o.kind==='hole'){o.bottom=p.bottom+100-o.height/2;if(p.wall==='back'){o.x=p.id==='sa200'?p.x:p.x-p.width/2+100;o.z=-2290;}else if(p.wall==='front'){o.x=p.x;o.z=2480;o.bottom=p.bottom+p.height/2-o.height/2;}else{o.x=p.wall==='left'?-2290:2290;o.z=p.z+(p.wall==='left'?1:-1)*(p.width/2-100);}}else if(o.id==='left-screen-strip'){o.x=-2360;o.z=p.z;o.bottom=p.bottom+p.height/2-o.height/2;}else{o.x=p.x;o.z=p.kind==='hatch'?p.z+140:p.z;o.bottom=p.kind==='hatch'?80:Math.min(150,p.height/2);}
  }return items;
}
