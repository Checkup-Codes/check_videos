import{o,g as i,b as l,t as m,n,r as d,f as c}from"./app-DhQCxfTn.js";const b={class:"relative mb-6"},f=["for"],p=["value","type","id"],y={__name:"TextInput",props:{label:String,id:String,modelValue:String,type:{type:String,default:"text"},labelClass:{type:String,default:"block font-semibold mb-2 text-sm text-theme-text"},inputClass:{type:String,default:`
      block w-full px-4 py-2 border border-gray-300 rounded-lg 
      bg-gray-50 text-sm text-black
      focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100
      transition-shadow duration-150 ease-in-out
    `}},setup(t){return(s,e)=>(o(),i("div",b,[l("label",{for:t.id,class:n(t.labelClass)},m(t.label),11,f),l("input",{value:t.modelValue,type:t.type,id:t.id,class:n(t.inputClass),onInput:e[0]||(e[0]=a=>s.$emit("update:modelValue",a.target.value))},null,42,p)]))}},x={__name:"Form",props:{onSubmit:Function},emits:["submit"],setup(t,{emit:s}){const e=t,a=s,u=()=>{e.onSubmit?e.onSubmit():a("submit")};return(r,g)=>(o(),i("form",{onSubmit:c(u,["prevent"]),class:"mx-auto w-[90%]"},[d(r.$slots,"default")],32))}};export{x as _,y as a};
