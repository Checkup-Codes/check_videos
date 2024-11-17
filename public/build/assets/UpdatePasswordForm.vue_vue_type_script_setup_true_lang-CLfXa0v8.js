import{d as y,l as i,T as g,o as m,g as w,b as o,a as e,u as r,w as f,e as v,h as x,G as V,f as k}from"./app-CtZtcxFI.js";import{_ as l,a as d,b as u}from"./TextInput.vue_vue_type_script_setup_true_lang-DAVVdoY7.js";import{P}from"./PrimaryButton-DuglQvIX.js";const b=o("header",null,[o("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"},"Update Password"),o("p",{class:"mt-1 text-sm text-gray-600 dark:text-gray-400"}," Ensure your account is using a long, random password to stay secure. ")],-1),S={class:"flex items-center gap-4"},C={key:0,class:"text-sm text-gray-600 dark:text-gray-400"},h=y({__name:"UpdatePasswordForm",setup(N){const p=i(null),c=i(null),s=g({current_password:"",password:"",password_confirmation:""}),_=()=>{s.put(route("password.update"),{preserveScroll:!0,onSuccess:()=>{s.reset()},onError:()=>{var n,a;s.errors.password&&(s.reset("password","password_confirmation"),(n=p.value)==null||n.focus()),s.errors.current_password&&(s.reset("current_password"),(a=c.value)==null||a.focus())}})};return(n,a)=>(m(),w("section",null,[b,o("form",{onSubmit:k(_,["prevent"]),class:"mt-6 space-y-6"},[o("div",null,[e(l,{for:"current_password",value:"Current Password"}),e(d,{id:"current_password",ref_key:"currentPasswordInput",ref:c,modelValue:r(s).current_password,"onUpdate:modelValue":a[0]||(a[0]=t=>r(s).current_password=t),type:"password",class:"mt-1 block w-full",autocomplete:"current-password"},null,8,["modelValue"]),e(u,{message:r(s).errors.current_password,class:"mt-2"},null,8,["message"])]),o("div",null,[e(l,{for:"password",value:"New Password"}),e(d,{id:"password",ref_key:"passwordInput",ref:p,modelValue:r(s).password,"onUpdate:modelValue":a[1]||(a[1]=t=>r(s).password=t),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(u,{message:r(s).errors.password,class:"mt-2"},null,8,["message"])]),o("div",null,[e(l,{for:"password_confirmation",value:"Confirm Password"}),e(d,{id:"password_confirmation",modelValue:r(s).password_confirmation,"onUpdate:modelValue":a[2]||(a[2]=t=>r(s).password_confirmation=t),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(u,{message:r(s).errors.password_confirmation,class:"mt-2"},null,8,["message"])]),o("div",S,[e(P,{disabled:r(s).processing},{default:f(()=>[v("Save")]),_:1},8,["disabled"]),e(V,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:f(()=>[r(s).recentlySuccessful?(m(),w("p",C,"Saved.")):x("",!0)]),_:1})])],32)]))}});export{h as _};