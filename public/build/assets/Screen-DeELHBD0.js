import{_ as h,Q as f,T as y,g as n,b as e,j as c,q as g,u as s,B as S,F as p,m as _,f as k,o as i,t as d,v as w,C as j,D as B}from"./app-vvKkNZTf.js";/* empty css            */const a=r=>(j("data-v-92549bd9"),r=r(),B(),r),M={class:"flex min-h-screen flex-col items-center bg-gray-50 p-6"},I=a(()=>e("h1",{class:"mb-8 text-3xl font-semibold text-gray-700"},"Yeni Proje Oluştur",-1)),V=a(()=>e("label",{class:"block text-gray-700"},"Proje Adı",-1)),q=a(()=>e("label",{class:"block text-gray-700"},"Müşteri Seçin",-1)),D=a(()=>e("option",{disabled:"",value:""},"Bir müşteri seçin",-1)),P=["value"],U=a(()=>e("label",{class:"block text-gray-700"},"Servis Seçin",-1)),C=["value"],F=a(()=>e("button",{type:"submit",class:"w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"}," Projeyi Kaydet ",-1)),T={__name:"Screen",setup(r){const{props:u}=f(),m=u.services,b=u.customers,o=y({project_name:"",customer_id:"",services:[]}),v=()=>{o.post("/projects")};return(A,l)=>(i(),n("div",M,[I,e("form",{onSubmit:k(v,["prevent"]),class:"w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow"},[e("div",null,[V,c(e("input",{"onUpdate:modelValue":l[0]||(l[0]=t=>s(o).project_name=t),type:"text",class:"input",required:""},null,512),[[g,s(o).project_name]])]),e("div",null,[q,c(e("select",{"onUpdate:modelValue":l[1]||(l[1]=t=>s(o).customer_id=t),class:"input",required:""},[D,(i(!0),n(p,null,_(s(b),t=>(i(),n("option",{key:t.id,value:t.id},d(t.first_name)+" "+d(t.last_name),9,P))),128))],512),[[S,s(o).customer_id]])]),e("div",null,[U,(i(!0),n(p,null,_(s(m),t=>(i(),n("div",{key:t.id,class:"flex items-center space-x-2"},[c(e("input",{type:"checkbox",value:t.id,"onUpdate:modelValue":l[2]||(l[2]=x=>s(o).services=x),class:"checkbox"},null,8,C),[[w,s(o).services]]),e("span",null,d(t.name),1)]))),128))]),F],32)]))}},L=h(T,[["__scopeId","data-v-92549bd9"]]);export{L as default};
