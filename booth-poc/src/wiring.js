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
// Physical ports and line routes are schematic until confirmed on site.
export const CONNECTIONS=[
 ...['back-a','back-b','left-ifp','right-ifp'].flatMap(source=>['power','hdmi','usb'].map(type=>{const side=source.startsWith('back')?'back':source.split('-')[0];return {id:source+'-'+type,source,type,hatch:side+'-hatch',target:type==='power'?side+'-strip':side==='back'?'podium':side+'-laptop'};})),
 ...['a','b'].flatMap(id=>[{id:'wp55-'+id+'-power',source:'wp55-'+id,type:'power',hatch:'left-hatch',target:'socket-'+id},{id:'socket-'+id+'-power',source:'socket-'+id,type:'power',hatch:'left-hatch',target:'left-strip'}]),
 {id:'ldp-power',source:'right-laptop',type:'power',hatch:'right-hatch',target:'right-strip'},
 {id:'cpl50-lan',source:'cpl50',type:'lan',hatch:'right-hatch',target:'poe-node'}
];
export function cableRoutes(items){const byId=Object.fromEntries(items.map(o=>[o.id,o]));return CONNECTIONS.map(c=>{
 const s=byId[c.source],t=byId[c.target],h=byId[c.hatch],hole=byId['hole-'+s.id];
 const start=hole?[hole.x,hole.bottom+hole.height/2,hole.z]:[s.x,s.bottom+s.height/2,s.z];
 const end=[t.x,t.bottom+t.height/2,t.z];const lane=c.type==='hdmi'?-45:c.type==='usb'?45:0;let points;
 if(c.target.startsWith('socket-')) points=[start,end];
 else if(c.source==='cpl50') points=[start,[2380,120,2450],[2380,120,-2400],[-2380,120,-2400],[-2380,120,end[2]],[end[0],end[1],end[2]]];
 else if(s.wall==='back'){points=[start,[start[0],h.bottom+h.height/2,-2400],[h.x,h.bottom+h.height/2,-2400],[h.x,-30,-2280],[end[0],-30,end[2]],end];}
 else if(s.wall==='left'||s.wall==='right'){const x=s.wall==='left'?-2400:2400;points=[start,[x,start[1],start[2]],[x,h.bottom+h.height/2,start[2]],[x,h.bottom+h.height/2,h.z],end];}
 else points=[start,[h.x,h.bottom+h.height/2,h.z],end];
 if(lane){points=points.map((p,i)=>{if(i===0)return [p[0]+lane,p[1],p[2]];return s.wall==='back'?[p[0]+lane,p[1],p[2]]:[p[0],p[1],p[2]+lane];});}
 return {...c,name:`${s.name} · ${CABLE_TYPES[c.type].name}${c.source==='cpl50'?'（PoE来源待确认）':''}`,segments:[{zone:'示意暗线',hidden:true,points}]};
});}
