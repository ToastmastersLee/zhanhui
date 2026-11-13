import {test} from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL,clone,syncAttachments} from '../src/layout.js';
import {CONNECTIONS} from '../src/wiring.js';
import {directory,regionOf,ancestors,relatedIds,isRelated,visibleConnections,editableField,normalizeUI} from '../src/panel-model.js';

test('directory assigns all 38 objects exactly once with inherited cabinet and wall regions',()=>{
  const before=clone(INITIAL),groups=directory(INITIAL),ids=groups.flatMap(g=>g.members);
  assert.equal(ids.length,38);assert.equal(new Set(ids).size,38);
  assert.deepEqual(groups.map(g=>g.id),['back','left','right','center','front']);
  for(const id of ['left-cabinet','left-laptop','router','server','poe-node'])assert.equal(regionOf(INITIAL,id),'left');
  assert.equal(regionOf(INITIAL,'back-strip'),'back');
  assert.equal(regionOf(INITIAL,'podium-strip'),'center');
  assert.equal(regionOf(INITIAL,'hole-cpl50'),'front');
  assert.deepEqual(INITIAL,before);
});

test('search covers name, model label and ID while keeping ancestor context',()=>{
  const search=q=>directory(INITIAL,q);
  assert.deepEqual(search('router').find(g=>g.id==='left').visible,['left-cabinet','router']);
  assert.deepEqual(search('ldp100').find(g=>g.id==='right').matches,['right-laptop']);
  assert.deepEqual(search('PD150 A').find(g=>g.id==='left').matches,['left-small-a']);
  assert.equal(search('不存在的设备').flatMap(g=>g.visible).length,0);
  assert.equal(search(' ').flatMap(g=>g.visible).length,38);
  assert(search(' UK SOCKET ').find(g=>g.id==='left').visible.includes('left-small-a'));
});

test('related routes include cabinet descendants, hole owner and hatch without pulling in siblings',()=>{
  const routes=id=>CONNECTIONS.filter(c=>isRelated(c,INITIAL,id));
  assert.equal(routes('back-a').length,3);
  assert.deepEqual(routes('hole-back-a'),routes('back-a'));
  assert.equal(routes('back-hatch').length,6);
  assert.equal(routes('right-cabinet').length,4);
  assert(routes('left-cabinet').some(c=>c.id==='cpl50-lan'));
  assert.equal(routes('router').length,0);
  assert.equal(routes('sa200').length,0);
  assert(!relatedIds(INITIAL,'left-laptop').has('router'));
  const nested=[...INITIAL,{id:'nested',parentId:'hole-back-a'}];
  assert.deepEqual(ancestors(nested,'nested'),['hole-back-a','back-a']);
  assert(relatedIds(nested,'back-a').has('nested'));
});

test('wire scope and category switches share the same relation and never fall back to all',()=>{
  assert.equal(visibleConnections(CONNECTIONS,INITIAL,'back-a','related').length,3);
  assert.equal(visibleConnections(CONNECTIONS,INITIAL,'back-a','related',{power:false}).length,2);
  assert.equal(visibleConnections(CONNECTIONS,INITIAL,'sa200','related').length,0);
  assert.equal(visibleConnections(CONNECTIONS,INITIAL,'sa200','all').length,18);
  assert.equal(visibleConnections(CONNECTIONS,INITIAL,'back-a','off').length,0);
});

test('presentation preferences and grouping never alter edited layout',()=>{
  const items=syncAttachments(clone(INITIAL));items[0].bottom=785;
  const before=clone(items);
  directory(items,'IFP');relatedIds(items,'left-cabinet');
  const defaults=normalizeUI(null);assert.equal(defaults.scope,'related');assert.equal(defaults.tab,'edit');
  const saved=normalizeUI({tab:'connections',scope:'all',leftOpen:false,sections:{size:true},groups:{left:false}});
  assert.equal(saved.scope,'all');assert.equal(saved.leftOpen,false);assert.equal(saved.sections.size,true);
  assert.equal(normalizeUI({scope:'invalid',tab:'invalid'}).scope,'related');
  assert.deepEqual(items,before);
});

test('read-only attachment fields agree with actual placement rules',()=>{
  const item=id=>INITIAL.find(o=>o.id===id);
  assert.equal(editableField(item('left-laptop'),'x'),true);
  assert.equal(editableField(item('left-laptop'),'height'),false);
  assert.equal(editableField(item('router'),'x'),false);
  assert.equal(editableField(item('socket-a'),'bottom'),false);
  assert.equal(editableField(item('left-hatch'),'depth'),false);
  assert.equal(editableField(item('left-hatch'),'height'),true);
  assert.equal(editableField(item('cpl50'),'x'),false);
});
