import{d as p,T as c,o as w,c as _,w as n,a,u as s,Z as g,b as t,e as d,k as V,n as y,f as v}from"./app-CtZtcxFI.js";import{_ as b}from"./GuestLayout.vue_vue_type_script_setup_true_lang-tylvPQU0.js";import{_ as l,a as m,b as i}from"./TextInput.vue_vue_type_script_setup_true_lang-DAVVdoY7.js";import{P as k}from"./PrimaryButton-DuglQvIX.js";/* empty css            */import"./ApplicationLogo-ZCMf8cqS.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const x={class:"mt-4"},h={class:"mt-4"},q={class:"mt-4"},B={class:"mt-4 flex items-center justify-end"},z=p({__name:"Register",setup(C){const e=c({name:"",email:"",password:"",password_confirmation:""}),u=()=>{e.post(route("register"),{onFinish:()=>{e.reset("password","password_confirmation")}})};return(f,o)=>(w(),_(b,null,{default:n(()=>[a(s(g),{title:"Register"}),t("form",{onSubmit:v(u,["prevent"])},[t("div",null,[a(l,{for:"name",value:"Name"}),a(m,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:s(e).name,"onUpdate:modelValue":o[0]||(o[0]=r=>s(e).name=r),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.name},null,8,["message"])]),t("div",x,[a(l,{for:"email",value:"Email"}),a(m,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":o[1]||(o[1]=r=>s(e).email=r),required:"",autocomplete:"username"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),t("div",h,[a(l,{for:"password",value:"Password"}),a(m,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:s(e).password,"onUpdate:modelValue":o[2]||(o[2]=r=>s(e).password=r),required:"",autocomplete:"new-password"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),t("div",q,[a(l,{for:"password_confirmation",value:"Confirm Password"}),a(m,{id:"password_confirmation",type:"password",class:"mt-1 block w-full",modelValue:s(e).password_confirmation,"onUpdate:modelValue":o[3]||(o[3]=r=>s(e).password_confirmation=r),required:"",autocomplete:"new-password"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.password_confirmation},null,8,["message"])]),t("div",B,[a(s(V),{href:f.route("login"),class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"},{default:n(()=>[d(" Already registered? ")]),_:1},8,["href"]),a(k,{class:y(["ms-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:n(()=>[d(" Register ")]),_:1},8,["class","disabled"])])],32)]),_:1}))}});export{z as default};