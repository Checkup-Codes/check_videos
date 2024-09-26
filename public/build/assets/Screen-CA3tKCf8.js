import{Q as f,l as u,y as v,g as l,b as e,t as _,h as a,c as y,w as h,u as b,F as p,m as k,o as t,e as g,k as x,a as E,z as w}from"./app-CUtkyMvc.js";const B={key:0,class:"fixed right-4 top-4 z-50"},S={class:"relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700",role:"alert"},z=e("strong",{class:"font-bold"},"Başarılı! ",-1),C={class:"block sm:inline"},N={class:"mx-auto min-h-screen p-8"},V={class:"flex justify-between"},F=e("h1",{class:"mb-4 text-2xl font-bold"},"Ekipmanlarım",-1),T={class:"mx-auto w-11/12 border border-gray-300 bg-white"},D=e("th",{class:"border-b px-6 py-3 text-left"},"İsim",-1),L=e("th",{class:"border-b px-6 py-3 text-left"},"Özellikleri",-1),$=e("th",{class:"border-b px-6 py-3 text-left"},"Link",-1),j={key:0,class:"border-b px-6 py-3 text-left"},q={class:"border-b px-6 py-4"},A={class:"border-b px-6 py-4"},M={class:"border-b px-6 py-4"},Q=["href"],Z={key:0,class:"border-b px-6 py-4"},G=e("span",null,"Düzenle",-1),H=["onClick"],O={__name:"Screen",setup(I){const{props:n}=f(),c=u(n.auth),d=u(n.equipments),s=u(n.flash.success);v(()=>{s.value&&setTimeout(()=>{s.value=null},3e3)});const m=i=>{w.delete(route("equipments.destroy",i),{onSuccess:()=>{s.value="Ekipman başarıyla silindi.",d.value=d.value.filter(r=>r.id!==i),setTimeout(()=>{s.value=null},3e3)},onError:r=>{console.error("Ekipman silme hatası:",r)}})};return(i,r)=>(t(),l(p,null,[s.value?(t(),l("div",B,[e("div",S,[z,e("span",C,_(s.value),1)])])):a("",!0),e("div",N,[e("div",null,[e("div",V,[F,c.value.user?(t(),y(b(x),{key:0,href:"/equipments/create",class:"mx-2 rounded p-1 text-center font-bold text-black underline"},{default:h(()=>[g("Ekipman Ekle")]),_:1})):a("",!0)]),e("table",T,[e("thead",null,[e("tr",null,[D,L,$,c.value.user?(t(),l("th",j,"Actions")):a("",!0)])]),e("tbody",null,[(t(!0),l(p,null,k(d.value,o=>(t(),l("tr",{key:o.id,class:"hover:bg-gray-100"},[e("td",q,_(o.name),1),e("td",A,_(o.specs),1),e("td",M,[e("a",{href:o.link,class:"text-blue-600 hover:underline",target:"_blank"},"Ziyaret Et",8,Q)]),c.value.user?(t(),l("td",Z,[E(b(x),{href:`/equipments/${o.id}/edit`,class:"text-blue-600 hover:underline"},{default:h(()=>[G]),_:2},1032,["href"]),e("button",{onClick:J=>m(o.id),class:"ml-4 text-red-600 hover:underline"},"Sil",8,H)])):a("",!0)]))),128))])])])])],64))}};export{O as default};
