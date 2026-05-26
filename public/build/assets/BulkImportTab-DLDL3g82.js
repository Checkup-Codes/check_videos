import{Q as P,g as q,b as C,z as O,c as l,a as o,i as j,t as c,C as V,l as k,n as _,F as z,k as $,j as D,m as J,N as K,o as i}from"./ssr-CuSer4dB.js";const I={class:"space-y-6"},L={class:"rounded-xl border border-primary/20 bg-primary/5 p-4"},G={class:"flex items-start gap-3"},H={class:"flex-1"},W={key:0,class:"rounded-xl border border-border bg-card p-6"},Z={class:"space-y-4"},U={class:"flex flex-wrap gap-2"},Y={class:"mt-1 text-sm text-muted-foreground"},Q={key:0,class:"mt-3 max-h-40 space-y-1 overflow-y-auto text-sm"},X={key:2,class:"rounded-xl border border-destructive/30 bg-destructive/5 p-4"},R={class:"flex items-start gap-3"},ee={class:"min-w-0 flex-1"},te={class:"mt-1 text-sm text-muted-foreground"},re={class:"mt-3 max-h-48 space-y-1 overflow-y-auto text-sm text-destructive"},oe={class:"space-y-2"},ne={key:0,class:"text-xs text-destructive"},se={key:1,class:"text-xs text-green-600 dark:text-green-400"},ae={key:3,class:"space-y-3"},le={key:0,class:"rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200"},ie={class:"grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"},ue=["onClick"],de={class:"text-xs opacity-70"},me={class:"flex items-center justify-end gap-3"},ge=["disabled"],pe={__name:"BulkImportTab",props:{languagePacks:{type:Array,default:()=>[]}},emits:["cancel"],setup(E){const p=P(),v=q(""),u=q(""),g=q([]),b=q(!1),w=q(!1),f=q([]),S=r=>{if(!r||typeof r!="object")return[];const e=[];return Object.entries(r).forEach(([t,s])=>{(Array.isArray(s)?s:[s]).forEach(n=>{if(!n)return;const d=t.match(/^words\.(\d+)\.(.+)$/);if(d){const x=Number(d[1])+1,m=d[2];e.push(`${x}. kelime (${m}): ${n}`);return}if(t==="words"){e.push(String(n));return}e.push(`${t}: ${n}`)})}),e},T=()=>{var s,a,n,d,x;const r=S(p.props.errors),e=(s=p.props.flash)==null?void 0:s.error,t=(a=p.props.flash)==null?void 0:a.bulkResults;if(r.length>0){g.value=r;return}if((n=t==null?void 0:t.errors)!=null&&n.length){g.value=t.errors.map(m=>`${m.index+1}. kelime (${m.word}): ${m.error}`);return}if(e&&!((d=t==null?void 0:t.duplicates)!=null&&d.length||(x=t==null?void 0:t.linked)!=null&&x.length)){g.value=[e];return}g.value=[]},y=C(()=>{var s,a,n,d,x;const r=(s=p.props.flash)==null?void 0:s.bulkResults,e=(a=p.props.flash)==null?void 0:a.error,t=(n=p.props.flash)==null?void 0:n.success;if(e&&((d=r==null?void 0:r.duplicates)!=null&&d.length)&&!((x=r==null?void 0:r.linked)!=null&&x.length))return{isError:!0,title:"Kelime pakete eklenemedi",message:e,details:["Bu kelimeler sözlükte zaten kayıtlı.","Pakete eklemek için yukarıdan en az bir dil paketi seçip tekrar gönderin."]};if(e&&r)return{isError:!0,title:"Toplu ekleme tamamlanamadı",message:e,details:(r.errors||[]).map(m=>`${m.index+1}. kelime (${m.word}): ${m.error}`)};if(t&&r){const m=(r.duplicates||[]).slice(0,5).map(A=>`${A.index+1}. ${A.word}`);return{isError:!1,title:"Toplu ekleme özeti",message:t,details:m.length?[`Zaten kayıtlı örnekler: ${m.join(", ")}${r.duplicates.length>5?"…":""}`]:[]}}return null}),B=r=>r.map(e=>{var s;const t={...e};return!((s=t.meanings)!=null&&s.length)&&t.meaning&&(t.meanings=[{meaning:t.meaning,is_primary:!0}],delete t.meaning),Array.isArray(t.meanings)&&(t.meanings=t.meanings.map((a,n)=>typeof a=="string"?{meaning:a,is_primary:n===0}:a).filter(a=>a==null?void 0:a.meaning)),t});O(()=>{var r,e;return[p.props.errors,(r=p.props.flash)==null?void 0:r.error,(e=p.props.flash)==null?void 0:e.bulkResults]},()=>T(),{deep:!0,immediate:!0});const h=C(()=>{if(!v.value.trim())return u.value="",[];try{const r=JSON.parse(v.value);if(!Array.isArray(r))return u.value="JSON bir dizi (array) olmalıdır",[];for(let e=0;e<r.length;e++){const t=r[e];if(!t.word||!t.language)return u.value=`${e+1}. kelimede 'word' ve 'language' alanları zorunludur`,[];if(!(Array.isArray(t.meanings)&&t.meanings.some(n=>{var d;return(d=typeof n=="string"?n:n==null?void 0:n.meaning)==null?void 0:d.trim()})||typeof t.meaning=="string"&&t.meaning.trim()))return u.value=`${e+1}. kelimede anlam zorunludur. "meanings" veya "meaning" alanı ekleyin`,[];if(String(t.language).trim().toLowerCase().length!==2)return u.value=`${e+1}. kelimede dil kodu tam 2 harf olmalıdır (örn: en, tr). Gönderilen: "${t.language}"`,[];if(t.difficulty_level!==void 0&&t.difficulty_level!==null&&t.difficulty_level!==""){const n=Number(t.difficulty_level);if(Number.isNaN(n)||n<1||n>4)return u.value=`${e+1}. kelimede difficulty_level 1 ile 4 arasında olmalıdır`,[]}}return u.value="",r}catch(r){return u.value="Geçersiz JSON formatı: "+r.message,[]}}),F=r=>{const e=f.value.indexOf(r);e>-1?f.value.splice(e,1):f.value.push(r)},N=r=>{r==="simple"?v.value=`[
  {
    "word": "hello",
    "language": "en",
    "meanings": [
      { "meaning": "merhaba", "is_primary": true }
    ]
  },
  {
    "word": "goodbye",
    "language": "en",
    "meanings": [
      { "meaning": "hoşça kal", "is_primary": true }
    ]
  },
  {
    "word": "thank you",
    "language": "en",
    "meanings": [
      { "meaning": "teşekkür ederim", "is_primary": true }
    ]
  }
]`:v.value=`[
  {
    "word": "run",
    "definition": "to move at a speed faster than a walk",
    "language": "en",
    "type": "verb",
    "difficulty_level": 2,
    "meanings": [
      { "meaning": "koşmak", "is_primary": true },
      { "meaning": "çalıştırmak", "is_primary": false }
    ],
    "example_sentences": ["I run every morning", "The program runs smoothly"],
    "example_translations": ["Her sabah koşarım", "Program sorunsuz çalışıyor"],
    "synonyms": ["jog", "sprint"]
  }
]`},M=()=>{if(h.value.length!==0){if(f.value.length===0){u.value="Lütfen en az bir dil paketi seçin. Mevcut kelimeler pakete ancak bu şekilde eklenir.";return}b.value=!0,g.value=[],u.value="",K.post(route("rendition.words.bulk-store"),{words:B(h.value),language_pack_ids:f.value},{preserveScroll:!0,onSuccess:()=>{b.value=!1},onError:r=>{b.value=!1,g.value=S(r),g.value.length===0&&(g.value=["Toplu kelime eklenirken bir hata oluştu."])},onFinish:()=>{b.value=!1}})}};return(r,e)=>(i(),l("div",I,[o("div",L,[o("div",G,[e[8]||(e[8]=o("svg",{class:"mt-0.5 h-5 w-5 flex-shrink-0 text-primary",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),o("div",H,[e[6]||(e[6]=o("h3",{class:"font-medium text-foreground"},"Toplu Kelime Ekleme",-1)),e[7]||(e[7]=o("p",{class:"mt-1 text-sm text-muted-foreground"}," JSON formatında birden fazla kelime ekleyebilirsiniz. Format örneği için bilgi butonuna tıklayın. ",-1)),o("button",{onClick:e[0]||(e[0]=t=>w.value=!w.value),class:"mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"},[e[5]||(e[5]=o("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),j(" "+c(w.value?"Formatı Gizle":"Format Bilgisi"),1)])])])]),w.value?(i(),l("div",W,[e[10]||(e[10]=o("h3",{class:"mb-4 text-lg font-semibold text-foreground"},"JSON Format Örneği",-1)),o("div",Z,[e[9]||(e[9]=V(`<div><h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Sadece Kelime + Anlam)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
  {
    &quot;word&quot;: &quot;hello&quot;,
    &quot;language&quot;: &quot;en&quot;,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;merhaba&quot;, &quot;is_primary&quot;: true }
    ]
  },
  {
    &quot;word&quot;: &quot;goodbye&quot;,
    &quot;language&quot;: &quot;en&quot;,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;hoşça kal&quot;, &quot;is_primary&quot;: true }
    ]
  }
]</code></pre></div><div><h4 class="mb-2 text-sm font-medium text-foreground">Detaylı Format (Tüm Alanlar)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
  {
    &quot;word&quot;: &quot;run&quot;,
    &quot;definition&quot;: &quot;to move at a speed faster than a walk&quot;,
    &quot;language&quot;: &quot;en&quot;,
    &quot;type&quot;: &quot;verb&quot;,
    &quot;difficulty_level&quot;: 2,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;koşmak&quot;, &quot;is_primary&quot;: true },
      { &quot;meaning&quot;: &quot;çalıştırmak&quot;, &quot;is_primary&quot;: false }
    ],
    &quot;example_sentences&quot;: [&quot;I run every morning&quot;, &quot;The program runs smoothly&quot;],
    &quot;example_translations&quot;: [&quot;Her sabah koşarım&quot;, &quot;Program sorunsuz çalışıyor&quot;],
    &quot;synonyms&quot;: [&quot;jog&quot;, &quot;sprint&quot;]
  }
]</code></pre></div><div class="rounded-lg border border-border bg-muted/30 p-4"><h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4><dl class="space-y-2 text-xs"><div><dt class="font-medium text-foreground">word <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Kelime (zorunlu)</dd></div><div><dt class="font-medium text-foreground">definition</dt><dd class="text-muted-foreground">Kelimenin öğrenilen dildeki tanımı (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">language <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Dil kodu: en, tr, de, fr, es (zorunlu)</dd></div><div><dt class="font-medium text-foreground">type</dt><dd class="text-muted-foreground">Tür: noun, verb, adjective, adverb, vb. (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">difficulty_level</dt><dd class="text-muted-foreground">Zorluk: 1-4 arası (varsayılan: 2)</dd></div><div><dt class="font-medium text-foreground">meanings</dt><dd class="text-muted-foreground">Anlamlar dizisi (opsiyonel ama önerilen)</dd></div></dl></div>`,3)),o("div",U,[o("button",{onClick:e[1]||(e[1]=t=>N("simple")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Basit Şablon Yükle "),o("button",{onClick:e[2]||(e[2]=t=>N("detailed")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Detaylı Şablon Yükle ")])])])):k("",!0),y.value?(i(),l("div",{key:1,class:_(["rounded-xl border p-4",y.value.isError?"border-destructive/30 bg-destructive/5":"border-primary/30 bg-primary/5"])},[o("h3",{class:_(["font-medium",y.value.isError?"text-destructive":"text-foreground"])},c(y.value.title),3),o("p",Y,c(y.value.message),1),y.value.details.length?(i(),l("ul",Q,[(i(!0),l(z,null,$(y.value.details,(t,s)=>(i(),l("li",{key:s,class:"break-words text-destructive"}," • "+c(t),1))),128))])):k("",!0)],2)):k("",!0),g.value.length>0?(i(),l("div",X,[o("div",R,[e[12]||(e[12]=o("svg",{class:"mt-0.5 h-5 w-5 flex-shrink-0 text-destructive",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})],-1)),o("div",ee,[e[11]||(e[11]=o("h3",{class:"font-medium text-destructive"},"Toplu ekleme başarısız",-1)),o("p",te,c(g.value.length)+" doğrulama hatası bulundu. Aşağıdaki satırları düzeltip tekrar deneyin. ",1),o("ul",re,[(i(!0),l(z,null,$(g.value,(t,s)=>(i(),l("li",{key:`${t}-${s}`,class:"break-words"}," • "+c(t),1))),128))])])])])):k("",!0),o("div",oe,[e[13]||(e[13]=o("label",{class:"text-sm font-medium text-foreground"},[j(" JSON Verisi "),o("span",{class:"text-destructive"},"*")],-1)),D(o("textarea",{"onUpdate:modelValue":e[3]||(e[3]=t=>v.value=t),rows:"15",placeholder:'[{"word": "hello", "language": "en", "meanings": [{"meaning": "merhaba"}]}]',class:_(["w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary",{"border-destructive":u.value}])},null,2),[[J,v.value]]),u.value?(i(),l("p",ne,c(u.value),1)):h.value.length>0?(i(),l("p",se," ✓ "+c(h.value.length)+" kelime tespit edildi ",1)):k("",!0)]),E.languagePacks.length>0?(i(),l("div",ae,[e[14]||(e[14]=o("div",null,[o("label",{class:"text-sm font-medium text-foreground"},"Dil Paketine Ekle"),o("p",{class:"mt-1 text-xs text-muted-foreground"}," Zorunlu değil ama önerilir. Sözlükte zaten kayıtlı kelimeler yalnızca seçtiğiniz pakete eklenir. ")],-1)),f.value.length===0?(i(),l("div",le," Henüz paket seçilmedi — mevcut kelimeler pakette görünmeyecek. ")):k("",!0),o("div",ie,[(i(!0),l(z,null,$(E.languagePacks,t=>(i(),l("button",{key:t.id,type:"button",onClick:s=>F(t.id),class:_(["flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors",f.value.includes(t.id)?"border-primary bg-primary/10 text-primary":"border-border hover:border-primary/50"])},[o("span",null,c(t.name),1),o("span",de,c(t.language.toUpperCase()),1)],10,ue))),128))])])):k("",!0),o("div",me,[o("button",{type:"button",onClick:e[4]||(e[4]=t=>r.$emit("cancel")),class:"rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"}," İptal "),o("button",{onClick:M,disabled:b.value||!v.value.trim()||u.value||h.value.length===0,class:"rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"},c(b.value?"Ekleniyor...":`${h.value.length} Kelime Ekle`),9,ge)])]))}};export{pe as default};
