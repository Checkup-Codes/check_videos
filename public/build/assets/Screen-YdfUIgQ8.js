import{T as w,l as V,c as U,w as B,o as r,a as z,b as e,f as C,j as d,q as u,u as a,g as n,t as m,h as b,m as p,F as g}from"./app-k3_XiEXZ.js";import{_ as Y}from"./TopScreen-DBomty92.js";import{_ as F}from"./CheckScreen-CGYtishk.js";/* empty css            */const j={class:"h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5"},S={class:"container mx-auto p-4"},T={class:"space-y-2"},A=e("label",{for:"version",class:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}," Version ",-1),$={key:0,class:"text-sm font-medium text-red-500"},N={class:"space-y-2"},D=e("label",{for:"release_date",class:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}," Yayınlanma Tarihi ",-1),E={key:0,class:"text-sm font-medium text-red-500"},K={class:"space-y-2"},M=e("label",{for:"description",class:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}," Açıklama ",-1),O={key:0,class:"text-sm font-medium text-red-500"},q={class:"space-y-4"},L=e("h3",{class:"text-lg font-semibold"},"Yeni Özellikler",-1),G={class:"space-y-2"},H=["onUpdate:modelValue"],I=["onUpdate:modelValue"],J=["onClick"],P={key:0,class:"text-sm font-medium text-red-500"},Q={class:"space-y-4"},R=e("h3",{class:"text-lg font-semibold"},"Bugs",-1),W={class:"space-y-2"},X=["onUpdate:modelValue"],Z=["onUpdate:modelValue"],ee=["onClick"],te={key:0,class:"text-sm font-medium text-red-500"},se=e("button",{type:"submit",class:"ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"}," Submit ",-1),ae={__name:"Screen",setup(oe){const t=w({version:"",release_date:"",description:"",features:[{feature_name:"",feature_detail:""}],bugs:[{bug_name:"",bug_detail:""}]}),s=V({version:"",release_date:"",description:"",features:"",bugs:""});function v(){return s.value.version=t.version?"":"Version alanı zorunludur.",s.value.release_date=t.release_date?"":"Yayınlanma tarihi zorunludur.",s.value.description=t.description?"":"Açıklama alanı zorunludur.",t.features.some(i=>!i.feature_name||!i.feature_detail)?s.value.features="Tüm özellik alanları doldurulmalıdır.":s.value.features="",t.bugs.some(i=>!i.bug_name||!i.bug_detail)?s.value.bugs="Tüm bug alanları doldurulmalıdır.":s.value.bugs="",!Object.values(s.value).some(i=>i!=="")}function _(){t.features.push({feature_name:"",feature_detail:""})}function x(i){t.features.splice(i,1)}function h(){t.bugs.push({bug_name:"",bug_detail:""})}function y(i){t.bugs.splice(i,1)}function k(){v()&&t.post("/versions",{onSuccess:()=>{t.reset()}})}return(i,c)=>(r(),U(F,null,{default:B(()=>[z(Y,{title:"Versiyon Oluştur"}),e("div",j,[e("div",S,[e("form",{onSubmit:C(k,["prevent"]),class:"space-y-5 p-5"},[e("div",T,[A,d(e("input",{"onUpdate:modelValue":c[0]||(c[0]=o=>a(t).version=o),type:"text",id:"version",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"},null,512),[[u,a(t).version]]),s.value.version?(r(),n("p",$,m(s.value.version),1)):b("",!0)]),e("div",N,[D,d(e("input",{"onUpdate:modelValue":c[1]||(c[1]=o=>a(t).release_date=o),type:"date",id:"release_date",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"},null,512),[[u,a(t).release_date]]),s.value.release_date?(r(),n("p",E,m(s.value.release_date),1)):b("",!0)]),e("div",K,[M,d(e("textarea",{"onUpdate:modelValue":c[2]||(c[2]=o=>a(t).description=o),id:"description",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"},null,512),[[u,a(t).description]]),s.value.description?(r(),n("p",O,m(s.value.description),1)):b("",!0)]),e("div",q,[e("div",{class:"flex items-center justify-between"},[L,e("button",{type:"button",onClick:_,class:"text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"}," Yeni Özellik Ekle ")]),(r(!0),n(g,null,p(a(t).features,(o,f)=>(r(),n("div",{key:f,class:"border-border space-y-4 rounded-lg border p-4"},[e("div",G,[d(e("input",{"onUpdate:modelValue":l=>o.feature_name=l,placeholder:"Yeni Özellik ismi",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"},null,8,H),[[u,o.feature_name]]),d(e("textarea",{"onUpdate:modelValue":l=>o.feature_detail=l,placeholder:"Açıklaması",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"},null,8,I),[[u,o.feature_detail]])]),e("button",{type:"button",onClick:l=>x(f),class:"text-destructive hover:text-destructive/80 text-sm font-medium"}," Kaldır ",8,J)]))),128)),s.value.features?(r(),n("p",P,m(s.value.features),1)):b("",!0)]),e("div",Q,[e("div",{class:"flex items-center justify-between"},[R,e("button",{type:"button",onClick:h,class:"text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"}," Yeni Bug ekle ")]),(r(!0),n(g,null,p(a(t).bugs,(o,f)=>(r(),n("div",{key:f,class:"border-border space-y-4 rounded-lg border p-4"},[e("div",W,[d(e("input",{"onUpdate:modelValue":l=>o.bug_name=l,placeholder:"Yeni Bug İsmi",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"},null,8,X),[[u,o.bug_name]]),d(e("textarea",{"onUpdate:modelValue":l=>o.bug_detail=l,placeholder:"Bug Çözüm Açıklaması",class:"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"},null,8,Z),[[u,o.bug_detail]])]),e("button",{type:"button",onClick:l=>y(f),class:"text-destructive hover:text-destructive/80 text-sm font-medium"}," Kaldır ",8,ee)]))),128)),s.value.bugs?(r(),n("p",te,m(s.value.bugs),1)):b("",!0)]),se],32)])])]),_:1}))}};export{ae as default};