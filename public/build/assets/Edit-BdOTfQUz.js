import{_ as w,Q as V,l as y,T as S,y as U,I as x,o as l,g as a,b as o,j as c,q as p,u as s,t as n,h as u,a as q,v as C,f as I,J as N,K as D}from"./app-BjcyWqSr.js";import{C as P}from"./ckeditor-CK_FqUeL.js";/* empty css            */const i=m=>(N("data-v-fb41f644"),m=m(),D(),m),E={class:"grid grid-cols-6 gap-4 p-5"},J={class:"col-span-3"},L=i(()=>o("label",{class:"mb-1 block font-medium"},"Name",-1)),M={key:0,class:"input-error"},B={class:"col-span-3"},O=i(()=>o("label",{class:"mb-1 block font-medium"},"Slug",-1)),R={key:0,class:"input-error"},T={class:"col-span-3"},H=i(()=>o("label",{class:"mb-1 block font-medium"},"Category",-1)),K={key:0,class:"input-error"},Q={class:"col-span-3"},j=i(()=>o("label",{class:"mb-1 block font-medium"},"Price",-1)),z={key:0,class:"input-error"},A={class:"col-span-6"},F=i(()=>o("label",{class:"mb-1 block font-medium"},"Description",-1)),G={key:0,class:"input-error"},W={class:"col-span-3"},X=i(()=>o("label",{class:"mb-1 block font-medium"},"Stock",-1)),Y={key:0,class:"input-error"},Z={class:"col-span-3"},$=i(()=>o("label",{class:"mb-1 block font-medium"},"Subscription Duration",-1)),ee={key:0,class:"input-error"},se={class:"col-span-3"},oe=i(()=>o("label",{class:"mb-1 block font-medium"},"License Key",-1)),re={key:0,class:"input-error"},te={class:"col-span-3"},de=i(()=>o("label",{class:"mb-1 block font-medium"},"Version",-1)),le={key:0,class:"input-error"},ae={class:"col-span-3"},ie=i(()=>o("label",{class:"mb-1 block font-medium"},"Platform",-1)),ne={key:0,class:"input-error"},ue={class:"col-span-3"},ce=i(()=>o("label",{class:"mb-1 block font-medium"},"Download URL",-1)),pe={key:0,class:"input-error"},me={class:"col-span-3"},be=i(()=>o("label",{class:"mb-1 block font-medium"},"Is Subscription",-1)),_e={key:0,class:"input-error"},ye={class:"col-span-6"},ke=i(()=>o("label",{class:"mb-1 block font-medium"},"System Requirements",-1)),ve={key:0,class:"input-error"},ge=i(()=>o("div",{class:"col-span-6"},[o("button",{type:"submit",class:"btn-primary"},"Update")],-1)),fe={__name:"Edit",setup(m){const{props:b}=V(),d=y(b.softwareProduct||{}),e=S({name:d.value.name||"",slug:d.value.slug||"",description:d.value.description||"",price:d.value.price||0,stock:d.value.stock||0,category:d.value.category||"",platform:d.value.platform||"",version:d.value.version||"",license_key:d.value.license_key||"",is_subscription:d.value.is_subscription||!1,subscription_duration:d.value.subscription_duration||0,download_url:d.value.download_url||"",system_requirements:d.value.system_requirements||""}),k=async()=>{try{e.system_requirements=JSON.stringify(JSON.parse(e.system_requirements))}catch{alert("Invalid JSON in System Requirements");return}await e.put(route("software-products.update",d.value.id))},_=y(b.flash);U(()=>{_.value&&setTimeout(()=>{_.value=null},3e3)});const v=P,g={toolbar:["heading","|","bold","italic","link","bulletedList","numberedList","blockQuote"],heading:{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h1",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h2",title:"Heading 2",class:"ck-heading_heading2"}]}};return(f,r)=>{const h=x("ckeditor");return l(),a("form",{onSubmit:I(k,["prevent"])},[o("div",E,[o("div",J,[L,c(o("input",{"onUpdate:modelValue":r[0]||(r[0]=t=>s(e).name=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).name]]),s(e).errors.name?(l(),a("div",M,n(s(e).errors.name),1)):u("",!0)]),o("div",B,[O,c(o("input",{"onUpdate:modelValue":r[1]||(r[1]=t=>s(e).slug=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).slug]]),s(e).errors.slug?(l(),a("div",R,n(s(e).errors.slug),1)):u("",!0)]),o("div",T,[H,c(o("input",{"onUpdate:modelValue":r[2]||(r[2]=t=>s(e).category=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).category]]),s(e).errors.category?(l(),a("div",K,n(s(e).errors.category),1)):u("",!0)]),o("div",Q,[j,c(o("input",{"onUpdate:modelValue":r[3]||(r[3]=t=>s(e).price=t),type:"number",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).price,void 0,{number:!0}]]),s(e).errors.price?(l(),a("div",z,n(s(e).errors.price),1)):u("",!0)]),o("div",A,[F,q(h,{editor:s(v),modelValue:s(e).description,"onUpdate:modelValue":r[4]||(r[4]=t=>s(e).description=t),class:"h-96",config:g},null,8,["editor","modelValue"]),s(e).errors.description?(l(),a("div",G,n(s(e).errors.description),1)):u("",!0)]),o("div",W,[X,c(o("input",{"onUpdate:modelValue":r[5]||(r[5]=t=>s(e).stock=t),type:"number",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).stock,void 0,{number:!0}]]),s(e).errors.stock?(l(),a("div",Y,n(s(e).errors.stock),1)):u("",!0)]),o("div",Z,[$,c(o("input",{"onUpdate:modelValue":r[6]||(r[6]=t=>s(e).subscription_duration=t),type:"number",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).subscription_duration,void 0,{number:!0}]]),s(e).errors.subscription_duration?(l(),a("div",ee,n(s(e).errors.subscription_duration),1)):u("",!0)]),o("div",se,[oe,c(o("input",{"onUpdate:modelValue":r[7]||(r[7]=t=>s(e).license_key=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).license_key]]),s(e).errors.license_key?(l(),a("div",re,n(s(e).errors.license_key),1)):u("",!0)]),o("div",te,[de,c(o("input",{"onUpdate:modelValue":r[8]||(r[8]=t=>s(e).version=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).version]]),s(e).errors.version?(l(),a("div",le,n(s(e).errors.version),1)):u("",!0)]),o("div",ae,[ie,c(o("input",{"onUpdate:modelValue":r[9]||(r[9]=t=>s(e).platform=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).platform]]),s(e).errors.platform?(l(),a("div",ne,n(s(e).errors.platform),1)):u("",!0)]),o("div",ue,[ce,c(o("input",{"onUpdate:modelValue":r[10]||(r[10]=t=>s(e).download_url=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).download_url]]),s(e).errors.download_url?(l(),a("div",pe,n(s(e).errors.download_url),1)):u("",!0)]),o("div",me,[be,c(o("input",{"onUpdate:modelValue":r[11]||(r[11]=t=>s(e).is_subscription=t),type:"checkbox",class:"block rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[C,s(e).is_subscription]]),s(e).errors.is_subscription?(l(),a("div",_e,n(s(e).errors.is_subscription),1)):u("",!0)]),o("div",ye,[ke,c(o("input",{"onUpdate:modelValue":r[12]||(r[12]=t=>s(e).system_requirements=t),type:"text",class:"block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600"},null,512),[[p,s(e).system_requirements]]),s(e).errors.system_requirements?(l(),a("div",ve,n(s(e).errors.system_requirements),1)):u("",!0)]),ge])],32)}}},Se=w(fe,[["__scopeId","data-v-fb41f644"]]);export{Se as default};
