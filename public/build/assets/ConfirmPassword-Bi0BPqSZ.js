import{d as m,T as d,o as l,c,w as t,a as o,u as a,Z as p,b as e,e as f,n as u,f as _}from"./app-DtjZ5I55.js";import{_ as w}from"./GuestLayout.vue_vue_type_script_setup_true_lang-aMSmHISF.js";import{_ as b,a as x,b as g}from"./TextInput.vue_vue_type_script_setup_true_lang-BTN4x6IA.js";import{P as y}from"./PrimaryButton-DDypFGZA.js";/* empty css            */import"./ApplicationLogo-aU3eWI0G.js";const h=e("div",{class:"mb-4 text-sm text-gray-600 dark:text-gray-400"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),C={class:"mt-4 flex justify-end"},j=m({__name:"ConfirmPassword",setup(P){const s=d({password:""}),i=()=>{s.post(route("password.confirm"),{onFinish:()=>{s.reset()}})};return(V,r)=>(l(),c(w,null,{default:t(()=>[o(a(p),{title:"Confirm Password"}),h,e("form",{onSubmit:_(i,["prevent"])},[e("div",null,[o(b,{for:"password",value:"Password"}),o(x,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:a(s).password,"onUpdate:modelValue":r[0]||(r[0]=n=>a(s).password=n),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"]),o(g,{class:"mt-2",message:a(s).errors.password},null,8,["message"])]),e("div",C,[o(y,{class:u(["ms-4",{"opacity-25":a(s).processing}]),disabled:a(s).processing},{default:t(()=>[f(" Confirm ")]),_:1},8,["class","disabled"])])],32)]),_:1}))}});export{j as default};
