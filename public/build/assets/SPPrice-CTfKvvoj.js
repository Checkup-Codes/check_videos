import{i as c,g as o,t as n,o as a}from"./app-BU5Yvzcz.js";/* empty css            */const u={__name:"SPPrice",props:{price:[Number,String]},setup(e){const r=e,t=c(()=>Number(r.price).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}));return(i,s)=>(a(),o("span",null,n(t.value),1))}};export{u as default};