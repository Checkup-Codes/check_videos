import{i as c,o as u,g as d,b as g,r as y,n as m}from"./app-CxLXp3R4.js";const p=["type"],f={__name:"CButton",props:{type:{type:String,default:"button"},variant:{type:String,default:"default",validator:e=>["default","primary","secondary","outline","destructive"].includes(e)},size:{type:String,default:"medium",validator:e=>["small","medium","large"].includes(e)}},emits:["click"],setup(e,{emit:a}){const r=e,o=a,i=t=>{o("click",t)},n=c(()=>{let t="inline-flex my-2 items-center justify-center font-semibold transition-colors focus:outline-none rounded-md";const s={default:"bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",primary:"bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",secondary:"bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",outline:"border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400",destructive:"bg-red-600 text-white hover:bg-red-500 focus:ring-red-500"},l={small:"px-3 py-1 text-sm",medium:"px-4 py-2 text-sm",large:"px-6 py-3 text-base"};return`${t} ${s[r.variant]} ${l[r.size]}`});return(t,s)=>(u(),d("div",null,[g("button",{class:m(n.value),type:e.type,onClick:i},[y(t.$slots,"default")],10,p)]))}};export{f as _};
