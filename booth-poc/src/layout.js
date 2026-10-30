export const BOOTH = { width: 5000, depth: 5000, height: 4000, wall: 200 };
const item = (id, name, label, kind, wall, width, height, depth, x, bottom, z, source) => ({id,name,label,kind,wall,width,height,depth,x,bottom,z,source});
export const INITIAL = [
  item('back-a','后墙 · IFP 01','IFP 01','screen','back',1501,930,90,-760,1300,-2255,'宽高、离地高度按图纸；厚度暂估'),
  item('back-b','后墙 · IFP 02','IFP 02','screen','back',1501,930,90,760,1300,-2255,'宽高、离地高度按图纸；厚度暂估'),
  item('left-ifp','左墙 · IFP 03','IFP 03','screen','left',1501,930,90,-2255,1300,-200,'宽高、离地高度按图纸；沿墙位置示意'),
  item('left-small-a','左墙 · 小屏（上）','DISPLAY A','screen','left',518,300,70,-2265,1850,1450,'宽度按图纸；高度、厚度与位置暂估'),
  item('left-small-b','左墙 · 小屏（下）','DISPLAY B','screen','left',518,300,70,-2265,1400,1450,'宽度按图纸；高度、厚度与位置暂估'),
  item('right-ifp','右墙 · IFP 04','IFP 04','screen','right',1501,930,90,2255,1300,-1000,'宽高、离地高度按图纸；沿墙位置示意'),
  item('left-cabinet','左侧 · 展示柜','CABINET L','cabinet','floor',2000,850,500,-2050,0,0,'2,000 × 850 × 500 mm 按图纸'),
  item('right-cabinet','右侧 · 展示柜','CABINET R','cabinet','floor',2000,850,600,2000,0,0,'2,000 × 850 × 600 mm 按图纸'),
  item('right-shelf','右墙 · 设备托板','SHELF','shelf','right',750,30,200,2200,1750,550,'750 × 30 × 200 mm 按图纸；高度示意'),
  item('right-device','右墙 · 会议设备','AV BAR','device','right',550,100,120,2240,1780,550,'占位模型：尺寸暂估'),
  item('podium','中央 · 数字讲台','PODIUM','podium','floor',600,1100,500,0,0,500,'占位模型：尺寸与位置暂估'),
];
export const LEGACY_INITIAL = JSON.parse(JSON.stringify(INITIAL));
for(const wall of ['left','right','back']) INITIAL.push(item(`${wall}-hatch`,`${{left:'左墙',right:'右墙',back:'后墙'}[wall]} · 检修口`,'ACCESS','hatch',wall,1000,250,20,wall==='left'?-2290:wall==='right'?2290:0,350,wall==='back'?-2290:0,'示意尺寸，待核对；可沿墙移动、调整开口宽高'));
for(const side of ['left','right']) {
  INITIAL.push({...item(`${side}-laptop`,`${side==='left'?'左':'右'}柜顶 · 笔记本`,'LAPTOP','laptop','floor',340,240,280,0,850,0,'笔记本占位；位置相对于柜顶'),parentId:`${side}-cabinet`,offsetX:0,offsetZ:0});
  INITIAL.push({...item(`${side}-strip`,`${side==='left'?'左':'右'}柜内 · 排插`,'POWER','strip','floor',300,40,70,0,150,0,'柜内电源终点，随柜体移动'),parentId:`${side}-cabinet`});
}
INITIAL.push({...item('back-strip','后墙检修口 · 排插','POWER','strip','floor',300,40,70,0,80,-2150,'后墙两块 IFP 电源终点'),parentId:'back-hatch'});
export const clone = data => JSON.parse(JSON.stringify(data));
// Cabinets run along side walls; their local width maps onto world Z.
export function worldSize(o) {return (o.wall === 'left' || o.wall === 'right' || o.kind === 'cabinet') ? [o.depth,o.height,o.width] : [o.width,o.height,o.depth];}
export function constrain(o) {
  if(o.kind==='cabinet'){o.height=Math.min(o.height,3760);o.depth=Math.max(30,o.depth);}
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
  items=items.filter(o=>!['hatch','strip','laptop'].includes(o.kind));
  const warnings=[];
  for(let i=0;i<items.length;i++) {
    const a=items[i], ab=bounds(a);
    if(ab.min[0]<-2300.1||ab.max[0]>2300.1||ab.min[2]<-2300.1||ab.max[2]>2500.1||ab.min[1]<0||ab.max[1]>4000.1) warnings.push(`${a.name} 超出展位边界`);
    for(let j=i+1;j<items.length;j++) {const b=items[j],bb=bounds(b);if(ab.min.every((v,k)=>Math.min(ab.max[k],bb.max[k])-Math.max(v,bb.min[k])>2))warnings.push(`${a.name} 与 ${b.name} 占用空间重叠`);}
  }
  return warnings;
}
export function parseLayout(raw) {
  const defaults=raw?.version===1?LEGACY_INITIAL:INITIAL;
  if(![1,2].includes(raw?.version) || !Array.isArray(raw.items) || raw.items.length!==defaults.length)throw Error('方案格式不匹配，请导入本工具导出的 JSON。');
  const seen=new Set();
  const result=raw.items.map(o=>{const base=defaults.find(b=>b.id===o.id); if(!base||seen.has(o.id))throw Error('物件 ID 无效或重复'); seen.add(o.id);const next={...base};for(const key of ['x','z','bottom','width','height','depth']){if(typeof o[key]!=='number'||!Number.isFinite(o[key]))throw Error('方案含有无效尺寸');next[key]=o[key];} if(next.width<30||next.width>4600||next.height<20||next.height>4000||next.depth<20||next.depth>2000||Math.abs(next.x)>10000||Math.abs(next.z)>10000||next.bottom<0||next.bottom>4000)throw Error('尺寸或坐标超出允许范围');if(next.kind==='laptop')for(const key of ['offsetX','offsetZ']){if(!Number.isFinite(o[key]))throw Error('笔记本相对坐标无效');next[key]=o[key];}return constrain(next);});
  if(raw.version===1)result.push(...clone(INITIAL.slice(11)));
  return syncAttachments(result);
}
export function syncAttachments(items){
  for(const o of items.filter(o=>o.parentId)){
    const p=items.find(p=>p.id===o.parentId);if(!p)continue;
    if(o.kind==='laptop'){
      const [w,,d]=worldSize(p);o.width=Math.min(o.width,w);o.depth=Math.min(o.depth,d);
      o.offsetX=Math.max(-(w-o.width)/2,Math.min((w-o.width)/2,o.offsetX||0));o.offsetZ=Math.max(-(d-o.depth)/2,Math.min((d-o.depth)/2,o.offsetZ||0));
      o.x=p.x+o.offsetX;o.z=p.z+o.offsetZ;o.bottom=p.bottom+p.height;
      o.height=Math.min(o.height,4000-o.bottom);
    }else{o.x=p.x;o.z=p.kind==='hatch'?p.z+140:p.z;o.bottom=p.kind==='hatch'?80:Math.min(150,p.height/2);}
  }return items;
}
