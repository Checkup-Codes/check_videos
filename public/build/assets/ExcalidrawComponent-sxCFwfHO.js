const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-DLhLcY3C.js","assets/index-Ct0BC4mx.js","assets/app-CtZtcxFI.js","assets/app-1Sq59Y5J.css","assets/app-lJr34JLa.css","assets/index-CImZ1k9w.js","assets/client-CEbEoqU1.js"])))=>i.map(i=>d[i]);
import{Q as C,l as _,y as S,_ as r,o as d,g as u,t as f,h as w,b as o,j as T,H as I,F as g,m as L,u as E,x as D}from"./app-CtZtcxFI.js";const O={key:0,class:"rounded bg-green-200 p-3 text-green-800"},R={class:""},P={class:"flex justify-between rounded-md px-1 text-gray-400 sm:mx-3 md:mx-5"},A={class:"flex"},B=o("label",{for:"versionDropdown",class:"my-auto px-3 font-semibold text-gray-700"},"Versiyon Seç:",-1),M=["value"],N={class:"ml-auto flex items-center justify-end space-x-2"},j=o("div",{id:"excalidraw-container",class:"3xl:h-[820px] relative h-[620px] w-full 2xl:h-[720px]"},[o("div",{id:"excali",class:"h-full w-full"})],-1),z={__name:"ExcalidrawComponent",setup(J){const{props:l}=C(),v=_([]),i=_(""),n=_(l.write.write_draws),s=_(n.value.length>0?n.value[0].id:null);S(()=>{b()});const b=()=>{r(async()=>{const{Excalidraw:a}=await import("./main-DLhLcY3C.js").then(e=>e.m);return{Excalidraw:a}},__vite__mapDeps([0,1,2,3,4,5])).then(({Excalidraw:a})=>{r(()=>import("./index-Ct0BC4mx.js").then(e=>e.i),__vite__mapDeps([1,2,3,4])).then(e=>{r(()=>import("./client-CEbEoqU1.js").then(t=>t.c),__vite__mapDeps([6,5,1,2,3,4])).then(t=>{const c=document.getElementById("excali"),m=t.createRoot(c),h=n.value.length>0?{elements:JSON.parse(n.value[0].elements),scrollToContent:!0}:{elements:[],scrollToContent:!0},p=x=>{v.value=x};m.render(e.createElement(a,{initialData:h,onChange:p,viewModeEnabled:!l.auth.user}))})})})},y=()=>{const a=n.value.find(e=>e.id===s.value);a&&r(async()=>{const{Excalidraw:e}=await import("./main-DLhLcY3C.js").then(t=>t.m);return{Excalidraw:e}},__vite__mapDeps([0,1,2,3,4,5])).then(({Excalidraw:e})=>{r(()=>import("./index-Ct0BC4mx.js").then(t=>t.i),__vite__mapDeps([1,2,3,4])).then(t=>{r(()=>import("./client-CEbEoqU1.js").then(c=>c.c),__vite__mapDeps([6,5,1,2,3,4])).then(c=>{const m=document.getElementById("excali"),h=c.createRoot(m),p={elements:JSON.parse(a.elements),scrollToContent:!0};h.render(t.createElement(e,{initialData:p,onChange:x=>{v.value=x},viewModeEnabled:!l.auth.user}))})})})},V=()=>{const a=v.value,e=JSON.stringify(a);D.post(`/writes/${l.write.id}/draw`,{elements:e}).then(t=>{i.value="Canvas durumu başarıyla kaydedildi!",n.value.push(t.data)}).catch(t=>{i.value="Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin."})},k=()=>{n.value.find(e=>e.id===s.value)&&confirm("Bu versiyonu silmek istediğinizden emin misiniz?")&&D.delete(`/writes/${l.write.id}/draw/${s.value}`).then(()=>{i.value="Versiyon başarıyla silindi.",n.value=n.value.filter(e=>e.id!==s.value),n.value.length>0?(s.value=n.value[0].id,y()):(v.value=[],s.value=null)}).catch(e=>{i.value="Silme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."})};return(a,e)=>(d(),u(g,null,[i.value?(d(),u("div",O,f(i.value),1)):w("",!0),o("div",R,[o("div",P,[o("div",A,[B,T(o("select",{id:"versionDropdown","onUpdate:modelValue":e[0]||(e[0]=t=>s.value=t),onChange:y,class:"mx-5 h-7 rounded-md border border-white bg-white py-0 pl-2 text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"},[(d(!0),u(g,null,L(n.value,t=>(d(),u("option",{key:t.id,value:t.id},"Versiyon "+f(t.version),9,M))),128))],544),[[I,s.value]])]),o("div",N,[E(l).auth.user?(d(),u("button",{key:0,onClick:k,class:"rounded px-5 text-black hover:underline"}," Sil ")):w("",!0),E(l).auth.user?(d(),u("button",{key:1,onClick:V,class:"rounded px-5 text-black hover:underline"}," Kaydet ")):w("",!0)])]),j])],64))}};export{z as _};
