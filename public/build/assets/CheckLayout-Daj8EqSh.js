import{o as a,g as n,r as p,n as i,_,N as f,O as C,b as h,Q as b,l as v,a as c,u as r,w as y,F as k,Z as x,c as S,h as d}from"./app-CxLXp3R4.js";import w from"./SidebarLayoutWrite-pP9dNFKT.js";import B from"./SidebarLayoutCategory-BJ-wqNQf.js";/* empty css            */import"./CategoryMenu-dg23Vg97.js";import"./WriteList-CmBzl3_7.js";import"./CButton-CalFxj68.js";const $={__name:"CCheckLayout",props:{infoClass:{type:String,default:"grid mt-12 lg:mt-0 h-full grid-cols-1 lg:grid-cols-subsidebar"},isCollapsed:{type:Boolean}},setup(e){return(o,s)=>(a(),n("div",{class:i(e.isCollapsed?e.infoClass:"")},[p(o.$slots,"default")],2))}},N=e=>(f("data-v-eaaba8ca"),e=e(),C(),e),I=N(()=>h("span",{class:"items-center text-xl"}," ⇔",-1)),F=[I],L={__name:"CToggleButton",props:{isCollapsed:Boolean,toggle:Function},setup(e){return(o,s)=>(a(),n("button",{class:i(["fixed top-1/2 z-50 h-8 w-8 -translate-y-1/2 transform items-center rounded-full bg-black pb-0.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-600 hover:shadow-xl",[e.isCollapsed?"left-[611px]":"left-[211px]"]]),onClick:s[0]||(s[0]=(...t)=>e.toggle&&e.toggle(...t))},F,2))}},V=_(L,[["__scopeId","data-v-eaaba8ca"]]),z={key:0},T={key:1},q={__name:"CheckLayout",setup(e){const{props:o}=b(),s=o.screen.isMobileSidebar?"":"hidden lg:block",t=o.screen.name,u=t.charAt(0).toUpperCase()+t.slice(1)+" - ",l=v(!0),m=()=>{l.value=!l.value};return(g,A)=>(a(),n(k,null,[c(r(x),{title:u}),c(V,{isCollapsed:l.value,toggle:m},null,8,["isCollapsed"]),c($,{isCollapsed:l.value},{default:y(()=>[r(t)==="writes"?(a(),n("div",z,[l.value?(a(),S(w,{key:0,class:i(r(s))},null,8,["class"])):d("",!0)])):r(t)==="categories"?(a(),n("div",T,[c(B,{class:i(r(s))},null,8,["class"])])):d("",!0),p(g.$slots,"screen")]),_:3},8,["isCollapsed"])],64))}};export{q as default};
