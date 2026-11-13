// Presentation-only relationships. Never mutate the saved layout.
export const REGIONS = [['back','后墙'],['left','左墙'],['right','右墙'],['center','中央'],['front','门头']];

export function ancestors(items, id) {
  const byId = new Map(items.map(o => [o.id, o])), result = [], seen = new Set([id]);
  let parent = byId.get(id)?.parentId;
  while (byId.has(parent) && !seen.has(parent)) {
    result.push(parent); seen.add(parent); parent = byId.get(parent).parentId;
  }
  return result;
}

export function regionOf(items, id) {
  const rootId = ancestors(items, id).at(-1) || id;
  const o = items.find(o => o.id === rootId);
  if (!o) return 'center';
  if (['back','left','right','front'].includes(o.wall)) return o.wall;
  if (o.kind === 'cabinet') return o.id.startsWith('right') ? 'right' : 'left';
  return 'center';
}

export function directory(items, query = '') {
  const term = query.trim().toLocaleLowerCase();
  const matches = new Set(items.filter(o => !term || [o.name,o.label,o.id].some(v => String(v || '').toLocaleLowerCase().includes(term))).map(o => o.id));
  const visible = new Set(matches);
  for (const id of matches) for (const parent of ancestors(items,id)) visible.add(parent);
  return REGIONS.map(([id,name]) => {
    const members = items.filter(o => regionOf(items,o.id) === id);
    return {id,name,members:members.map(o=>o.id),visible:members.filter(o=>visible.has(o.id)).map(o=>o.id),matches:members.filter(o=>matches.has(o.id)).map(o=>o.id)};
  });
}

export function relatedIds(items, id) {
  const ids = new Set([id, ...ancestors(items,id)]);
  // Include descendants of the selected object, but not its siblings.
  for (const o of items) if (ancestors(items,o.id).includes(id)) ids.add(o.id);
  return ids;
}

export function isRelated(connection, items, id) {
  const ids = relatedIds(items,id);
  return [connection.source,connection.target,connection.hatch].some(value => ids.has(value));
}

export function visibleConnections(connections, items, id, scope, enabled = {}) {
  if (scope === 'off') return [];
  return connections.filter(c => enabled[c.type] !== false && (scope === 'all' || isRelated(c,items,id)));
}

export function editableField(o, key) {
  if (o.parentId) return ['laptop','ldp'].includes(o.kind) && ['x','z'].includes(key);
  if (o.wall === 'front' && ['x','z'].includes(key)) return false;
  return !(o.kind === 'hatch' && key === 'depth');
}

export const DEFAULT_UI = {tab:'edit',scope:'related',leftOpen:true,rightOpen:true,groups:{},nodes:{},sections:{position:true,size:false,source:false},types:{},powerPoints:true};
export function normalizeUI(raw) {
  const result = structuredClone(DEFAULT_UI);
  if (!raw || typeof raw !== 'object') return result;
  if (['edit','connections','checks'].includes(raw.tab)) result.tab=raw.tab;
  if (['related','all','off'].includes(raw.scope)) result.scope=raw.scope;
  for (const key of ['leftOpen','rightOpen','powerPoints']) if (typeof raw[key]==='boolean') result[key]=raw[key];
  for (const key of ['groups','nodes','sections','types']) if (raw[key] && typeof raw[key]==='object') {
    for (const [name,value] of Object.entries(raw[key])) if (typeof value==='boolean' && !['__proto__','constructor','prototype'].includes(name)) result[key][name]=value;
  }
  return result;
}
