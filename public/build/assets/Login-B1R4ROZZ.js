import{d as y,i as w,j as v,v as x,o as n,g as b,T as V,c,w as i,a as t,u as s,Z as B,t as C,h as p,b as r,k as $,e as f,n as P,f as N}from"./app-DtjZ5I55.js";import{_ as U}from"./GuestLayout.vue_vue_type_script_setup_true_lang-aMSmHISF.js";import{_ as g,a as k,b as _}from"./TextInput.vue_vue_type_script_setup_true_lang-BTN4x6IA.js";import{P as q}from"./PrimaryButton-DDypFGZA.js";/* empty css            */import"./ApplicationLogo-aU3eWI0G.js";const L=["value"],R=y({__name:"Checkbox",props:{checked:{type:Boolean},value:{}},emits:["update:checked"],setup(m,{emit:e}){const d=e,l=m,o=w({get(){return l.checked},set(a){d("update:checked",a)}});return(a,u)=>v((n(),b("input",{type:"checkbox",value:a.value,"onUpdate:modelValue":u[0]||(u[0]=h=>o.value=h),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"},null,8,L)),[[x,o.value]])}}),j={key:0,class:"mb-4 text-sm font-medium text-green-600"},D={class:"mt-4"},E={class:"mt-4 block"},F={class:"flex items-center"},M=r("span",{class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},"Remember me",-1),S={class:"mt-4 flex items-center justify-end"},I=y({__name:"Login",props:{canResetPassword:{type:Boolean},status:{}},setup(m){const e=V({email:"",password:"",remember:!1}),d=()=>{e.post(route("login"),{onFinish:()=>{e.reset("password")}})};return(l,o)=>(n(),c(U,null,{default:i(()=>[t(s(B),{title:"Log in"}),l.status?(n(),b("div",j,C(l.status),1)):p("",!0),r("form",{onSubmit:N(d,["prevent"])},[r("div",null,[t(g,{for:"email",value:"Email"}),t(k,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":o[0]||(o[0]=a=>s(e).email=a),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),t(_,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),r("div",D,[t(g,{for:"password",value:"Password"}),t(k,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:s(e).password,"onUpdate:modelValue":o[1]||(o[1]=a=>s(e).password=a),required:"",autocomplete:"current-password"},null,8,["modelValue"]),t(_,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),r("div",E,[r("label",F,[t(R,{name:"remember",checked:s(e).remember,"onUpdate:checked":o[2]||(o[2]=a=>s(e).remember=a)},null,8,["checked"]),M])]),r("div",S,[l.canResetPassword?(n(),c(s($),{key:0,href:l.route("password.request"),class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"},{default:i(()=>[f(" Forgot your password? ")]),_:1},8,["href"])):p("",!0),t(q,{class:P(["ms-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:i(()=>[f(" Log in ")]),_:1},8,["class","disabled"])])],32)]),_:1}))}});export{I as default};
