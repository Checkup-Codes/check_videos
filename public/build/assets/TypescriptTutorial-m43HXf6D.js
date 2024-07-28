import{l as s,g as n,b as e,j as y,q as b,h as _,F as k,m as S,s as I,x as h,o,t as g}from"./app-DOzu56K9.js";/* empty css            */const D=e("h1",{class:"p-5 text-2xl"},"Aktif Kategori: Typescript Tutorial",-1),V={class:"grid grid-cols-2 p-5 leading-loose"},j=I('<div><h3 class="text-xl">Adımlar</h3><div class="my-3 w-11/12 rounded bg-gray-50 p-3"><div class="rounded p-2"><h4 class="py-1">Adım 1</h4><div class="w-full bg-white p-2">Video İsmi</div><h4 class="py-1">Uzun Açıklama</h4><div class="w-full bg-white p-2"> Array nedir ve ts&#39;de yeri nedir bu video bunlardan bahsettik. <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> Merhaba! Kanalıma hoş geldiniz! Bu eğitim serisinde amacımız, sıfırdan TypeScript öğrenmek ve birlikte gerçek dünya projeleri geliştirmek. Ben bir profesyonel eğitimci olmayabilirim, ancak öğreterek öğrenme metoduyla kendimi geliştiriyorum ve bu süreçte sizlere de yardımcı olabilmek beni mutlu ediyor. Bu eğitim serisinde, TypeScript&#39;in temellerinden başlayarak adım adım ilerleyeceğiz. TypeScript&#39;i neden kullanmanız gerektiğini anlatacak, nasıl kurulacağını ve temel özelliklerini öğreneceğiz. Ardından, gerçek dünya projeleri üzerinde birlikte çalışarak, Mobil, Masaüstü, Web ve Mobil Uygulamalar geliştireceğiz. Eğer web geliştirmeye yeni başlıyorsanız veya TypeScript&#39;i daha iyi anlamak istiyorsanız, bu eğitim serisi tam size göre! Sadece öğreterek öğrenme metoduyla ilerleyeceğiz, böylece birlikte projeler geliştirirken hem siz öğrenecek hem de ben kendimi geliştireceğim. Bu seriyi izledikten sonra, TypeScript&#39;i kullanarak gerçek dünya projelerine başlayabilecek, farklı platformlarda uygulamalar geliştirebilecek ve kendinizi geliştirme yolculuğunuzda önemli bir adım atmış olacaksınız. Videoları beğenmeyi ve kanalıma abone olmayı unutmayın, böylece yeni videolarımdan haberdar olabilirsiniz. Sizlere yardımcı olabilmek ve birlikte öğrenmek için sabırsızlanıyorum! Haydi, hemen başlayalım ve birlikte TypeScript&#39;in büyülü dünyasına adım atalım! <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> Laravel Oynatma Listemiz : • Laravel Bootcamp Ekranda yazdığım kodların kaynak dosyası : https://github.com/checkupcodes/Workb... <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> ⭐️ Timestamps ⭐️ 00:00 | İntro 00:03 | Neden kullanırız 01:10 | Konuya Giriş 05:40 | Örnek verelim 09:30 | Son <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> 💙💙💙Check-up Codes <br> 📸 Instagram: / checkup_codes <br> ⭐ Discord: / discord <br> 📝LinkedIn: / cekap 🌎 Website: http://checkupcodes.com/ <br> 📂 GitHub: https://github.com/checkupcodes <br><br> 💙💙💙 Cekap <br> 📸 Instagram : / cekapykp <br> 📱 Twitter: / cekapykp <br> 📂 GitHub: https://github.com/cekapykp <br><br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> ⭐️ Tags ⭐️ <br> -TypeScript -TypeScript nedir -TypeScript avantajları -TypeScript kurulumu -TypeScript öğreniyoruz -TypeScript tutorial -TypeScript bootcamp -TypeScript framework <br><br> ⭐️ Hashtags⭐️ <br> #typescript #typescripttutorial #typescriptbootcamp </div></div></div></div>',1),A=e("h2",{class:"text-xl"},"Keywords",-1),E={class:"mt-3 w-full rounded bg-gray-100 p-2"},K={class:"container mx-auto p-4"},L=e("h1",{class:"mb-4 text-xl"},"YouTube Playlist Videos",-1),B={key:0,class:"text-blue-500"},C={class:"video-list"},P=["src"],H=["href"],v="https://www.googleapis.com/youtube/v3",U={__name:"TypescriptTutorial",setup(M){const u="AIzaSyCoIcX9-KNL9aOYwsvdDpflXxHImczwFlQ",l=s("PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l"),d=s([]),c=s(!1),z=async()=>{if(!l.value){alert("Please enter a playlist ID");return}c.value=!0,d.value=[];try{let r="";const i=[];do{const t=await h.get(`${v}/playlistItems`,{params:{part:"snippet",playlistId:l.value,maxResults:50,pageToken:r,key:u}});t.data.items.forEach(p=>{i.push(p.snippet.resourceId.videoId)}),r=t.data.nextPageToken}while(r);const a=await h.get(`${v}/videos`,{params:{part:"snippet,contentDetails",id:i.join(","),key:u}});d.value=a.data.items.map(t=>({id:t.id,title:t.snippet.title,thumbnail:t.snippet.thumbnails.default.url,duration:w(t.contentDetails.duration),timestamps:f(t.snippet.description)}))}catch(r){console.error("Error fetching videos:",r),alert("Error fetching videos")}finally{c.value=!1}},w=r=>{const i=/PT(\d+H)?(\d+M)?(\d+S)?/,a=r.match(i),t=a[1]?a[1].slice(0,-1):"00",p=a[2]?a[2].slice(0,-1):"00",T=a[3]?a[3].slice(0,-1):"00";return`${t}:${p}:${T}`},f=r=>{const i=/(\d{1,2}:\d{2})/g;return r.match(i)||[]},m=s("yazılım öğrenme yolları, yazılım öğrenme siteleri, yazılım öğrenme platformları, yazılım öğrenme kitapları, yazılım öğrenme videoları, yazılım öğrenme uygulamaları, yazılım öğrenme yolları, yazılım öğrenme siteleri, yazılım öğrenme platformları, yazılım"),x=()=>{navigator.clipboard.writeText(m.value),alert("Keywordler kopyalandı!")};return(r,i)=>(o(),n(k,null,[D,e("div",V,[j,e("div",null,[A,e("div",null,[e("div",E,[y(e("textarea",{"onUpdate:modelValue":i[0]||(i[0]=a=>m.value=a),class:"h-40 w-full rounded border bg-gray-50 p-2",placeholder:"Keywordleri virgülle ayrılmış şekilde girin",rows:"4"},null,512),[[b,m.value]]),e("div",{class:"flex justify-end"},[e("button",{onClick:x,class:"mt-3 w-1/3 rounded bg-gray-500 p-1 px-4 text-white"},"Kopyala")])])]),e("div",K,[L,y(e("input",{"onUpdate:modelValue":i[1]||(i[1]=a=>l.value=a),class:"mb-4 w-full border p-2",placeholder:"Enter YouTube Playlist ID"},null,512),[[b,l.value]]),e("div",{class:"flex justify-end"},[e("button",{onClick:z,class:"mt-3 w-1/3 rounded bg-gray-500 p-1 px-4 text-white"},"Fetch Videos")]),c.value?(o(),n("div",B,"Loading...")):_("",!0),e("ul",C,[(o(!0),n(k,null,S(d.value,a=>(o(),n("li",{key:a.id,class:"mb-2 flex items-center"},[e("img",{src:a.thumbnail,alt:"Video Thumbnail",class:"mr-4 h-16 w-28"},null,8,P),e("div",null,[e("a",{href:`https://www.youtube.com/watch?v=${a.id}`,target:"_blank",class:"text-blue-500"},g(a.title),9,H),e("p",null,"Duration: "+g(a.duration),1)])]))),128))])])])])],64))}};export{U as default};
