import{Q as w,l as c,T as h,I as v,g as i,b as s,a as u,w as p,o as n,u as o,j as m,G as b,t as _,h as g,F as x,m as U,q as z,v as D,e as S}from"./app-CHEKAHVn.js";import{_ as C,a as d}from"./Form-BUYRiNXi.js";import{_ as B}from"./RichTextEditor-DToKH90S.js";import{_ as K}from"./Button-B9iMskRE.js";/* empty css            */import"./quill.snow-DwFCjCBA.js";const $={class:"h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5"},M={class:"container mx-auto p-4"},N={class:"mb-4"},E=s("label",{for:"status",class:"mb-1 block text-sm font-bold text-gray-700"},"Durumu:",-1),G=s("option",{value:"draft"},"Şablon",-1),T=s("option",{value:"published"},"Yayında",-1),W=s("option",{value:"private"},"Gizli",-1),Y=[G,T,W],j={key:0,class:"text-sm text-red-500"},L={class:"mb-4"},O=s("label",{for:"category_id",class:"mb-1 block text-sm font-bold text-gray-700"},"Kategori:",-1),q=s("option",{value:"",disabled:""},"Kategori seç",-1),A=["value"],I={key:0,class:"text-sm text-red-500"},Q={class:"mb-4"},H=s("label",{for:"views_count",class:"mb-1 block text-sm font-bold text-gray-700"},"Görüntülenme Sayısı:",-1),J={class:"mb-4 flex items-center"},P=s("label",{for:"hasDraw",class:"mb-1 mr-2 text-sm font-bold text-gray-700"},"Çizim Var Mı?",-1),ae={__name:"WriteCreateForm",setup(R){const{props:y}=w(),f=c(y.categories),e=h({title:"",slug:"",content:"",published_at:"",summary:"",status:"draft",category_id:"",cover_image:"",seo_keywords:"",tags:"",views_count:0,hasDraw:!1}),l=c({title:"",slug:"",content:"",published_at:"",summary:"",status:"",category_id:"",cover_image:"",seo_keywords:"",tags:""}),V=()=>{l.value.title=e.title?"":"Başlık zorunludur.",l.value.slug=e.slug?"":"Slug zorunludur.",l.value.content=e.content?"":"İçerik zorunludur.",l.value.published_at=e.published_at?"":"Yayınlama tarihi zorunludur.",l.value.summary=e.summary?"":"Özet zorunludur.",l.value.category_id=e.category_id?"":"Kategori seçilmelidir."},k=()=>{V(),Object.values(l.value).some(r=>r!=="")||e.post(route("writes.store")).then(()=>{})};return v(e,r=>{r.title&&(l.value.title=""),r.slug&&(l.value.slug=""),r.content&&(l.value.content=""),r.published_at&&(l.value.published_at=""),r.summary&&(l.value.summary=""),r.category_id&&(l.value.category_id="")},{deep:!0}),v(()=>e.title,r=>{e.slug=r.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}),(r,a)=>(n(),i("div",$,[s("div",M,[u(C,{onSubmit:k},{default:p(()=>[u(d,{modelValue:o(e).title,"onUpdate:modelValue":a[0]||(a[0]=t=>o(e).title=t),id:"title",label:"Başlık",error:l.value.title},null,8,["modelValue","error"]),u(d,{modelValue:o(e).slug,"onUpdate:modelValue":a[1]||(a[1]=t=>o(e).slug=t),id:"slug",label:"Slug",error:l.value.slug},null,8,["modelValue","error"]),u(B,{modelValue:o(e).content,"onUpdate:modelValue":a[2]||(a[2]=t=>o(e).content=t),label:"İçerik",error:l.value.content},null,8,["modelValue","error"]),u(d,{modelValue:o(e).published_at,"onUpdate:modelValue":a[3]||(a[3]=t=>o(e).published_at=t),id:"published_at",label:"Yayınlama tarihi",type:"datetime-local",error:l.value.published_at},null,8,["modelValue","error"]),u(d,{modelValue:o(e).summary,"onUpdate:modelValue":a[4]||(a[4]=t=>o(e).summary=t),id:"summary",label:"Özet",textarea:"",rows:"3",error:l.value.summary},null,8,["modelValue","error"]),s("div",N,[E,m(s("select",{"onUpdate:modelValue":a[5]||(a[5]=t=>o(e).status=t),id:"status",class:"mt-1 block w-full rounded border-gray-300"},Y,512),[[b,o(e).status]]),l.value.status?(n(),i("p",j,_(l.value.status),1)):g("",!0)]),s("div",L,[O,m(s("select",{"onUpdate:modelValue":a[6]||(a[6]=t=>o(e).category_id=t),id:"category_id",class:"mt-1 block w-full rounded border-gray-300"},[q,(n(!0),i(x,null,U(f.value,t=>(n(),i("option",{key:t.id,value:t.id},_(t.name),9,A))),128))],512),[[b,o(e).category_id]]),l.value.category_id?(n(),i("p",I,_(l.value.category_id),1)):g("",!0)]),u(d,{modelValue:o(e).cover_image,"onUpdate:modelValue":a[7]||(a[7]=t=>o(e).cover_image=t),id:"cover_image",label:"Kapak resmi",error:l.value.cover_image},null,8,["modelValue","error"]),u(d,{modelValue:o(e).seo_keywords,"onUpdate:modelValue":a[8]||(a[8]=t=>o(e).seo_keywords=t),id:"seo_keywords",label:"SEO Anahtar Kelimeleri",error:l.value.seo_keywords},null,8,["modelValue","error"]),u(d,{modelValue:o(e).tags,"onUpdate:modelValue":a[9]||(a[9]=t=>o(e).tags=t),id:"tags",label:"Etiketler",error:l.value.tags},null,8,["modelValue","error"]),s("div",Q,[H,m(s("input",{"onUpdate:modelValue":a[10]||(a[10]=t=>o(e).views_count=t),type:"number",id:"views_count",class:"mt-1 block w-full rounded border-gray-300",readonly:""},null,512),[[z,o(e).views_count]])]),s("div",J,[P,m(s("input",{"onUpdate:modelValue":a[11]||(a[11]=t=>o(e).hasDraw=t),type:"checkbox",id:"hasDraw"},null,512),[[D,o(e).hasDraw]])]),u(K,{type:"submit"},{default:p(()=>[S("Create Write")]),_:1})]),_:1})])]))}};export{ae as default};
