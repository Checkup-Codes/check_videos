import{Q as P,l as a,y as T,z as V,g as o,b as e,t as n,h as g,n as b,e as y,a as l,w as d,u as c,j as B,A as j,F as w,m as S,o as r,k as u}from"./app-wynR0Hua.js";import{D as F,C as I}from"./CloseX-D8iM4iF3.js";/* empty css            */const K={class:"relative"},M={key:0,class:"fixed right-4 top-4 z-50"},Y={class:"relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700",role:"alert"},$=e("strong",{class:"font-bold"},"Success! ",-1),A={class:"block sm:inline"},G={class:"shadow-subsidebar-shadow fixed z-30 mt-14 w-full shadow-lg lg:mt-0 lg:w-[27%]"},Q={class:"flex cursor-pointer justify-between text-sm text-black"},U={class:"m-2 space-y-4 rounded p-1 font-bold text-black"},W={class:"flex"},X={key:0},q={class:"px-1"},H=e("span",null,null,-1),J={class:"pr-1"},O={key:0,class:"duration-50 mx-3 flex content-center items-center rounded-lg transition-all"},R={key:0},Z=e("div",{class:"mx-2 rounded p-1 text-center font-bold text-black underline"},"Yeni Yazı Ekle",-1),ee=e("div",{class:"mx-2 rounded p-1 text-center font-bold text-black underline"},"Kategori Ekle",-1),te={class:"sticky top-0 z-20 bg-sidebar"},se={class:"grid grid-cols-3 gap-1 px-4 pb-3 text-sm"},oe={class:"rounded p-1 text-center font-bold"},re={class:"py-1 font-bold"},ae={class:"flex"},le={class:"py-0.5 text-sm text-gray-400"},ne={class:"px-5 py-0.5 text-sm text-gray-400"},he={__name:"SidebarLayoutWrite",setup(ce){const{props:i,url:C}=P(),D=a(i.writes),z=a(i.categories),h=a(i.category),v=a(!1),f=a(0),m=a(null),L=()=>{v.value=!v.value},E=t=>{const k={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString(void 0,k)},_=a(i.flash.success),N=i.auth,x=t=>C===t?"block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg":"block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg",p=t=>{f.value=t.target.scrollTop,localStorage.setItem("scrollPosition",f.value)};return T(()=>{_.value&&setTimeout(()=>{_.value=null},3e3);const t=localStorage.getItem("scrollPosition");t&&(m.value.scrollTop=t),window.addEventListener("scroll",p)}),V(()=>{window.removeEventListener("scroll",p)}),(t,k)=>(r(),o("div",K,[_.value?(r(),o("div",M,[e("div",Y,[$,e("span",A,n(_.value),1)])])):g("",!0),e("div",G,[e("div",Q,[e("div",null,[e("div",U,[e("div",W,[e("div",{class:b([h.value?"w-auto":"w-32","flex content-center items-center rounded-lg border-2 border-sidebar bg-gray-200 p-1 pl-3 hover:border-black"]),onClick:L},[y(" Kategori seç "),h.value?(r(),o("span",X,[y(" : "),e("span",q,n(h.value.name),1),H])):g("",!0),e("span",J,[l(F)])],2),h.value?(r(),o("div",O,[l(c(u),{href:t.route("writes.index"),class:"rounded-lg border-2 bg-gray-200 p-0.5 text-center font-bold text-black underline hover:border-black hover:bg-gray-300"},{default:d(()=>[l(I)]),_:1},8,["href"])])):g("",!0)])])]),c(N).user?(r(),o("div",R,[l(c(u),{href:"/writes/create"},{default:d(()=>[Z]),_:1}),l(c(u),{href:"/categories/create"},{default:d(()=>[ee]),_:1})])):g("",!0)]),e("div",{class:"h-[92vh] overflow-auto",onScroll:p,ref_key:"scrollContainer",ref:m},[e("div",te,[B(e("div",se,[(r(!0),o(w,null,S(z.value,s=>(r(),o("div",{key:s.id,class:"transition-all duration-100"},[l(c(u),{href:t.route("categories.show",{category:s.slug}),class:b([x(`/categories/${s.slug}`),"border-2 hover:border-black hover:bg-sidebar hover:text-black"])},{default:d(()=>[e("div",oe,n(s.name),1)]),_:2},1032,["href","class"])]))),128))],512),[[j,v.value]])]),(r(!0),o(w,null,S(D.value,s=>(r(),o("div",{key:s.id,class:"px-3 py-1"},[l(c(u),{href:t.route("writes.show",{write:s.slug}),class:b([x(`/writes/${s.slug}`),"px-2 py-1"])},{default:d(()=>[e("div",re,n(s.title),1),e("div",ae,[e("div",le,n(E(s.published_at)),1),e("div",ne,n(s.views_count)+" Görüntülenme",1)])]),_:2},1032,["href","class"])]))),128))],544)])]))}};export{he as default};
