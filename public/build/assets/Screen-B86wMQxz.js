import{T as _,g as r,b as t,n as o,j as n,q as d,u as e,h as u,f as b,o as a}from"./app-lwMQyQHq.js";/* empty css            */const y={class:"container mx-auto bg-screen-bg p-6"},x=t("h1",{class:"mb-4 text-2xl font-bold"},"Yeni Ders oluştur",-1),g={class:"mb-4"},f={key:0,class:"text-sm text-red-500"},h={class:"mb-4"},k={key:0,class:"text-sm text-red-500"},v={class:"mb-4"},S={key:0,class:"text-sm text-red-500"},V=t("div",{class:"mb-4"},[t("button",{type:"submit",class:"rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"},"Dersi oluştur")],-1),m="block font-bold mb-1 text-sm rounded",c="mt-1 block w-full rounded",M={__name:"Screen",setup(w){const s=_({title:"",slug:"",playlist_id:""}),p=()=>{s.post(route("lessons.store"))};return(z,l)=>(a(),r("div",y,[x,t("form",{onSubmit:b(p,["prevent"])},[t("div",g,[t("label",{for:"title",class:o(m)},"İsim:"),n(t("input",{"onUpdate:modelValue":l[0]||(l[0]=i=>e(s).title=i),type:"text",id:"title",class:o(c)},null,512),[[d,e(s).title]]),e(s).errors.title?(a(),r("p",f,"İsmi unuttun !")):u("",!0)]),t("div",h,[t("label",{for:"slug",class:o(m)},"Slug:"),n(t("input",{"onUpdate:modelValue":l[1]||(l[1]=i=>e(s).slug=i),type:"text",id:"slug",class:o(c)},null,512),[[d,e(s).slug]]),e(s).errors.slug?(a(),r("p",k,"Slug deriz biz Türkçesi meçhul.")):u("",!0)]),t("div",v,[t("label",{for:"playlist_id",class:o(m)},"Play List ID:"),n(t("input",{"onUpdate:modelValue":l[2]||(l[2]=i=>e(s).playlist_id=i),type:"text",id:"playlist_id",class:o(c)},null,512),[[d,e(s).playlist_id]]),e(s).errors.playlist_id?(a(),r("p",S," Millet doğru girerken hata yapmamalı sen yazmıyon! ")):u("",!0)]),V],32)]))}};export{M as default};
