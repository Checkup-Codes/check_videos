import{Q as z,g as m,b as w,c as l,a as e,i as a,j as d,m as x,v as b,F as T,k as B,u as A,t as v,C,l as _,n as F,N as J,o as c}from"./ssr-P_30L11I.js";const N={class:"space-y-6"},$={class:"rounded-xl border border-border bg-card p-6 space-y-4"},D={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},M={class:"space-y-2"},j={class:"space-y-2"},V={class:"space-y-2"},E=["value"],O={class:"space-y-2"},H={class:"space-y-2"},I={class:"rounded-xl border border-primary/20 bg-primary/5 p-4"},L={class:"flex items-start gap-3"},U={class:"flex-1"},G={key:0,class:"rounded-xl border border-border bg-card p-6"},K={class:"space-y-4"},Y={class:"flex flex-wrap gap-2"},Q={class:"space-y-2"},R={key:0,class:"text-xs text-destructive"},X={key:1,class:"text-xs text-green-600 dark:text-green-400"},P={class:"flex items-center justify-end gap-3"},W=["disabled"],ot={__name:"BulkImportTab",emits:["cancel"],setup(Z){const{props:y}=z(),k=y.categories||[],r=m({title:"",slug:"",description:"",status:"draft",category_id:null}),i=m(""),u=m(""),p=m(!1),f=m(!1),q=w(()=>{if(!i.value.trim())return u.value="",null;try{const n=JSON.parse(i.value),t=Array.isArray(n)?n:n.questions||[];if(!Array.isArray(t))return u.value="Sorular bir dizi olmalıdır",null;if(t.length===0)return u.value="En az 1 soru eklenmelidir",null;for(let o=0;o<t.length;o++){const s=t[o];if(!s.question_text)return u.value=`${o+1}. soruda 'question_text' alanı zorunludur`,null;if(!s.question_type)return u.value=`${o+1}. soruda 'question_type' alanı zorunludur`,null;if(!["single_choice","multiple_choice","true_false"].includes(s.question_type))return u.value=`${o+1}. soruda geçersiz 'question_type': ${s.question_type}`,null;if(s.question_type==="single_choice"||s.question_type==="multiple_choice"){if(!s.options||!Array.isArray(s.options)||s.options.length<2)return u.value=`${o+1}. soru (çoktan seçmeli) en az 2 seçenek içermelidir`,null;if(!s.options.some(S=>S.is_correct))return u.value=`${o+1}. soruda en az 1 doğru seçenek olmalıdır`,null}if(s.question_type==="true_false"&&(s.correct_answer===void 0||s.correct_answer===null))return u.value=`${o+1}. soru (doğru/yanlış) 'correct_answer' alanı içermelidir`,null}return u.value="",t}catch(n){return u.value="Geçersiz JSON formatı: "+n.message,null}}),g=n=>{n==="simple"?i.value=`[
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
]`:i.value=`[
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
]`},h=()=>{if(!r.value.title.trim()){u.value="Test başlığı zorunludur";return}if(!r.value.slug.trim()){u.value="Slug zorunludur";return}if(!r.value.category_id){u.value="Kategori seçimi zorunludur";return}if(!q.value)return;p.value=!0;const n={...r.value,questions:q.value};J.post(route("tests.bulk-store"),n,{onSuccess:t=>{p.value=!1},onError:t=>{if(p.value=!1,t&&typeof t=="object"){const o=Object.values(t)[0];u.value=Array.isArray(o)?o[0]:o}else u.value="Test oluşturulurken bir hata oluştu"}})};return(n,t)=>(c(),l("div",N,[e("div",$,[t[17]||(t[17]=e("h3",{class:"text-lg font-semibold text-foreground"},"Test Bilgileri",-1)),e("div",D,[e("div",M,[t[10]||(t[10]=e("label",{class:"text-sm font-medium text-foreground"},[a(" Test Başlığı "),e("span",{class:"text-destructive"},"*")],-1)),d(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>r.value.title=o),type:"text",placeholder:"Örn: JavaScript Temelleri",class:"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"},null,512),[[x,r.value.title]])]),e("div",j,[t[11]||(t[11]=e("label",{class:"text-sm font-medium text-foreground"},[a(" Slug "),e("span",{class:"text-destructive"},"*")],-1)),d(e("input",{"onUpdate:modelValue":t[1]||(t[1]=o=>r.value.slug=o),type:"text",placeholder:"javascript-temelleri",class:"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"},null,512),[[x,r.value.slug]])]),e("div",V,[t[13]||(t[13]=e("label",{class:"text-sm font-medium text-foreground"},[a(" Kategori "),e("span",{class:"text-destructive"},"*")],-1)),d(e("select",{"onUpdate:modelValue":t[2]||(t[2]=o=>r.value.category_id=o),class:"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"},[t[12]||(t[12]=e("option",{value:null},"Kategori Seçin",-1)),(c(!0),l(T,null,B(A(k),o=>(c(),l("option",{key:o.id,value:o.id},v(o.name),9,E))),128))],512),[[b,r.value.category_id]])]),e("div",O,[t[15]||(t[15]=e("label",{class:"text-sm font-medium text-foreground"},[a(" Durum "),e("span",{class:"text-destructive"},"*")],-1)),d(e("select",{"onUpdate:modelValue":t[3]||(t[3]=o=>r.value.status=o),class:"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"},[...t[14]||(t[14]=[e("option",{value:"draft"},"Taslak",-1),e("option",{value:"published"},"Yayınlandı",-1),e("option",{value:"private"},"Özel",-1)])],512),[[b,r.value.status]])])]),e("div",H,[t[16]||(t[16]=e("label",{class:"text-sm font-medium text-foreground"},"Açıklama",-1)),d(e("textarea",{"onUpdate:modelValue":t[4]||(t[4]=o=>r.value.description=o),rows:"3",placeholder:"Test hakkında kısa bir açıklama...",class:"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"},null,512),[[x,r.value.description]])])]),e("div",I,[e("div",L,[t[21]||(t[21]=e("svg",{class:"mt-0.5 h-5 w-5 flex-shrink-0 text-primary",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),e("div",U,[t[19]||(t[19]=e("h3",{class:"font-medium text-foreground"},"Toplu Soru Ekleme",-1)),t[20]||(t[20]=e("p",{class:"mt-1 text-sm text-muted-foreground"}," Sadece soruları JSON formatında ekleyin. Test bilgileri yukarıdaki formdan alınacak. ",-1)),e("button",{onClick:t[5]||(t[5]=o=>f.value=!f.value),class:"mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"},[t[18]||(t[18]=e("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)),a(" "+v(f.value?"Formatı Gizle":"Format Bilgisi"),1)])])])]),f.value?(c(),l("div",G,[t[23]||(t[23]=e("h3",{class:"mb-4 text-lg font-semibold text-foreground"},"JSON Format Örneği",-1)),e("div",K,[t[22]||(t[22]=C(`<div><h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Tek Doğru Cevap)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
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
}</code></pre></div><div class="rounded-lg border border-border bg-muted/30 p-4"><h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4><dl class="space-y-2 text-xs"><div class="border-b border-border pb-2"><dt class="font-semibold text-foreground">Test Alanları:</dt></div><div><dt class="font-medium text-foreground">title <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Test başlığı (zorunlu)</dd></div><div><dt class="font-medium text-foreground">slug <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">URL dostu slug (zorunlu)</dd></div><div><dt class="font-medium text-foreground">description</dt><dd class="text-muted-foreground">Test açıklaması (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">status</dt><dd class="text-muted-foreground">Durum: draft, published, private (varsayılan: draft)</dd></div><div><dt class="font-medium text-foreground">category_id</dt><dd class="text-muted-foreground">Kategori ID&#39;si (opsiyonel)</dd></div><div class="border-b border-border pb-2 pt-3"><dt class="font-semibold text-foreground">Soru Alanları:</dt></div><div><dt class="font-medium text-foreground">question_text <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Soru metni (zorunlu)</dd></div><div><dt class="font-medium text-foreground">question_type <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Soru tipi: single_choice (tek doğru), multiple_choice (çoklu doğru), true_false (doğru/yanlış) - zorunlu</dd></div><div><dt class="font-medium text-foreground">points</dt><dd class="text-muted-foreground">Puan (varsayılan: 10)</dd></div><div><dt class="font-medium text-foreground">order</dt><dd class="text-muted-foreground">Sıra numarası (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">explanation</dt><dd class="text-muted-foreground">Açıklama (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">options</dt><dd class="text-muted-foreground">Seçenekler dizisi (single_choice ve multiple_choice için zorunlu)</dd></div><div><dt class="font-medium text-foreground">correct_answer</dt><dd class="text-muted-foreground">Doğru cevap (true_false için: true/false - zorunlu)</dd></div></dl></div>`,3)),e("div",Y,[e("button",{type:"button",onClick:t[6]||(t[6]=o=>g("simple")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Basit Şablon Yükle "),e("button",{type:"button",onClick:t[7]||(t[7]=o=>g("detailed")),class:"rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"}," Detaylı Şablon Yükle ")])])])):_("",!0),e("div",Q,[t[24]||(t[24]=e("label",{class:"text-sm font-medium text-foreground"},[a(" Sorular (JSON) "),e("span",{class:"text-destructive"},"*")],-1)),d(e("textarea",{"onUpdate:modelValue":t[8]||(t[8]=o=>i.value=o),rows:"20",placeholder:'[{"question_text": "Soru metni?", "question_type": "single_choice", "options": [...]}]',class:F(["w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary",{"border-destructive":u.value}])},null,2),[[x,i.value]]),u.value?(c(),l("p",R,v(u.value),1)):q.value?(c(),l("p",X," ✓ "+v(q.value.length)+" soru tespit edildi ",1)):_("",!0)]),e("div",P,[e("button",{type:"button",onClick:t[9]||(t[9]=o=>n.$emit("cancel")),class:"rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"}," İptal "),e("button",{type:"button",onClick:h,disabled:p.value||!r.value.title||!r.value.slug||!r.value.category_id||!i.value.trim()||u.value||!q.value,class:"rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"},v(p.value?"Oluşturuluyor...":"Test Oluştur"),9,W)])]))}};export{ot as default};
