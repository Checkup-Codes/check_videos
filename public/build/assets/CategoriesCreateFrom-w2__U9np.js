import{o as r,g as l,r as w,n as y,l as f,T as C,i as k,z as V,b as d,a as n,w as c,e as b,u,j as S,q as $,F as z,m as F,t as L,G as j}from"./app-vvKkNZTf.js";import{_ as B,a as x}from"./Form-sad4BEbC.js";/* empty css            */const D={__name:"FromDesc",props:{infoClass:{type:String,default:"mb-6 border-l-4 border-gray-300 pl-4 text-sm text-theme-text"}},setup(m){return(p,i)=>(r(),l("p",{class:y(m.infoClass)},[w(p.$slots,"default")],2))}},K={class:"bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto px-5 lg:mt-0"},N={class:"container mx-auto p-4"},T={class:"mt-4"},U=d("label",{for:"parent_id_input",class:"block text-sm font-medium text-theme-text"},"Üst Kategori",-1),A={key:0,class:"mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm"},q=["onClick"],E={key:1,class:"mt-2 text-sm text-gray-500"},H={__name:"CategoriesCreateFrom",props:{categories:Array},setup(m){const i=f(m.categories),e=C({name:"",slug:"",parent_id:""}),o=f(""),g=k(()=>o.value?i.value.filter(a=>a.name.toLowerCase().includes(o.value.toLowerCase())):i.value),h=a=>{e.parent_id=a.id,o.value=a.name};V(()=>e.name,a=>{e.slug=a.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});const _=async()=>{const s=await(await fetch(route("categories.index"),{headers:{Accept:"application/json"}})).json();i.value=s.categories||[]},v=()=>{e.post(route("categories.store")).then(()=>{e.reset(),o.value="",_()})};return _(),(a,s)=>(r(),l("div",K,[d("div",N,[n(D,null,{default:c(()=>[b("Kategorileriniz için kategoriler oluşturun. İsterseniz bir üst kategori seçebilirsiniz.")]),_:1}),n(B,{onSubmit:v},{default:c(()=>[n(x,{modelValue:u(e).name,"onUpdate:modelValue":s[0]||(s[0]=t=>u(e).name=t),id:"name",label:"İsim"},null,8,["modelValue"]),n(x,{modelValue:u(e).slug,"onUpdate:modelValue":s[1]||(s[1]=t=>u(e).slug=t),id:"slug",label:"Slug"},null,8,["modelValue"]),d("div",T,[U,S(d("input",{type:"text",id:"parent_id_input","onUpdate:modelValue":s[2]||(s[2]=t=>o.value=t),placeholder:"Üst kategori arayın",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"},null,512),[[$,o.value]]),g.value.length?(r(),l("ul",A,[(r(!0),l(z,null,F(g.value,t=>(r(),l("li",{key:t.id,onClick:G=>h(t),class:"cursor-pointer px-4 py-2 hover:bg-gray-100"},L(t.name),9,q))),128))])):(r(),l("p",E,"Sonuç bulunamadı."))]),n(j,{type:"submit",class:"mt-4"},{default:c(()=>[b("Kategori Oluştur")]),_:1})]),_:1})])]))}};export{H as default};
