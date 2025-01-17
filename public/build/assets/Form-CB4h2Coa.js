import{o,g as i,b as a,t as m,n,r as d,f as c}from"./app-k3_XiEXZ.js";const b={class:"relative mb-6"},f=["for"],g=["value","type","id"],S={__name:"TextInput",props:{label:String,id:String,modelValue:String,type:{type:String,default:"text"},labelClass:{type:String,default:"block font-semibold mb-2 text-sm text-gray-700"},inputClass:{type:String,default:`
      block w-full px-4 py-2 border border-gray-300 rounded-lg 
      bg-gray-50 text-sm text-gray-900 
      focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100
      transition-shadow duration-150 ease-in-out
    `}},setup(t){return(s,e)=>(o(),i("div",b,[a("label",{for:t.id,class:n(t.labelClass)},m(t.label),11,f),a("input",{value:t.modelValue,type:t.type,id:t.id,class:n(t.inputClass),onInput:e[0]||(e[0]=l=>s.$emit("update:modelValue",l.target.value))},null,42,g)]))}},x={__name:"Form",props:{onSubmit:Function},emits:["submit"],setup(t,{emit:s}){const e=t,l=s,r=()=>{e.onSubmit?e.onSubmit():l("submit")};return(u,p)=>(o(),i("form",{onSubmit:c(r,["prevent"]),class:"w-full max-w-full"},[d(u.$slots,"default")],32))}};export{x as _,S as a};
