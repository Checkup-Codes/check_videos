import{Q as w,l as n,y as S,E as D,g as c,b as e,t as u,h,u as l,c as b,w as v,F as L,m as C,o as t,e as m,k as _,a as z,n as B}from"./app-CxLXp3R4.js";/* empty css            */const E={class:"relative"},N={key:0,class:"fixed right-4 top-10 z-50"},P={class:"relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700",role:"alert"},T=e("strong",{class:"font-bold"},"Başarılı! ",-1),V={class:"block sm:inline"},j={class:"fixed z-30 mt-14 w-full shadow-lg shadow-color-one lg:mt-0 lg:w-[27%]"},F={class:"flex cursor-pointer justify-between p-2 text-sm font-bold text-black"},I=e("div",{class:"rounded border-b-4 border-blue-100 p-2"},"Derslerimiz",-1),G={class:"sticky top-0 z-20 bg-sidebar"},M={class:"flex justify-between"},Q={class:"py-1 font-bold"},U={class:"flex"},Y={class:"py-0.5 text-sm text-gray-400"},H={__name:"SidebarLayoutLesson",setup($){const{props:r,url:g}=w(),p=n(0),i=n(null),a=n(r.flash.success);r.auth;const y=n(r.lessons),d=()=>{p.value=i.value.scrollTop,localStorage.setItem("scrollPosition",p.value)};S(()=>{a.value&&setTimeout(()=>{a.value=null},3e3);const s=localStorage.getItem("scrollPosition");s&&(i.value.scrollTop=s),window.addEventListener("scroll",d)}),D(()=>{window.removeEventListener("scroll",d)});const x=s=>g===s?"border-b border-gray-200 px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-sm bg-color-one text-black":"border-b border-gray-200 px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md text-gray-700 hover:bg-color-one hover:shadow-sm transition-all duration-200",k=s=>{const f={year:"numeric",month:"long",day:"numeric"};return new Date(s).toLocaleDateString(void 0,f)};return(s,f)=>(t(),c("div",E,[a.value?(t(),c("div",N,[e("div",P,[T,e("span",V,u(a.value),1)])])):h("",!0),e("div",j,[e("div",F,[I,l(r).auth.user?(t(),b(l(_),{key:0,href:"/lessons/create",class:"underline"},{default:v(()=>[m("Yeni Ders Ekle")]),_:1})):h("",!0)]),e("div",{class:"h-[100vh] overflow-auto",ref_key:"scrollContainer",ref:i,onScroll:d},[e("div",G,[(t(!0),c(L,null,C(y.value,o=>(t(),c("div",{key:o.id,class:"py-1"},[z(l(_),{href:s.route("lessons.show",{lesson:o.slug}),class:B([x(`/lessons/${o.slug}`),"px-2 py-1"])},{default:v(()=>[e("div",M,[e("div",Q,u(o.title),1),e("div",null,[l(r).auth.user?(t(),b(l(_),{key:0,href:s.route("lessons.edit",{lesson:o.slug}),class:"flex p-1 underline"},{default:v(()=>[m("Dersi Güncelle")]),_:2},1032,["href"])):h("",!0)])]),e("div",U,[e("div",Y,u(k(o.created_at)),1)])]),_:2},1032,["href","class"])]))),128))])],544)])]))}};export{H as default};
