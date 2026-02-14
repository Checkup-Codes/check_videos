import{g,b as k,c as a,a as t,j as p,k as f,t as d,C as h,i as w,m as _,n as x,F as z,l as C,N,o as l}from"./ssr-B7YpsODM.js";const j={class:"space-y-6"},B={class:"rounded-xl border border-primary/20 bg-primary/5 p-4"},S={class:"flex items-start gap-3"},F={class:"flex-1"},A={key:0,class:"rounded-xl border border-border bg-card p-6"},O={class:"space-y-4"},T={class:"flex flex-wrap gap-2"},$={class:"space-y-2"},E={key:0,class:"text-xs text-destructive"},P={key:1,class:"text-xs text-green-600 dark:text-green-400"},D={key:1,class:"space-y-3"},J={class:"grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"},V=["onClick"],M={class:"text-xs opacity-70"},I={class:"flex items-center justify-end gap-3"},K=["disabled"],U={__name:"BulkImportTab",props:{languagePacks:{type:Array,default:()=>[]}},emits:["cancel"],setup(v){const s=g(""),n=g(""),i=g(!1),c=g(!1),m=g([]),u=k(()=>{if(!s.value.trim())return n.value="",[];try{const r=JSON.parse(s.value);if(!Array.isArray(r))return n.value="JSON bir dizi (array) olmalıdır",[];for(let e=0;e<r.length;e++){const o=r[e];if(!o.word||!o.language)return n.value=`${e+1}. kelimede 'word' ve 'language' alanları zorunludur`,[]}return n.value="",r}catch(r){return n.value="Geçersiz JSON formatı: "+r.message,[]}}),q=r=>{const e=m.value.indexOf(r);e>-1?m.value.splice(e,1):m.value.push(r)},b=r=>{r==="simple"?s.value=`[
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
]`:s.value=`[
  {
    "word": "run",
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
]`},y=()=>{u.value.length!==0&&(i.value=!0,N.post(route("rendition.words.bulk-store"),{words:u.value,language_pack_ids:m.value},{onSuccess:()=>{i.value=!1},onError:()=>{i.value=!1}}))};return(r,e)=>(l(),a("div",j,[t("div",B,[t("div",S,[e[8]||(e[8]=t("svg",{class:"mt-0.5 h-5 w-5 flex-shrink-0 text-primary",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),t("div",F,[e[6]||(e[6]=t("h3",{class:"font-medium text-foreground"},"Toplu Kelime Ekleme",-1)),e[7]||(e[7]=t("p",{class:"mt-1 text-sm text-muted-foreground"}," JSON formatında birden fazla kelime ekleyebilirsiniz. Format örneği için bilgi butonuna tıklayın. ",-1)),t("button",{onClick:e[0]||(e[0]=o=>c.value=!c.value),class:"mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"},[e[5]||(e[5]=t("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),f(" "+d(c.value?"Formatı Gizle":"Format Bilgisi"),1)])])])]),c.value?(l(),a("div",A,[e[10]||(e[10]=t("h3",{class:"mb-4 text-lg font-semibold text-foreground"},"JSON Format Örneği",-1)),t("div",O,[e[9]||(e[9]=h(`<div><h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Sadece Kelime + Anlam)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
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
    &quot;language&quot;: &quot;en&quot;,
    &quot;type&quot;: &quot;verb&quot;,
    &quot;difficulty_level&quot;: 2,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;koşmak&quot;, &quot;is_primary&quot;: true },
      { &quot;meaning&quot;: &quot;çalıştırmak&quot;, &quot;is_primary&quot;: false }
    ],
    &quot;example_sentences&quot;: [&quot;I run every morning&quot;],
    &quot;example_translations&quot;: [&quot;Her sabah koşarım&quot;],
    &quot;synonyms&quot;: [&quot;jog&quot;, &quot;sprint&quot;]
  }
]</code></pre></div><div class="rounded-lg border border-border bg-muted/30 p-4"><h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4><dl class="space-y-2 text-xs"><div><dt class="font-medium text-foreground">word <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Kelime (zorunlu)</dd></div><div><dt class="font-medium text-foreground">language <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Dil kodu: en, tr, de, fr, es (zorunlu)</dd></div><div><dt class="font-medium text-foreground">type</dt><dd class="text-muted-foreground">Tür: noun, verb, adjective, adverb, vb. (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">difficulty_level</dt><dd class="text-muted-foreground">Zorluk: 1-4 arası (varsayılan: 2)</dd></div><div><dt class="font-medium text-foreground">meanings</dt><dd class="text-muted-foreground">Anlamlar dizisi (opsiyonel ama önerilen)</dd></div></dl></div>`,3)),t("div",T,[t("button",{onClick:e[1]||(e[1]=o=>b("simple")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Basit Şablon Yükle "),t("button",{onClick:e[2]||(e[2]=o=>b("detailed")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Detaylı Şablon Yükle ")])])])):p("",!0),t("div",$,[e[11]||(e[11]=t("label",{class:"text-sm font-medium text-foreground"},[f(" JSON Verisi "),t("span",{class:"text-destructive"},"*")],-1)),w(t("textarea",{"onUpdate:modelValue":e[3]||(e[3]=o=>s.value=o),rows:"15",placeholder:'[{"word": "hello", "language": "en", "meanings": [{"meaning": "merhaba"}]}]',class:x(["w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary",{"border-destructive":n.value}])},null,2),[[_,s.value]]),n.value?(l(),a("p",E,d(n.value),1)):u.value.length>0?(l(),a("p",P," ✓ "+d(u.value.length)+" kelime tespit edildi ",1)):p("",!0)]),v.languagePacks.length>0?(l(),a("div",D,[e[12]||(e[12]=t("label",{class:"text-sm font-medium text-foreground"},"Dil Paketlerine Ekle (Opsiyonel)",-1)),t("div",J,[(l(!0),a(z,null,C(v.languagePacks,o=>(l(),a("button",{key:o.id,type:"button",onClick:G=>q(o.id),class:x(["flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors",m.value.includes(o.id)?"border-primary bg-primary/10 text-primary":"border-border hover:border-primary/50"])},[t("span",null,d(o.name),1),t("span",M,d(o.language.toUpperCase()),1)],10,V))),128))])])):p("",!0),t("div",I,[t("button",{type:"button",onClick:e[4]||(e[4]=o=>r.$emit("cancel")),class:"rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"}," İptal "),t("button",{onClick:y,disabled:i.value||!s.value.trim()||n.value||u.value.length===0,class:"rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"},d(i.value?"Ekleniyor...":`${u.value.length} Kelime Ekle`),9,K)])]))}};export{U as default};
