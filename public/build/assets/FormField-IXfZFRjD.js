import{l as p,z as b,g as a,b as s,t as n,n as d,j as f,a3 as S,h as g,o as i}from"./app-vvKkNZTf.js";/* empty css            */const k={class:"mb-4"},V=["for"],h=["type","id"],v={key:0,class:"text-sm text-red-500"},x="block font-bold mb-1 text-sm rounded",E="mt-1 block w-full rounded",B={__name:"FormField",props:{modelValue:{type:[String,Number],required:!0},label:{type:String,required:!0},type:{type:String,default:"text"},id:{type:String,required:!0},error:{type:String,default:""}},emits:["update:modelValue","clearError"],setup(e,{emit:u}){const c=e,r=u,t=p(c.modelValue);b(t,l=>{r("update:modelValue",l)});const m=()=>{r("clearError")};return(l,o)=>(i(),a("div",k,[s("label",{for:e.id,class:d(x)},n(e.label),9,V),f(s("input",{type:e.type,id:e.id,class:d(E),"onUpdate:modelValue":o[0]||(o[0]=y=>t.value=y),onInput:m},null,40,h),[[S,t.value]]),e.error?(i(),a("p",v,n(e.error),1)):g("",!0)]))}};export{B as default};
