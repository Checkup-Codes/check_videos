import{Q as C,l as i,E as D,c as u,w as m,o as a,u as h,g as o,F as p,m as v,a as x,b as s,t as c,k as y,e as V,h as N}from"./app-vvKkNZTf.js";import{_ as k}from"./TopScreen-CYJfeXwS.js";import{_ as S}from"./CheckScreen-DsZR__6R.js";/* empty css            */const T={key:2,class:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"},$=["src"],j={class:"p-4"},E={class:"mb-2 text-lg font-semibold"},F={class:"mb-3 text-sm"},K={class:"flex justify-between text-sm"},L={key:3,class:"space-y-4 p-3"},z={class:"flex-1"},A={class:"text-lg font-semibold"},G={class:"mt-2 text-sm"},I={class:"mt-2 text-sm"},M={class:""},Q={key:4,class:"mt-6 text-center text-theme-text"},J={__name:"Screen",setup(R){const{props:n}=C(),d=i(n.writes||[]),l=i(n.category),b=n.auth,w=i(!1),_=i(n.flash.success),B=()=>{var e;if((e=l.value)!=null&&e.id){const r=`/categories/${l.value.id}/edit`;window.location.href=r}else console.error("Kategori ID bulunamadı.")},g=e=>{if(!e)return"Tarih Yok";const r={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,r)},f=e=>e?e.length>100?e.slice(0,100)+"...":e:"Açıklama bulunmamaktadır.";return D(()=>{_.value&&setTimeout(()=>{_.value=null},3e3)}),(e,r)=>(a(),u(S,null,{default:m(()=>[h(b).user?(a(),u(k,{key:0,title:l.value.name,onClick:B},null,8,["title"])):(a(),u(k,{key:1,title:l.value.name},null,8,["title"])),w.value?(a(),o("div",T,[(a(!0),o(p,null,v(d.value,t=>(a(),o("div",{key:t.id,class:"rounded-lg border text-theme-text shadow transition hover:shadow-lg"},[x(h(y),{href:e.route("categories.showByCategory",{category:l.value.slug,slug:t.slug})},{default:m(()=>[s("img",{src:t.cover_image||"https://via.placeholder.com/300x200",alt:"Kapak Resmi",class:"h-48 w-full rounded-t-lg object-cover"},null,8,$),s("div",j,[s("h3",E,c(t.title),1),s("p",F,c(f(t.meta_description)),1),s("div",K,[s("span",null,c(g(t.published_at)),1)])])]),_:2},1032,["href"])]))),128))])):(a(),o("div",L,[(a(!0),o(p,null,v(d.value,t=>(a(),o("div",{key:t.id,class:"flex items-center space-x-4 rounded-lg border p-4 text-theme-text shadow hover:shadow-md"},[s("div",z,[s("h3",A,[x(h(y),{href:e.route("categories.showByCategory",{category:l.value.slug,slug:t.slug})},{default:m(()=>[V(c(t.title),1)]),_:2},1032,["href"])]),s("p",G,c(f(t.meta_description)),1),s("div",I,[s("span",M,c(g(t.published_at)),1)])])]))),128))])),d.value.length===0?(a(),o("div",Q," Bu kategoriye ait yazı bulunmamaktadır. ")):N("",!0)]),_:1}))}};export{J as default};
