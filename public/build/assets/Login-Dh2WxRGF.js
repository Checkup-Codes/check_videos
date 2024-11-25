import{d as y,i as w,j as v,v as x,o as n,g as b,T as V,c,w as i,a,u as s,Z as B,t as C,h as p,b as r,k as $,e as f,n as P,f as N}from"./app-WShForID.js";import{_ as U}from"./GuestLayout.vue_vue_type_script_setup_true_lang-vFWcXkhG.js";import{_ as g,a as k,b as _}from"./TextInput.vue_vue_type_script_setup_true_lang-T3LT1IOL.js";import{P as q}from"./PrimaryButton-Cy_y0HQw.js";/* empty css            */import"./ApplicationLogo-CLmMhbk8.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const L=["value"],R=y({__name:"Checkbox",props:{checked:{type:Boolean},value:{}},emits:["update:checked"],setup(m,{emit:e}){const d=e,l=m,o=w({get(){return l.checked},set(t){d("update:checked",t)}});return(t,u)=>v((n(),b("input",{type:"checkbox",value:t.value,"onUpdate:modelValue":u[0]||(u[0]=h=>o.value=h),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"},null,8,L)),[[x,o.value]])}}),j={key:0,class:"mb-4 text-sm font-medium text-green-600"},D={class:"mt-4"},E={class:"mt-4 block"},F={class:"flex items-center"},M=r("span",{class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},"Remember me",-1),S={class:"mt-4 flex items-center justify-end"},J=y({__name:"Login",props:{canResetPassword:{type:Boolean},status:{}},setup(m){const e=V({email:"",password:"",remember:!1}),d=()=>{e.post(route("login"),{onFinish:()=>{e.reset("password")}})};return(l,o)=>(n(),c(U,null,{default:i(()=>[a(s(B),{title:"Log in"}),l.status?(n(),b("div",j,C(l.status),1)):p("",!0),r("form",{onSubmit:N(d,["prevent"])},[r("div",null,[a(g,{for:"email",value:"Email"}),a(k,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":o[0]||(o[0]=t=>s(e).email=t),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(_,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),r("div",D,[a(g,{for:"password",value:"Password"}),a(k,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:s(e).password,"onUpdate:modelValue":o[1]||(o[1]=t=>s(e).password=t),required:"",autocomplete:"current-password"},null,8,["modelValue"]),a(_,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),r("div",E,[r("label",F,[a(R,{name:"remember",checked:s(e).remember,"onUpdate:checked":o[2]||(o[2]=t=>s(e).remember=t)},null,8,["checked"]),M])]),r("div",S,[l.canResetPassword?(n(),c(s($),{key:0,href:l.route("password.request"),class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"},{default:i(()=>[f(" Forgot your password? ")]),_:1},8,["href"])):p("",!0),a(q,{class:P(["ms-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:i(()=>[f(" Log in ")]),_:1},8,["class","disabled"])])],32)]),_:1}))}});export{J as default};