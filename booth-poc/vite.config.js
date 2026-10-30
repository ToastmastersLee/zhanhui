import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
export default defineConfig({base:'./',plugins:[{
  name:'runtime-license',
  generateBundle(){this.emitFile({type:'asset',fileName:'THIRD-PARTY-LICENSES.txt',source:readFileSync(new URL('./node_modules/three/LICENSE',import.meta.url),'utf8')});}
}]});
