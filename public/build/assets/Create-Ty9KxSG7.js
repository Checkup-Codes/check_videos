import{_ as f,Q as v,T as h,l as y,y as x,g as l,b as s,j as u,q as c,u as r,t as n,h as i,v as w,f as V,o as d,I as U,J as q}from"./app-DOzu56K9.js";import{Q as S}from"./quill.snow-mYSNBTUf.js";/* empty css            */const a=p=>(U("data-v-009a6388"),p=p(),q(),p),C={class:"grid grid-cols-6 gap-4 p-5"},I={class:"col-span-3"},D=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Name",-1)),M={key:0,class:"input-error"},T={class:"col-span-3"},B=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Slug",-1)),E={key:0,class:"input-error"},L={class:"col-span-3"},N=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Category",-1)),Q={key:0,class:"input-error"},P={class:"col-span-3"},R=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Price",-1)),j={key:0,class:"input-error"},z={class:"col-span-6"},H=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Description",-1)),J={key:0,class:"input-error"},K={class:"col-span-3"},A=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Stock",-1)),F={key:0,class:"input-error"},G={class:"col-span-3"},O=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Subscription Duration",-1)),W={key:0,class:"input-error"},X={class:"col-span-3"},Y=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"License Key",-1)),Z={key:0,class:"input-error"},$={class:"col-span-3"},ee=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Version",-1)),re={key:0,class:"input-error"},se={class:"col-span-3"},oe=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Platform",-1)),te={key:0,class:"input-error"},le={class:"col-span-3"},de=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Download URL",-1)),ae={key:0,class:"input-error"},ne={class:"col-span-3"},ie=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"Is Subscription",-1)),ue={key:0,class:"input-error"},ce={class:"col-span-6"},pe=a(()=>s("label",{class:"mb-1 block font-medium text-gray-800"},"System Requirements",-1)),me={key:0,class:"input-error"},be=a(()=>s("div",{class:"col-span-6"},[s("button",{type:"submit",class:"btn-primary"},"Create")],-1)),_e={__name:"Create",setup(p){const{props:g}=v(),e=h({name:"",slug:"",description:"",price:0,stock:0,category:"",platform:"",version:"",license_key:"",is_subscription:!1,subscription_duration:0,download_url:"",system_requirements:""}),k=()=>e.post(route("software-products.store")),b=y(g.flash);x(()=>{b.value&&setTimeout(()=>{b.value=null},3e3);const m=new S(_.value,{theme:"snow",modules:{toolbar:[[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"},{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["link","image","video"],["clean"]]}});m.on("text-change",()=>{e.description=m.root.innerHTML})});const _=y(null);return(m,o)=>(d(),l("form",{onSubmit:V(k,["prevent"])},[s("div",C,[s("div",I,[D,u(s("input",{"onUpdate:modelValue":o[0]||(o[0]=t=>r(e).name=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).name]]),r(e).errors.name?(d(),l("div",M,n(r(e).errors.name),1)):i("",!0)]),s("div",T,[B,u(s("input",{"onUpdate:modelValue":o[1]||(o[1]=t=>r(e).slug=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).slug]]),r(e).errors.slug?(d(),l("div",E,n(r(e).errors.slug),1)):i("",!0)]),s("div",L,[N,u(s("input",{"onUpdate:modelValue":o[2]||(o[2]=t=>r(e).category=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).category]]),r(e).errors.category?(d(),l("div",Q,n(r(e).errors.category),1)):i("",!0)]),s("div",P,[R,u(s("input",{"onUpdate:modelValue":o[3]||(o[3]=t=>r(e).price=t),type:"number",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).price,void 0,{number:!0}]]),r(e).errors.price?(d(),l("div",j,n(r(e).errors.price),1)):i("",!0)]),s("div",z,[H,s("div",{ref_key:"quillEditor",ref:_,class:"h-96"},null,512),r(e).errors.description?(d(),l("div",J,n(r(e).errors.description),1)):i("",!0)]),s("div",K,[A,u(s("input",{"onUpdate:modelValue":o[4]||(o[4]=t=>r(e).stock=t),type:"number",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).stock,void 0,{number:!0}]]),r(e).errors.stock?(d(),l("div",F,n(r(e).errors.stock),1)):i("",!0)]),s("div",G,[O,u(s("input",{"onUpdate:modelValue":o[5]||(o[5]=t=>r(e).subscription_duration=t),type:"number",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).subscription_duration,void 0,{number:!0}]]),r(e).errors.subscription_duration?(d(),l("div",W,n(r(e).errors.subscription_duration),1)):i("",!0)]),s("div",X,[Y,u(s("input",{"onUpdate:modelValue":o[6]||(o[6]=t=>r(e).license_key=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).license_key]]),r(e).errors.license_key?(d(),l("div",Z,n(r(e).errors.license_key),1)):i("",!0)]),s("div",$,[ee,u(s("input",{"onUpdate:modelValue":o[7]||(o[7]=t=>r(e).version=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).version]]),r(e).errors.version?(d(),l("div",re,n(r(e).errors.version),1)):i("",!0)]),s("div",se,[oe,u(s("input",{"onUpdate:modelValue":o[8]||(o[8]=t=>r(e).platform=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).platform]]),r(e).errors.platform?(d(),l("div",te,n(r(e).errors.platform),1)):i("",!0)]),s("div",le,[de,u(s("input",{"onUpdate:modelValue":o[9]||(o[9]=t=>r(e).download_url=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).download_url]]),r(e).errors.download_url?(d(),l("div",ae,n(r(e).errors.download_url),1)):i("",!0)]),s("div",ne,[ie,u(s("input",{"onUpdate:modelValue":o[10]||(o[10]=t=>r(e).is_subscription=t),type:"checkbox",class:"block rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[w,r(e).is_subscription]]),r(e).errors.is_subscription?(d(),l("div",ue,n(r(e).errors.is_subscription),1)):i("",!0)]),s("div",ce,[pe,u(s("input",{"onUpdate:modelValue":o[11]||(o[11]=t=>r(e).system_requirements=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"},null,512),[[c,r(e).system_requirements]]),r(e).errors.system_requirements?(d(),l("div",me,n(r(e).errors.system_requirements),1)):i("",!0)]),be])],32))}},fe=f(_e,[["__scopeId","data-v-009a6388"]]);export{fe as default};
