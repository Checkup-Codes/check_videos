import c from"./TopSubsidebar-LmMOFeMe.js";import m from"./WriteList-DvY7cRe-.js";import{Q as u,l as t,c as n,w as _,o as f,a as s}from"./app-CcIPdWom.js";import{a as d,_ as w}from"./CheckSubsidebar-prYWLFhl.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";/* empty css            */const x={__name:"SidebarLayoutWrite",emits:["update:isCollapsed"],setup(C,{emit:o}){const{props:a}=u(),r=t(a.writes);t(a.categories);const e=t(!0),i=o,l=()=>{e.value=!e.value,i("update:isCollapsed",e.value)};return(p,v)=>(f(),n(d,null,{default:_(()=>[s(w,{isCollapsed:!1,toggle:l}),s(c,{title:"YAZILAR"}),s(m,{writes:r.value,route:p.route},null,8,["writes","route"])]),_:1}))}};export{x as default};