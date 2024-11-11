import{Q as x,T as k,i as w,g as n,b as e,j as i,q as d,u as r,I as S,F as p,m as g,f as b,o as a,t as z}from"./app-CxLXp3R4.js";/* empty css            */const U={class:"flex min-h-screen flex-col items-center bg-gray-50 p-6"},A=e("h1",{class:"mb-8 text-3xl font-bold text-gray-700"},"Hizmeti Düzenle",-1),V={class:"rounded-lg border border-gray-200 bg-white p-6 shadow"},C=e("label",{class:"mb-2 block font-medium text-gray-700"},"Hizmet Adı",-1),K=e("label",{class:"mb-2 mt-4 block font-medium text-gray-700"},"Hizmet Açıklaması",-1),D=e("label",{class:"mb-2 mt-4 block font-medium text-gray-700"},"Fiyat (USD)",-1),H=e("label",{class:"mb-2 mt-4 block font-medium text-gray-700"},"Üst Kategori",-1),F=e("option",{value:null},"Yok",-1),B=["value"],M={class:"rounded-lg border border-gray-200 bg-white p-6 shadow"},$=e("h2",{class:"mb-4 text-xl font-semibold text-blue-600"},"Alt Kategoriler",-1),E={class:"space-y-6"},T=e("label",{class:"block font-medium text-gray-700"},"Alt Kategori Adı",-1),Y=["onUpdate:modelValue"],j=e("label",{class:"mt-4 block font-medium text-gray-700"},"Fiyat (USD)",-1),q=["onUpdate:modelValue"],I=["onClick"],L={class:"flex space-x-4"},N=e("button",{type:"submit",class:"flex-1 rounded bg-green-500 p-3 font-semibold text-white shadow-md hover:bg-green-600"}," Değişiklikleri Kaydet ",-1),J={__name:"Screen",setup(O){const{props:l}=x(),t=k({id:l.service.id,name:l.service.name||"",description:l.service.description||"",price:l.service.price||"",parent_id:l.service.parent_id||null,subCategories:l.service.subCategories||[]}),f=w(()=>l.services.filter(u=>u.id!==t.id)),_=()=>{t.subCategories.push({name:"",price:""})},h=u=>{t.subCategories.splice(u,1)},y=()=>{t.put(`/services/${t.id}`)},v=()=>{confirm("Bu hizmeti silmek istediğinize emin misiniz?")&&t.delete(`/services/${t.id}`)};return(u,s)=>(a(),n("div",U,[A,e("form",{onSubmit:b(y,["prevent"]),class:"w-full max-w-lg space-y-8"},[e("div",V,[C,i(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>r(t).name=o),type:"text",class:"w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none",placeholder:"Hizmet adını girin"},null,512),[[d,r(t).name]]),K,i(e("textarea",{"onUpdate:modelValue":s[1]||(s[1]=o=>r(t).description=o),class:"w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none",placeholder:"Hizmet açıklamasını girin",rows:"3"},null,512),[[d,r(t).description]]),D,i(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>r(t).price=o),type:"number",class:"w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none",placeholder:"Fiyatı girin"},null,512),[[d,r(t).price]]),H,i(e("select",{"onUpdate:modelValue":s[3]||(s[3]=o=>r(t).parent_id=o),class:"w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"},[F,(a(!0),n(p,null,g(f.value,o=>(a(),n("option",{key:o.id,value:o.id},z(o.name),9,B))),128))],512),[[S,r(t).parent_id]])]),e("div",M,[$,e("ul",E,[(a(!0),n(p,null,g(r(t).subCategories,(o,m)=>(a(),n("li",{key:m,class:"border-l-4 border-gray-200 pl-4"},[T,i(e("input",{"onUpdate:modelValue":c=>o.name=c,type:"text",class:"w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none",placeholder:"Alt kategori adını girin"},null,8,Y),[[d,o.name]]),j,i(e("input",{"onUpdate:modelValue":c=>o.price=c,type:"number",class:"w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none",placeholder:"Alt kategori fiyatını girin"},null,8,q),[[d,o.price]]),e("button",{onClick:b(c=>h(m),["prevent"]),class:"mt-3 text-red-500 hover:text-red-600"}," Alt Kategoriyi Kaldır ",8,I)]))),128))]),e("button",{onClick:b(_,["prevent"]),class:"mt-6 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"}," Yeni Alt Kategori Ekle ")]),e("div",L,[N,e("button",{onClick:b(v,["prevent"]),class:"flex-1 rounded bg-red-500 p-3 font-semibold text-white shadow-md hover:bg-red-600"}," Hizmeti Sil ")])],32)]))}};export{J as default};
