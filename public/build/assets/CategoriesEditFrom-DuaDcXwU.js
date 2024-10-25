import{Q as p,T as b,J as f,g as i,b as t,f as h,j as n,q as d,u as s,h as y,o as u}from"./app-lwMQyQHq.js";/* empty css            */const _={class:"mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg bg-white p-2 shadow-md lg:mt-0"},x={class:"container mx-auto p-4"},v=t("h1",{class:"mb-4 text-2xl font-bold"},"Kategoriyi Düzenle",-1),k={class:"mb-4"},w=t("label",{for:"title",class:"mb-1 block text-sm font-bold"},"İsim:",-1),B={class:"mb-4"},V=t("label",{for:"slug",class:"mb-1 block text-sm font-bold"},"Slug:",-1),q=t("div",{class:"mb-4"},[t("button",{type:"submit",class:"rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"}," Kategoriyi güncelle ")],-1),C={key:0,class:"flex"},E={__name:"CategoriesEditFrom",setup(K){const{props:l}=p(),c=l.auth,e=b({name:"",slug:""});f(()=>l.category,a=>{e.name=a.name,e.slug=a.slug},{immediate:!0});const m=()=>{e.put(route("categories.update",{category:l.category.id})).then(()=>{}).catch(a=>{})},g=a=>{confirm("Bu kategoriyi çöpe mi atıyoruz ?")&&e.delete(route("categories.destroy",{category:l.category.id})).then(()=>{}).catch(o=>{})};return(a,o)=>(u(),i("div",_,[t("div",x,[v,t("form",{onSubmit:h(m,["prevent"])},[t("div",k,[w,n(t("input",{"onUpdate:modelValue":o[0]||(o[0]=r=>s(e).name=r),type:"text",id:"title",class:"mt-1 block w-full rounded",required:""},null,512),[[d,s(e).name]])]),t("div",B,[V,n(t("input",{"onUpdate:modelValue":o[1]||(o[1]=r=>s(e).slug=r),type:"text",id:"slug",class:"mt-1 block w-full rounded",required:""},null,512),[[d,s(e).slug]])]),q],32),s(c).user?(u(),i("div",C,[t("button",{onClick:o[2]||(o[2]=r=>g(s(l).category.id)),class:"m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"}," Kategoriyi sil ")])):y("",!0)])]))}};export{E as default};
