import{Q as i,l as s,y as d,g as c,b as e,u as n,a as u,w as _,h,t as m,o as r,k as f}from"./app-DtjZ5I55.js";/* empty css            */const g={class:"mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg bg-screen-bg p-2 shadow-md lg:mt-0"},x={class:"min-h-screen"},p={class:"min-h-screen"},v={key:0},b=e("div",{class:"mx-2 rounded p-1 text-center font-bold text-black underline"},"Kategori İsmini Düzenle",-1),w={class:"flex h-screen items-center justify-center bg-screen-bg text-black"},k={class:"text-center"},y={class:"mb-4 text-4xl font-bold"},K={__name:"Screen",setup(B){const{props:t,url:N}=i();s(t.writes),s(t.categories);const o=s(t.category),a=s(t.flash.success),l=t.auth;return d(()=>{a.value&&setTimeout(()=>{a.value=null},3e3)}),(S,V)=>(r(),c("div",g,[e("div",x,[e("div",p,[n(l).user?(r(),c("div",v,[u(n(f),{href:`/categories/${o.value.slug}/edit`},{default:_(()=>[b]),_:1},8,["href"])])):h("",!0),e("header",w,[e("div",k,[e("h2",y,"Kategoriler : "+m(o.value.name),1)])])])])]))}};export{K as default};
