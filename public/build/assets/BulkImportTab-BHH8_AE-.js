import{g as d,b as g,c,a as e,i as v,t as q,C as b,l as f,j as k,m as y,n as h,N as S,o as p}from"./ssr-BY_kgNkH.js";const z={class:"space-y-6"},T={class:"rounded-xl border border-primary/20 bg-primary/5 p-4"},w={class:"flex items-start gap-3"},B={class:"flex-1"},C={key:0,class:"rounded-xl border border-border bg-card p-6"},J={class:"space-y-4"},A={class:"flex flex-wrap gap-2"},F={class:"space-y-2"},N={key:0,class:"text-xs text-destructive"},$={key:1,class:"text-xs text-green-600 dark:text-green-400"},M={class:"flex items-center justify-end gap-3"},j=["disabled"],H={__name:"BulkImportTab",emits:["cancel"],setup(D){const n=d(""),u=d(""),l=d(!1),a=d(!1),s=g(()=>{if(!n.value.trim())return u.value="",null;try{const o=JSON.parse(n.value);if(!o.title)return u.value="'title' alanı zorunludur",null;if(!o.slug)return u.value="'slug' alanı zorunludur",null;if(!o.questions||!Array.isArray(o.questions))return u.value="'questions' alanı zorunludur ve bir dizi olmalıdır",null;if(o.questions.length===0)return u.value="En az 1 soru eklenmelidir",null;for(let t=0;t<o.questions.length;t++){const r=o.questions[t];if(!r.question_text)return u.value=`${t+1}. soruda 'question_text' alanı zorunludur`,null;if(!r.question_type)return u.value=`${t+1}. soruda 'question_type' alanı zorunludur`,null;if(!["single_choice","multiple_choice","true_false"].includes(r.question_type))return u.value=`${t+1}. soruda geçersiz 'question_type': ${r.question_type}`,null;if(r.question_type==="single_choice"||r.question_type==="multiple_choice"){if(!r.options||!Array.isArray(r.options)||r.options.length<2)return u.value=`${t+1}. soru (çoktan seçmeli) en az 2 seçenek içermelidir`,null;if(!r.options.some(_=>_.is_correct))return u.value=`${t+1}. soruda en az 1 doğru seçenek olmalıdır`,null}if(r.question_type==="true_false"&&(r.correct_answer===void 0||r.correct_answer===null))return u.value=`${t+1}. soru (doğru/yanlış) 'correct_answer' alanı içermelidir`,null}return u.value="",o}catch(o){return u.value="Geçersiz JSON formatı: "+o.message,null}}),m=o=>{o==="simple"?n.value=`{
  "title": "JavaScript Temelleri Testi",
  "slug": "javascript-temelleri-testi",
  "description": "JavaScript temel konularını test edin",
  "status": "published",
  "questions": [
    {
      "question_text": "JavaScript hangi tür bir dildir?",
      "question_type": "single_choice",
      "points": 10,
      "options": [
        { "option_text": "Derlenmiş dil", "is_correct": false },
        { "option_text": "Yorumlanmış dil", "is_correct": true },
        { "option_text": "Makine dili", "is_correct": false },
        { "option_text": "Assembly dili", "is_correct": false }
      ]
    },
    {
      "question_text": "let ve const arasındaki fark nedir?",
      "question_type": "single_choice",
      "points": 10,
      "options": [
        { "option_text": "let yeniden atanabilir, const atanamaz", "is_correct": true },
        { "option_text": "Fark yoktur", "is_correct": false },
        { "option_text": "const daha hızlıdır", "is_correct": false }
      ]
    }
  ]
}`:n.value=`{
  "title": "Web Geliştirme Quiz",
  "slug": "web-gelistirme-quiz",
  "description": "HTML, CSS ve JavaScript bilginizi test edin",
  "status": "published",
  "category_id": null,
  "questions": [
    {
      "question_text": "HTML'de başlık etiketi hangisidir?",
      "question_type": "single_choice",
      "points": 10,
      "order": 1,
      "explanation": "h1-h6 etiketleri başlık için kullanılır",
      "options": [
        { "option_text": "<title>", "is_correct": false },
        { "option_text": "<h1>", "is_correct": true },
        { "option_text": "<header>", "is_correct": false },
        { "option_text": "<head>", "is_correct": false }
      ]
    },
    {
      "question_text": "CSS'de renk tanımlamak için kullanılabilecek formatlar nelerdir?",
      "question_type": "multiple_choice",
      "points": 15,
      "order": 2,
      "explanation": "Birden fazla doğru cevap var",
      "options": [
        { "option_text": "HEX (#FF0000)", "is_correct": true },
        { "option_text": "RGB (rgb(255,0,0))", "is_correct": true },
        { "option_text": "HSL (hsl(0,100%,50%))", "is_correct": true },
        { "option_text": "BIN (bin(11111111))", "is_correct": false }
      ]
    },
    {
      "question_text": "JavaScript'te değişken tanımlamak için var, let ve const kullanılır",
      "question_type": "true_false",
      "points": 5,
      "order": 3,
      "correct_answer": true,
      "explanation": "var, let ve const kullanılır"
    }
  ]
}`},x=()=>{s.value&&(l.value=!0,console.log("Submitting test:",s.value),S.post(route("tests.bulk-store"),s.value,{onSuccess:o=>{l.value=!1,console.log("Success:",o)},onError:o=>{if(l.value=!1,console.error("Error:",o),o&&typeof o=="object"){const t=Object.values(o)[0];u.value=Array.isArray(t)?t[0]:t}else u.value="Test oluşturulurken bir hata oluştu"}}))};return(o,t)=>{var r;return p(),c("div",z,[e("div",T,[e("div",w,[t[8]||(t[8]=e("svg",{class:"mt-0.5 h-5 w-5 flex-shrink-0 text-primary",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),e("div",B,[t[6]||(t[6]=e("h3",{class:"font-medium text-foreground"},"Toplu Test Ekleme",-1)),t[7]||(t[7]=e("p",{class:"mt-1 text-sm text-muted-foreground"}," JSON formatında test ve sorularını ekleyebilirsiniz. Format örneği için bilgi butonuna tıklayın. ",-1)),e("button",{onClick:t[0]||(t[0]=i=>a.value=!a.value),class:"mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"},[t[5]||(t[5]=e("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),v(" "+q(a.value?"Formatı Gizle":"Format Bilgisi"),1)])])])]),a.value?(p(),c("div",C,[t[10]||(t[10]=e("h3",{class:"mb-4 text-lg font-semibold text-foreground"},"JSON Format Örneği",-1)),e("div",J,[t[9]||(t[9]=b(`<div><h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Tek Doğru Cevap)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
  &quot;title&quot;: &quot;JavaScript Temelleri Testi&quot;,
  &quot;slug&quot;: &quot;javascript-temelleri-testi&quot;,
  &quot;description&quot;: &quot;JavaScript temel konularını test edin&quot;,
  &quot;status&quot;: &quot;published&quot;,
  &quot;questions&quot;: [
    {
      &quot;question_text&quot;: &quot;JavaScript hangi tür bir dildir?&quot;,
      &quot;question_type&quot;: &quot;single_choice&quot;,
      &quot;points&quot;: 10,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;Derlenmiş dil&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;Yorumlanmış dil&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;Makine dili&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;Assembly dili&quot;, &quot;is_correct&quot;: false }
      ]
    },
    {
      &quot;question_text&quot;: &quot;let ve const arasındaki fark nedir?&quot;,
      &quot;question_type&quot;: &quot;single_choice&quot;,
      &quot;points&quot;: 10,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;let yeniden atanabilir, const atanamaz&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;Fark yoktur&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;const daha hızlıdır&quot;, &quot;is_correct&quot;: false }
      ]
    }
  ]
}</code></pre></div><div><h4 class="mb-2 text-sm font-medium text-foreground">Detaylı Format (Karışık Soru Tipleri)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
  &quot;title&quot;: &quot;Web Geliştirme Quiz&quot;,
  &quot;slug&quot;: &quot;web-gelistirme-quiz&quot;,
  &quot;description&quot;: &quot;HTML, CSS ve JavaScript bilginizi test edin&quot;,
  &quot;status&quot;: &quot;published&quot;,
  &quot;category_id&quot;: null,
  &quot;questions&quot;: [
    {
      &quot;question_text&quot;: &quot;HTML&#39;de başlık etiketi hangisidir?&quot;,
      &quot;question_type&quot;: &quot;single_choice&quot;,
      &quot;points&quot;: 10,
      &quot;order&quot;: 1,
      &quot;explanation&quot;: &quot;h1-h6 etiketleri başlık için kullanılır&quot;,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;&lt;title&gt;&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;&lt;h1&gt;&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;&lt;header&gt;&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;&lt;head&gt;&quot;, &quot;is_correct&quot;: false }
      ]
    },
    {
      &quot;question_text&quot;: &quot;CSS&#39;de renk tanımlamak için kullanılabilecek formatlar nelerdir?&quot;,
      &quot;question_type&quot;: &quot;multiple_choice&quot;,
      &quot;points&quot;: 15,
      &quot;order&quot;: 2,
      &quot;explanation&quot;: &quot;Birden fazla doğru cevap var&quot;,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;HEX (#FF0000)&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;RGB (rgb(255,0,0))&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;HSL (hsl(0,100%,50%))&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;BIN (bin(11111111))&quot;, &quot;is_correct&quot;: false }
      ]
    },
    {
      &quot;question_text&quot;: &quot;JavaScript&#39;te değişken tanımlamak için var, let ve const kullanılır&quot;,
      &quot;question_type&quot;: &quot;true_false&quot;,
      &quot;points&quot;: 5,
      &quot;order&quot;: 3,
      &quot;correct_answer&quot;: true,
      &quot;explanation&quot;: &quot;var, let ve const kullanılır&quot;
    }
  ]
}</code></pre></div><div class="rounded-lg border border-border bg-muted/30 p-4"><h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4><dl class="space-y-2 text-xs"><div class="border-b border-border pb-2"><dt class="font-semibold text-foreground">Test Alanları:</dt></div><div><dt class="font-medium text-foreground">title <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Test başlığı (zorunlu)</dd></div><div><dt class="font-medium text-foreground">slug <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">URL dostu slug (zorunlu)</dd></div><div><dt class="font-medium text-foreground">description</dt><dd class="text-muted-foreground">Test açıklaması (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">status</dt><dd class="text-muted-foreground">Durum: draft, published, private (varsayılan: draft)</dd></div><div><dt class="font-medium text-foreground">category_id</dt><dd class="text-muted-foreground">Kategori ID&#39;si (opsiyonel)</dd></div><div class="border-b border-border pb-2 pt-3"><dt class="font-semibold text-foreground">Soru Alanları:</dt></div><div><dt class="font-medium text-foreground">question_text <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Soru metni (zorunlu)</dd></div><div><dt class="font-medium text-foreground">question_type <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Soru tipi: single_choice (tek doğru), multiple_choice (çoklu doğru), true_false (doğru/yanlış) - zorunlu</dd></div><div><dt class="font-medium text-foreground">points</dt><dd class="text-muted-foreground">Puan (varsayılan: 10)</dd></div><div><dt class="font-medium text-foreground">order</dt><dd class="text-muted-foreground">Sıra numarası (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">explanation</dt><dd class="text-muted-foreground">Açıklama (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">options</dt><dd class="text-muted-foreground">Seçenekler dizisi (single_choice ve multiple_choice için zorunlu)</dd></div><div><dt class="font-medium text-foreground">correct_answer</dt><dd class="text-muted-foreground">Doğru cevap (true_false için: true/false - zorunlu)</dd></div></dl></div>`,3)),e("div",A,[e("button",{type:"button",onClick:t[1]||(t[1]=i=>m("simple")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Basit Şablon Yükle "),e("button",{type:"button",onClick:t[2]||(t[2]=i=>m("detailed")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Detaylı Şablon Yükle ")])])])):f("",!0),e("div",F,[t[11]||(t[11]=e("label",{class:"text-sm font-medium text-foreground"},[v(" JSON Verisi "),e("span",{class:"text-destructive"},"*")],-1)),k(e("textarea",{"onUpdate:modelValue":t[3]||(t[3]=i=>n.value=i),rows:"20",placeholder:'{"title": "Test Başlığı", "slug": "test-basligi", "questions": [...]}',class:h(["w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary",{"border-destructive":u.value}])},null,2),[[y,n.value]]),u.value?(p(),c("p",N,q(u.value),1)):s.value?(p(),c("p",$," ✓ Test geçerli: "+q(((r=s.value.questions)==null?void 0:r.length)||0)+" soru tespit edildi ",1)):f("",!0)]),e("div",M,[e("button",{type:"button",onClick:t[4]||(t[4]=i=>o.$emit("cancel")),class:"rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"}," İptal "),e("button",{type:"button",onClick:x,disabled:l.value||!n.value.trim()||u.value||!s.value,class:"rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"},q(l.value?"Ekleniyor...":"Test Oluştur"),9,j)])])}}};export{H as default};
