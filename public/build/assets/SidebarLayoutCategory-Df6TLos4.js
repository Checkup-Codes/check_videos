import{_ as T,Q as V,l as r,y as $,z as j,g as o,b as e,t as d,h as p,n as y,e as D,a as l,w as u,u as n,j as F,A as K,F as I,m as L,o as a,k as g,I as M,J as U}from"./app-wynR0Hua.js";import{D as Y,C as A}from"./CloseX-D8iM4iF3.js";/* empty css            */const b=h=>(M("data-v-1f5e33ef"),h=h(),U(),h),J={class:"relative"},Q={key:0,class:"fixed right-4 top-4 z-50"},X={class:"relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700",role:"alert"},q=b(()=>e("strong",{class:"font-bold"},"Başarılı! ",-1)),G={class:"block sm:inline"},H={class:"shadow-subsidebar-shadow fixed z-30 mt-14 w-full shadow-lg lg:mt-0 lg:w-[27%]"},O={class:"flex cursor-pointer justify-between text-sm text-black"},R={class:"m-2 space-y-4 rounded p-1 font-bold text-black"},W={class:"flex"},Z={key:0},ee={class:"px-1"},te=b(()=>e("span",null,null,-1)),se={class:"pr-1"},oe={key:0,class:"duration-50 mx-3 flex content-center items-center rounded-lg transition-all"},ae={key:0},re=b(()=>e("div",{class:"mx-2 rounded p-1 text-center font-bold text-black underline"},"Yeni Yazı Ekle",-1)),le=b(()=>e("div",{class:"mx-2 rounded p-1 text-center font-bold text-black underline"},"Kategori Ekle",-1)),ne={class:"sticky top-0 z-20 bg-sidebar"},ce={class:"grid grid-cols-3 gap-1 bg-sidebar px-4 pb-3 text-sm"},ie={class:"rounded p-1 text-center font-bold"},de={class:"py-0.5 font-bold"},ue={class:"py-1 text-sm text-gray-400"},ge={__name:"SidebarLayoutCategory",setup(h){const{props:c,url:z}=V(),B=r(c.writes),k=r(c.categories),_=r(c.category),f=r(!0),w=r(0),m=r(null),E=s=>{const i={year:"numeric",month:"long",day:"numeric"};return new Date(s).toLocaleDateString(void 0,i)},v=r(c.flash.success),N=c.auth,S=s=>z.includes(s)?"block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg":"block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg",P=()=>{f.value=!f.value},x=()=>{w.value=m.value.scrollTop,localStorage.setItem("scrollPosition",w.value)};$(()=>{v.value&&setTimeout(()=>{v.value=null},3e3);const s=localStorage.getItem("scrollPosition");s&&(m.value.scrollTop=s),window.addEventListener("scroll",x)}),j(()=>{window.removeEventListener("scroll",x)});const C=s=>{const i=k.value.find(t=>t.id===s);return i?i.slug:"Unknown"};return(s,i)=>(a(),o("div",J,[v.value?(a(),o("div",Q,[e("div",X,[q,e("span",G,d(v.value),1)])])):p("",!0),e("div",H,[e("div",O,[e("div",null,[e("div",R,[e("div",W,[e("div",{class:y([_.value?"w-auto":"w-32","flex content-center items-center rounded-lg border-2 border-sidebar bg-gray-200 p-1 pl-3 hover:border-black"]),onClick:P},[D(" Kategori seç "),_.value?(a(),o("span",Z,[D(" : "),e("span",ee,d(_.value.name),1),te])):p("",!0),e("span",se,[l(Y)])],2),_.value?(a(),o("div",oe,[l(n(g),{href:s.route("writes.index"),class:"rounded-lg border-2 bg-gray-200 p-0.5 text-center font-bold text-black underline hover:border-black hover:bg-gray-300"},{default:u(()=>[l(A)]),_:1},8,["href"])])):p("",!0)])])]),n(N).user?(a(),o("div",ae,[l(n(g),{href:"/writes/create"},{default:u(()=>[re]),_:1}),l(n(g),{href:"/categories/create"},{default:u(()=>[le]),_:1})])):p("",!0)]),e("div",{class:"h-[92vh] overflow-auto",ref_key:"scrollContainer",ref:m,onScroll:x},[e("div",ne,[F(e("div",ce,[(a(!0),o(I,null,L(k.value,t=>(a(),o("div",{key:t.id,class:"transition-all duration-100"},[l(n(g),{href:s.route("categories.show",{category:t.slug}),class:y([S(`/categories/${t.slug}`),"border-2 hover:border-black hover:bg-sidebar hover:text-black"])},{default:u(()=>[e("div",ie,d(t.name),1)]),_:2},1032,["href","class"])]))),128))],512),[[K,f.value]])]),(a(!0),o(I,null,L(B.value,t=>(a(),o("div",{key:t.id,class:"px-3 py-1"},[l(n(g),{href:s.route("categories.showByCategory",{category:C(t.category_id),slug:t.slug}),class:y([S(`/categories/${C(t.category_id)}/${t.slug}`),"px-3 py-1"])},{default:u(()=>[e("div",de,d(t.title),1),e("div",ue,d(E(t.published_at)),1)]),_:2},1032,["href","class"])]))),128))],544)])]))}},pe=T(ge,[["__scopeId","data-v-1f5e33ef"]]);export{pe as default};