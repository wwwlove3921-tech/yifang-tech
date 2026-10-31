import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');fs.mkdirSync(output,{recursive:true});
function embed(html){
 html=html.replace('<!-- SHOWCASE_SLOT -->',()=>fs.readFileSync(path.join(root,'showcase.html'),'utf8'));
 html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,f)=>'<style>\n'+fs.readFileSync(path.join(root,f),'utf8')+'\n</style>');
 html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,f)=>'<script>\n'+fs.readFileSync(path.join(root,f),'utf8')+'\n</script>');
 html=html.replace(/assets\/([\w-]+\.svg)/g,(_,f)=>'data:image/svg+xml;base64,'+fs.readFileSync(path.join(root,'assets',f)).toString('base64'));
 return html;
}
for(const [input,name] of [['index.html','yifang.html'],['brand.html','yifang-brand.html']]){
 fs.writeFileSync(path.join(output,name),embed(fs.readFileSync(path.join(root,input),'utf8')));
 console.log('Created '+path.join('dist',name));
}
