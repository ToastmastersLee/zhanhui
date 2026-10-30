export const CABLE_TYPES={
 lan:{name:'LAN / Ethernet / PoE+',color:'#0074D9'},
 hdmi:{name:'HDMI（视频）',color:'#FF4136'},
 usb:{name:'USB',color:'#FFDC00'},
 rs232:{name:'RS232 / RS485',color:'#B10DC9'},
 audio:{name:'Audio',color:'#2ECC40'},
 ir:{name:'IR 控制线（发射器）',color:'#AAAAAA'},
 relay:{name:'Relay 控制线',color:'#FF851B'},
 power:{name:'电源',color:'#FF851B'}
};
// POC wiring currently uses these types. Other colors become visible only when a route uses them.
const BASE_CONNECTIONS=['back-a','back-b','left-ifp','right-ifp'].flatMap(source=>['power','hdmi','usb'].map(type=>{const side=source.startsWith('back')?'back':source.split('-')[0];return {id:`${source}-${type}`,source,type,hatch:`${side}-hatch`,target:type==='power'?`${side}-strip`:side==='back'?'podium':`${side}-laptop`};}));
export const CONNECTIONS=[...BASE_CONNECTIONS.map(c=>c.id==='left-ifp-power'?{...c,hatch:'left-screen-hole',target:'left-screen-strip'}:c),
 ...['left-small-a','left-small-b'].map(source=>({id:`${source}-power`,source,type:'power',hatch:'left-screen-hole',target:'left-screen-strip',maxLength:1000})),
 {id:'left-screen-strip-power',source:'left-screen-strip',type:'power',hatch:'left-hatch',target:'left-strip'}];
// All route points are in millimetres. Geometry is derived rather than persisted.
export function cableRoutes(items){const byId=Object.fromEntries(items.map(o=>[o.id,o]));return CONNECTIONS.map(c=>{
 const s=byId[c.source];
 if(c.target==='left-screen-strip'){
   const t=byId[c.target],portZ=s.id.startsWith('left-small')?s.z-s.width/2+25:s.z+s.width/2-80;
   const start=[s.x,s.bottom+s.height*.5,portZ],entry=[-2360,start[1],portZ],end=[t.x,t.bottom+t.height/2,t.z];
   const points=[start,entry,end],lengthMm=Math.round(points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(...p.map((v,k)=>v-points[i][k])),0));
   return {...c,name:`${s.name} · 电源${c.maxLength?`（标配 1 m；示意路径 ${lengthMm} mm，实物余量待核对）`:''}`,lengthMm,segments:[{zone:'屏后 → 洞内排插',hidden:true,points}]};
 }
 const h=byId[c.hatch],t=byId[c.target],isBack=s.wall==='back',lane=(c.type==='power'?-1:c.type==='hdmi'?0:1)*32+(s.id==='back-b'?80:-80);
 const point=(along,y,normal)=>isBack?[along,y,normal]:[normal,y,along];
 const sourceAlong=(isBack?s.x:s.z)+lane, hatchAlong=(isBack?h.x:h.z)+lane;
 const wallNormal=isBack?-2400:s.wall==='left'?-2400:2400;
 const face=isBack?-2280:s.wall==='left'?-2280:2280;
 const start=point(sourceAlong,s.bottom+s.height*.35,isBack?s.z:s.x);
 const entry=point(sourceAlong,start[1],wallNormal),low=point(sourceAlong,h.bottom+h.height/2,wallNormal),join=point(hatchAlong,low[1],wallNormal),exit=point(hatchAlong,low[1],face);
 const segments=[{zone:'墙内',hidden:true,points:[start,entry,low,join,exit]}];
 const end=[t.x+(isBack?lane:0),t.bottom+(t.kind==='laptop'?35:t.kind==='podium'?t.height*.65:t.height/2),t.z+(!isBack?lane:0)];
 if(isBack&&c.type!=='power'){
   const floor=point(hatchAlong,-30,face),base=[end[0],-30,end[2]];
   segments.push({zone:'地板下',hidden:true,points:[exit,floor,[end[0],-30,face],base]},{zone:'讲台内',hidden:true,points:[base,end]});
 }else if(t.kind==='laptop'){
   const cab=byId[t.parentId],behind=point(hatchAlong,exit[1],cab.x+(s.wall==='left'?-cab.depth/2:cab.depth/2));
   segments.push({zone:'柜后 → 台面',hidden:false,points:[exit,behind,[behind[0],t.bottom+35,behind[2]],[end[0],t.bottom+35,behind[2]],end]});
 }else segments.push({zone:isBack?'排插':'柜内',hidden:!isBack,points:[exit,[end[0],exit[1],exit[2]],[end[0],exit[1],end[2]],end]});
 return {...c,name:`${s.name} · ${CABLE_TYPES[c.type].name}`,segments};
});}
