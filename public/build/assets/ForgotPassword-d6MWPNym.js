import{d,T as u,o as l,c,w as i,a,u as s,Z as p,g as f,t as _,h as w,b as t,e as g,n as y,f as b}from"./app-BjcyWqSr.js";import{_ as k}from"./GuestLayout.vue_vue_type_script_setup_true_lang-B89MYKM5.js";import{_ as x,a as h,b as V}from"./TextInput.vue_vue_type_script_setup_true_lang-_l4CWO2T.js";import{P as v}from"./PrimaryButton-DlPu-Xd6.js";/* empty css            */import"./ApplicationLogo-BirflHp6.js";const B=t("div",{class:"mb-4 text-sm text-gray-600 dark:text-gray-400"}," Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. ",-1),N={key:0,class:"mb-4 text-sm font-medium text-green-600 dark:text-green-400"},P={class:"mt-4 flex items-center justify-end"},q=d({__name:"ForgotPassword",props:{status:{}},setup(C){const e=u({email:""}),m=()=>{e.post(route("password.email"))};return(o,r)=>(l(),c(k,null,{default:i(()=>[a(s(p),{title:"Forgot Password"}),B,o.status?(l(),f("div",N,_(o.status),1)):w("",!0),t("form",{onSubmit:b(m,["prevent"])},[t("div",null,[a(x,{for:"email",value:"Email"}),a(h,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":r[0]||(r[0]=n=>s(e).email=n),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(V,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),t("div",P,[a(v,{class:y({"opacity-25":s(e).processing}),disabled:s(e).processing},{default:i(()=>[g(" Email Password Reset Link ")]),_:1},8,["class","disabled"])])],32)]),_:1}))}});export{q as default};
