import{Q as h,l as r,y as m,g as a,b as e,t as i,h as f,F as b,m as g,o as n,a as y,w as x,n as k,u as w,k as S}from"./app-CcIPdWom.js";/* empty css            */const C={class:"relative border-r border-color-one"},L=e("div",{class:"border-b-2 border-color-one px-3 lg:relative"},[e("div",{class:"flex items-center justify-between"},[e("div",{class:"py-3 text-sm font-semibold"},[e("span",{class:"px-3 py-1"},"VERSİYONLAR")])])],-1),V={key:0,class:"fixed right-4 top-4 z-50"},B={class:"relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700",role:"alert"},D=e("strong",{class:"font-bold"},"Başarılı! ",-1),N={class:"block sm:inline"},z={class:"min-h-full"},E={class:"py-1 font-bold"},F={class:"flex"},P={class:"py-0.5 text-sm"},j={__name:"SidebarLayoutVersion",setup(R){const{props:l,url:u}=h(),p=r(l.versions),t=r(l.flash.success);l.auth;const c=r(null);r(0);const v=s=>{const d={year:"numeric",month:"long",day:"numeric"};return new Date(s).toLocaleDateString(void 0,d)},_=s=>u===s?"block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 bg-primary-200 text-black shadow-inner":"block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 hover:shadow-inner";return m(()=>{t.value&&setTimeout(()=>{t.value=null},3e3);const s=localStorage.getItem("scrollPosition");s&&(c.value.scrollTop=s)}),(s,d)=>(n(),a("div",C,[L,t.value?(n(),a("div",V,[e("div",B,[D,e("span",N,i(t.value),1)])])):f("",!0),e("div",{ref_key:"scrollContainer",ref:c,class:"h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-4rem)]"},[e("div",z,[(n(!0),a(b,null,g(p.value,o=>(n(),a("div",{key:o.id,class:"px-3 py-1"},[y(w(S),{href:`/versions/${o.version}`,class:k([_(`/versions/${o.version}`),"px-2 py-1"])},{default:x(()=>[e("div",E,i(o.version),1),e("div",F,[e("div",P,i(v(o.updated_at)),1)])]),_:2},1032,["href","class"])]))),128))])],512)]))}};export{j as default};