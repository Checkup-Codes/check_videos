import{Q as b,l as x,g as o,b as t,a as r,w as a,u as n,F as f,m as k,o as i,k as l,t as d,n as g}from"./app-CShFai_0.js";/* empty css            */const v={class:"z-10 h-screen shadow-right shadow-gray-100"},w={class:"z-10 flex cursor-pointer justify-between bg-sidebar text-sm text-black"},y=t("div",{class:"m-2 rounded p-1 text-center font-bold text-black underline"},"All Writes",-1),B=t("div",{class:"m-2 rounded p-1 text-center font-bold text-black underline"},"Create Write",-1),D={class:"font-bold"},L={class:"text-sm text-gray-400"},F={__name:"SidebarLayoutBookmarks",setup(z){const{props:u,url:m}=b(),h=x(u.bookmarkCategories),_=s=>{const c={year:"numeric",month:"long",day:"numeric"};return new Date(s).toLocaleDateString(void 0,c)},p=s=>m===s?"block cursor-pointer m-2 text-sm rounded px-3 py-1 text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg":"block cursor-pointer m-2 text-sm rounded px-3 py-1 text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg hover:px-4";return(s,c)=>(i(),o("div",v,[t("div",w,[r(n(l),{href:"/bookmarks"},{default:a(()=>[y]),_:1}),r(n(l),{href:"/bookmarks/create"},{default:a(()=>[B]),_:1})]),(i(!0),o(f,null,k(h.value,e=>(i(),o("div",{key:e.id,class:"ml-2"},[r(n(l),{href:`/bookmarks/${e.slug}`,class:g(p(`/bookmarks/${e.slug}`))},{default:a(()=>[t("div",D,d(e.name),1),t("div",L,d(_(e.published_at)),1)]),_:2},1032,["href","class"])]))),128))]))}};export{F as default};