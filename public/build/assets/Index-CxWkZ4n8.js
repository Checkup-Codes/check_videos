import{Q as g,l as u,y as w,g as p,b as e,t as k,h as _,a as o,w as l,u as i,F as m,m as V,c as h,o as a,e as C,k as n}from"./app-k3_XiEXZ.js";import D from"./SPPrice-BID1lUTA.js";import $ from"./SPSpaces-D2EPBh7O.js";import B from"./SPAddress-DWqyIs1f.js";import S from"./Box-C8cKSwlS.js";import N from"./ConfirmModal-xlmc6YUQ.js";/* empty css            */import"./_plugin-vue_export-helper-DlAUqK2U.js";const E={key:0,class:"fixed right-4 top-4 z-50"},M={class:"relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700",role:"alert"},T=e("strong",{class:"font-bold"},"Success! ",-1),j={class:"block sm:inline"},z={class:"flex items-center justify-between px-7 py-5"},A=e("h1",{class:"text-2xl font-bold"},"Yazılım Ürünleri",-1),F={class:"grid grid-cols-1 gap-4 px-3 md:grid-cols-2 xl:grid-cols-2"},I={class:"flex justify-between"},Y={class:"items-center space-y-2 text-center"},L=e("div",{class:"rounded-sm border-[1px] px-2 py-1"},"Show",-1),Q={class:"flex space-x-1"},q=e("div",{class:"rounded-sm border-[1px] px-4 py-1"},"Edit",-1),G={class:"rounded-sm border-[1px] px-2 py-1"},H=["onClick"],ee={__name:"Index",props:{softwareProducts:Array},setup(x){const{props:v}=g(),r=u(!1),d=u(null),y=t=>{d.value=t,r.value=!0},b=()=>{Inertia.delete(route("software-products.destroy",{software_product:d.value}),{onSuccess:()=>{softwareProducts.value=softwareProducts.value.filter(t=>t.id!==d.value.id),r.value=!1}})},c=u(v.flash.success);return w(()=>{c.value&&setTimeout(()=>{c.value=null},3e3)}),(t,f)=>(a(),p(m,null,[c.value?(a(),p("div",E,[e("div",M,[T,e("span",j,k(c.value),1)])])):_("",!0),e("div",z,[A,o(i(n),{href:t.route("software-products.create"),class:"text-md text-right font-semibold underline"},{default:l(()=>[C("Yeni Ekle")]),_:1},8,["href"])]),e("div",F,[(a(!0),p(m,null,V(x.softwareProducts,s=>(a(),h(S,{key:s.slug,class:"relative"},{default:l(()=>[e("div",I,[o(i(n),{href:t.route("software-products.show",{software_product:s})},{default:l(()=>[o(D,{price:s.price,class:"text-2xl font-bold text-gray-700"},null,8,["price"]),o($,{product:s,class:"text-lg text-gray-700"},null,8,["product"]),o(B,{product:s,class:"text-gray-700"},null,8,["product"])]),_:2},1032,["href"]),e("div",Y,[o(i(n),{href:t.route("software-products.show",{software_product:s}),class:"btn-primary"},{default:l(()=>[L]),_:2},1032,["href"]),e("div",Q,[o(i(n),{href:t.route("software-products.edit",{software_product:s}),class:"btn-primary"},{default:l(()=>[q]),_:2},1032,["href"]),e("div",G,[e("button",{onClick:J=>y(s),class:"btn-secondary"},"Delete",8,H)])])])])]),_:2},1024))),128))]),r.value?(a(),h(N,{key:1,title:"Delete Product",message:"Are you sure you want to delete this product?",isVisible:r.value,onConfirm:b,onCancel:f[0]||(f[0]=s=>r.value=!1)},null,8,["isVisible"])):_("",!0)],64))}};export{ee as default};