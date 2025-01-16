import{d as y,Q as v,T as _,o as l,g as m,b as s,a,u as e,e as d,w as u,k as x,j as h,B as k,h as c,E as V,f as b}from"./app-CHEKAHVn.js";import{_ as f,a as p,b as g}from"./TextInput.vue_vue_type_script_setup_true_lang-TS8IqrPK.js";import{P as w}from"./PrimaryButton-IRHTmF_x.js";const B=s("header",null,[s("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"},"Profile Information"),s("p",{class:"mt-1 text-sm text-gray-600 dark:text-gray-400"}," Update your account's profile information and email address. ")],-1),E={key:0},N={class:"mt-2 text-sm text-gray-800 dark:text-gray-200"},S={class:"mt-2 text-sm font-medium text-green-600 dark:text-green-400"},C={class:"flex items-center gap-4"},P={key:0,class:"text-sm text-gray-600 dark:text-gray-400"},I=y({__name:"UpdateProfileInformationForm",props:{mustVerifyEmail:{},status:{}},setup(U){const n=v().props.auth.user,t=_({name:n.name,email:n.email});return(r,o)=>(l(),m("section",null,[B,s("form",{onSubmit:o[2]||(o[2]=b(i=>e(t).patch(r.route("profile.update")),["prevent"])),class:"mt-6 space-y-6"},[s("div",null,[a(f,{for:"name",value:"Name"}),a(p,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:e(t).name,"onUpdate:modelValue":o[0]||(o[0]=i=>e(t).name=i),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),a(g,{class:"mt-2",message:e(t).errors.name},null,8,["message"])]),s("div",null,[a(f,{for:"email",value:"Email"}),a(p,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:e(t).email,"onUpdate:modelValue":o[1]||(o[1]=i=>e(t).email=i),required:"",autocomplete:"username"},null,8,["modelValue"]),a(g,{class:"mt-2",message:e(t).errors.email},null,8,["message"])]),r.mustVerifyEmail&&e(n).email_verified_at===null?(l(),m("div",E,[s("p",N,[d(" Your email address is unverified. "),a(e(x),{href:r.route("verification.send"),method:"post",as:"button",class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"},{default:u(()=>[d(" Click here to re-send the verification email. ")]),_:1},8,["href"])]),h(s("div",S," A new verification link has been sent to your email address. ",512),[[k,r.status==="verification-link-sent"]])])):c("",!0),s("div",C,[a(w,{disabled:e(t).processing},{default:u(()=>[d("Save")]),_:1},8,["disabled"]),a(V,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:u(()=>[e(t).recentlySuccessful?(l(),m("p",P,"Saved.")):c("",!0)]),_:1})])],32)]))}});export{I as _};