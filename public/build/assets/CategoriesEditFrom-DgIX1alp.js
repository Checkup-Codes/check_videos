import{Q as p,T as _,I as f,g as y,b as m,a as l,w as i,u as r,o as b,e as n}from"./app-CtZtcxFI.js";import{_ as x,a as u}from"./CForm-dxpzRIl5.js";import{_ as d}from"./CButton-DrMW_JKt.js";/* empty css            */const V={class:"mx-auto mt-10 w-full max-w-full overflow-auto bg-screen-bg px-5 lg:mt-0"},h={class:"container mx-auto p-4"},k=m("h1",{class:"mb-4 text-2xl font-bold"},"Kategoriyi Düzenle",-1),v=m("p",{class:"mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700"},"Kategorileri için düzenle.",-1),C={__name:"CategoriesEditFrom",setup(w){const{props:a}=p();a.auth;const e=_({name:"",slug:""});f(()=>a.category,o=>{e.name=o.name,e.slug=o.slug},{immediate:!0});const c=()=>{e.put(route("categories.update",{category:a.category.id})).then(()=>{}).catch(o=>{})},g=o=>{confirm("Bu kategoriyi çöpe mi atıyoruz ?")&&e.delete(route("categories.destroy",{category:a.category.id})).then(()=>{}).catch(t=>{})};return(o,t)=>(b(),y("div",V,[m("div",h,[k,v,l(x,{onSubmit:c},{default:i(()=>[l(u,{modelValue:r(e).name,"onUpdate:modelValue":t[0]||(t[0]=s=>r(e).name=s),id:"title",label:"İsim"},null,8,["modelValue"]),l(u,{modelValue:r(e).slug,"onUpdate:modelValue":t[1]||(t[1]=s=>r(e).slug=s),id:"slug",label:"Slug"},null,8,["modelValue"]),l(d,{type:"submit"},{default:i(()=>[n("Kategoriyi Güncelle")]),_:1})]),_:1}),l(d,{onClick:t[2]||(t[2]=s=>g(r(a).category.id)),variant:"outline",class:"m-2 ml-auto text-black"},{default:i(()=>[n(" Kategoriyi Sil ")]),_:1})])]))}};export{C as default};