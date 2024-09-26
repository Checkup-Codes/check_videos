import{Q as y,l as p,T as h,y as k,D as x,g as c,b as e,n as a,j as r,q as d,u as o,P as _,F as w,m as q,f as V,o as m,t as U}from"./app-CUtkyMvc.js";import{Q as S}from"./quill.snow-CNw5Xipd.js";const z={class:"bg-screen-bg container mx-auto p-6"},M=e("h1",{class:"mb-4 text-2xl font-bold"},"Yeni yazı oluştur",-1),B={class:"mb-4"},C={class:"mb-4"},D={class:"mb-4"},E={class:"mb-4"},F={class:"mb-4"},K={class:"mb-4"},L=e("option",{value:"draft"},"Şablon",-1),Q=e("option",{value:"published"},"Yayında",-1),T=[L,Q],W={class:"mb-4"},Y=e("option",{value:"",disabled:""},"Kategori seç",-1),j=["value"],H={class:"mb-4"},N=e("div",{class:"mb-4"},[e("button",{type:"submit",class:"rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"},"Create Write")],-1),i="block font-bold mb-1 text-sm rounded",u="mt-1 block w-full rounded",G={__name:"WriteCreateForm",setup(P){const{props:g}=y(),f=p(g.categories),t=h({title:"",slug:"",content:"",published_at:"",summary:"",status:"draft",category_id:"",cover_image:""}),v=()=>{t.post(route("writes.store")).then(()=>{})},b=p(null);return k(()=>{const n=new S(b.value,{theme:"snow",modules:{toolbar:[[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"},{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["link","image","video"],["clean"]]}});n.on("text-change",()=>{t.content=n.root.innerHTML})}),x(()=>t.title,n=>{t.slug=n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}),(n,l)=>(m(),c("div",z,[M,e("form",{onSubmit:V(v,["prevent"])},[e("div",B,[e("label",{for:"title",class:a(i)},"Başlık:"),r(e("input",{"onUpdate:modelValue":l[0]||(l[0]=s=>o(t).title=s),type:"text",id:"title",class:a(u),required:""},null,512),[[d,o(t).title]])]),e("div",C,[e("label",{for:"slug",class:a(i)},"Slug:"),r(e("input",{"onUpdate:modelValue":l[1]||(l[1]=s=>o(t).slug=s),type:"text",id:"slug",class:a(u),required:""},null,512),[[d,o(t).slug]])]),e("div",D,[e("label",{for:"content",class:a(i)},"İçerik:"),e("div",{ref_key:"quillEditor",ref:b,class:"quill-editor h-96"},null,512)]),e("div",E,[e("label",{for:"published_at",class:a(i)},"Yayınlama tarihi:"),r(e("input",{"onUpdate:modelValue":l[2]||(l[2]=s=>o(t).published_at=s),type:"datetime-local",id:"published_at",class:a(u)},null,512),[[d,o(t).published_at]])]),e("div",F,[e("label",{for:"summary",class:a(i)},"Özet:"),r(e("textarea",{"onUpdate:modelValue":l[3]||(l[3]=s=>o(t).summary=s),id:"summary",class:a(u),rows:"3"},null,512),[[d,o(t).summary]])]),e("div",K,[e("label",{for:"status",class:a(i)},"Durumu:"),r(e("select",{"onUpdate:modelValue":l[4]||(l[4]=s=>o(t).status=s),id:"status",class:"mt-1 block w-full"},T,512),[[_,o(t).status]])]),e("div",W,[e("label",{for:"category_id",class:a(i)},"Kategori:"),r(e("select",{"onUpdate:modelValue":l[5]||(l[5]=s=>o(t).category_id=s),id:"category_id",class:"mt-1 block w-full"},[Y,(m(!0),c(w,null,q(f.value,s=>(m(),c("option",{key:s.id,value:s.id},U(s.name),9,j))),128))],512),[[_,o(t).category_id]])]),e("div",H,[e("label",{for:"cover_image",class:a(i)},"Kapak resmi:"),r(e("input",{"onUpdate:modelValue":l[6]||(l[6]=s=>o(t).cover_image=s),type:"text",id:"cover_image",class:a(u)},null,512),[[d,o(t).cover_image]])]),N],32)]))}};export{G as default};
