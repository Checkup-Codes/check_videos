import{l as m,y as v,E as g,g as a,F as p,m as f,o as l,a as h,w as y,b as r,t as c,n as b,u as _,k as x}from"./app-CtZtcxFI.js";/* empty css            */const w={class:"font-semibold"},k={class:"mt-1 flex justify-between text-xs text-gray-500"},C={__name:"WriteList",props:{writes:Array,route:Function},setup(i){const s=m(null),n=e=>{localStorage.setItem("scrollPosition",e.target.scrollTop)};v(()=>{var t;const e=localStorage.getItem("scrollPosition");e&&s.value&&(s.value.scrollTop=e),(t=s.value)==null||t.addEventListener("scroll",n)}),g(()=>{var e;(e=s.value)==null||e.removeEventListener("scroll",n)});const u=e=>{const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)},d=e=>`
    border-b border-color-one px-4 py-3 block cursor-pointer p-2 text-sm rounded-sm transition-all duration-200
    ${window.location.pathname===e?"bg-active-one hover:bg-hover-one text-gray-700":"text-gray-700 hover:bg-color-one "}
  `;return(e,t)=>(l(),a("div",{class:"-z-10 h-screen overflow-auto pb-8 lg:py-0",ref_key:"scrollContainer",ref:s,onScroll:n},[(l(!0),a(p,null,f(i.writes,o=>(l(),a("div",{key:o.id,class:"border-r-2"},[h(_(x),{href:i.route("writes.show",{write:o.slug}),class:b(d(`/writes/${o.slug}`))},{default:y(()=>[r("div",w,c(o.title),1),r("div",k,[r("span",null,c(u(o.created_at)),1),r("span",null,c(o.views_count)+" Görüntülenme",1)])]),_:2},1032,["href","class"])]))),128))],544))}};export{C as default};