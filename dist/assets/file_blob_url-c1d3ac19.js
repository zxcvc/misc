import"./modulepreload-polyfill-3cfb730f.js";const u=document.querySelector("#file"),d=document.querySelector("#view"),b=document.querySelector("#img"),y=document.querySelector("#file_to_blob"),m=document.querySelector("#buffer_to_file"),g=document.querySelector("#blob_to_file"),w=document.querySelector("#url_to_file");let r,c,f,a;u.addEventListener("change",async t=>{const e=t.target.files[0];r=e,f=await e.arrayBuffer(),c=new Blob([e]);const n=new FileReader;n.addEventListener("load",l=>{d.src=a=l.target.result}),n.readAsDataURL(e)});y.addEventListener("click",async t=>{const n=await r.arrayBuffer(),l=new Blob([n]);console.log(l)});m.addEventListener("click",async t=>{const e=p(f);_(await s(e))});g.addEventListener("click",t=>{const e=v(c);console.log(e)});w.addEventListener("click",async t=>{const e=L(a);_(await s(e))});function p(t){return new File([t],"file_01",{type:"image/jpeg"})}function v(t){return new File([t],"file_02",{type:"image/jpeg"})}function L(t){const e=t.match(/data:(?<main_type>.+)?(;base64),/),n=e.groups.main_type;let l=t.substring(e[0].length);l=atob(l);const i=new Uint8ClampedArray(l.length);for(let o=0;o<l.length;++o)i[o]=l.charCodeAt(o);return new File([i],"file_03",{type:n})}function s(t){return new Promise((e,n)=>{const l=new FileReader;l.addEventListener("load",i=>{e(l.result)}),l.readAsDataURL(t)})}function _(t){b.src=t}
