import{i as v,a1 as o,l as _,g,b as e,a as i,w,t as y,j as h,q as x,u as f,o as b}from"./app-vvKkNZTf.js";import d from"./SPPrice-BIiB_cSd.js";import P from"./Box-yPRNhmDT.js";/* empty css            */const j=(s,a,t)=>{const l=v(()=>{const m=o(s)?s.value:s,c=(o(a)?a.value:a)/100/12,n=(o(t)?t.value:t)*12;return m*c*Math.pow(1+c,n)/(Math.pow(1+c,n)-1)}),r=v(()=>(o(t)?t.value:t)*12*l.value),u=v(()=>r.value-(o(s)?s.value:s));return{monthlyPayment:l,totalPaid:r,totalInterest:u}},k={class:"flex flex-col-reverse gap-4 p-5 md:grid md:grid-cols-12"},M=e("div",{class:"w-full text-center font-medium text-gray-500"},"Resim yok",-1),B={class:"flex flex-col gap-4 md:col-span-5"},V={class:"label"},z={class:"label"},I={class:"mt-2 text-gray-600 dark:text-gray-300"},S=e("div",{class:"text-gray-400"},"Aylık ödemeniz",-1),D={class:"mt-2 text-gray-500"},N={class:"flex justify-between"},O=e("div",null,"Toplam ödeme",-1),T={class:"flex justify-between"},U=e("div",null,"Ödenen anapara",-1),q={class:"flex justify-between"},A=e("div",null,"Ödenen faiz",-1),$={__name:"Show",props:{softwareProduct:Object},setup(s){const a=s,t=_(2.5),l=_(25),{monthlyPayment:r,totalPaid:u,totalInterest:m}=j(a.softwareProduct.price,t,l);return(c,n)=>(b(),g("div",null,[e("div",k,[i(P,{class:"flex w-full items-center md:col-span-7"},{default:w(()=>[M]),_:1}),e("div",B,[e("div",null,[e("label",V,"Faiz oranı ("+y(t.value)+"%)",1),h(e("input",{"onUpdate:modelValue":n[0]||(n[0]=p=>t.value=p),type:"range",min:"0.1",max:"30",step:"0.1",class:"h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-100"},null,512),[[x,t.value,void 0,{number:!0}]]),e("label",z,"Süre ("+y(l.value)+" yıl)",1),h(e("input",{"onUpdate:modelValue":n[1]||(n[1]=p=>l.value=p),type:"range",min:"3",max:"35",step:"1",class:"h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-100"},null,512),[[x,l.value,void 0,{number:!0}]]),e("div",I,[S,i(d,{price:f(r),class:"text-3xl"},null,8,["price"])]),e("div",D,[e("div",N,[O,e("div",null,[i(d,{price:f(u),class:"font-medium"},null,8,["price"])])]),e("div",T,[U,e("div",null,[i(d,{price:s.softwareProduct.price,class:"font-medium"},null,8,["price"])])]),e("div",q,[A,e("div",null,[i(d,{price:f(m),class:"font-medium"},null,8,["price"])])])])])])])]))}};export{$ as default};
