export const CABLE_TYPES={power:{name:'电源',color:'#e98a23'},hdmi:{name:'HDMI',color:'#238bea'},usb:{name:'USB',color:'#9b5ade'}};
export const CONNECTIONS=['back-a','back-b','left-ifp','right-ifp'].flatMap(source=>Object.keys(CABLE_TYPES).map(type=>{const side=source.startsWith('back')?'back':source.split('-')[0];return {id:`${source}-${type}`,source,type,hatch:`${side}-hatch`,target:type==='power'?`${side}-strip`:side==='back'?'podium':`${side}-laptop`};}));
// All route points are in millimetres. Geometry is derived rather than persisted.
export function cableRoutes(items){const byId=Object.fromEntries(items.map(o=>[o.id,o]));return CONNECTIONS.map(c=>{
 const s=byId[c.source],h=byId[c.hatch],t=byId[c.target],isBack=s.wall==='back',lane=(c.type==='power'?-1:c.type==='hdmi'?0:1)*32+(s.id==='back-b'?80:-80);
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
