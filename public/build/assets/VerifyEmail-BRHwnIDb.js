import{d as f,T as m,i as g,o as a,c as p,w as s,a as o,u as e,Z as y,g as h,h as _,b as i,e as r,n as k,k as x,f as v}from"./app-DtjZ5I55.js";import{_ as b}from"./GuestLayout.vue_vue_type_script_setup_true_lang-aMSmHISF.js";import{P as w}from"./PrimaryButton-DDypFGZA.js";/* empty css            */import"./ApplicationLogo-aU3eWI0G.js";const V=i("div",{class:"mb-4 text-sm text-gray-600 dark:text-gray-400"}," Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ",-1),B={key:0,class:"mb-4 text-sm font-medium text-green-600 dark:text-green-400"},C={class:"mt-4 flex items-center justify-between"},S=f({__name:"VerifyEmail",props:{status:{}},setup(n){const d=n,t=m({}),c=()=>{t.post(route("verification.send"))},u=g(()=>d.status==="verification-link-sent");return(l,E)=>(a(),p(b,null,{default:s(()=>[o(e(y),{title:"Email Verification"}),V,u.value?(a(),h("div",B," A new verification link has been sent to the email address you provided during registration. ")):_("",!0),i("form",{onSubmit:v(c,["prevent"])},[i("div",C,[o(w,{class:k({"opacity-25":e(t).processing}),disabled:e(t).processing},{default:s(()=>[r(" Resend Verification Email ")]),_:1},8,["class","disabled"]),o(e(x),{href:l.route("logout"),method:"post",as:"button",class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"},{default:s(()=>[r("Log Out")]),_:1},8,["href"])])],32)]),_:1}))}});export{S as default};
