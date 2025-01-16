import{z as rt,A as ct,Q as lt,l as dt,c as G,w as R,o as S,b as h,t as T,u as X,k as ft,e as ht,h as J,g as C,F as tt,m as et}from"./app-CHEKAHVn.js";import{_ as _t}from"./CheckScreen-DLADvBsI.js";/* empty css            */var nt={exports:{}};(function(P,W){(function(_,v){P.exports=v()})(rt,function(){var _=1e3,v=6e4,z=36e5,m="millisecond",$="second",Y="minute",O="hour",g="day",E="week",p="month",Z="quarter",b="year",H="date",K="Invalid Date",at=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,it=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,ut={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},V=function(s,r,t){var n=String(s);return!n||n.length>=r?s:""+Array(r+1-n.length).join(t)+s},ot={s:V,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),n=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+V(n,2,"0")+":"+V(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var n=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(n,p),a=t-e<0,i=r.clone().add(n+(a?-1:1),p);return+(-(n+(t-e)/(a?e-i:i-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:p,y:b,w:E,d:g,D:H,h:O,m:Y,s:$,ms:m,Q:Z}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},j="en",x={};x[j]=ut;var Q="$isDayjsObject",U=function(s){return s instanceof B||!(!s||!s[Q])},F=function s(r,t,n){var e;if(!r)return j;if(typeof r=="string"){var a=r.toLowerCase();x[a]&&(e=a),t&&(x[a]=t,e=a);var i=r.split("-");if(!e&&i.length>1)return s(i[0])}else{var o=r.name;x[o]=r,e=o}return!n&&e&&(j=e),e||!n&&j},l=function(s,r){if(U(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new B(t)},u=ot;u.l=F,u.i=U,u.w=function(s,r){return l(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var B=function(){function s(t){this.$L=F(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[Q]=!0}var r=s.prototype;return r.parse=function(t){this.$d=function(n){var e=n.date,a=n.utc;if(e===null)return new Date(NaN);if(u.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var i=e.match(at);if(i){var o=i[2]-1||0,c=(i[7]||"0").substring(0,3);return a?new Date(Date.UTC(i[1],o,i[3]||1,i[4]||0,i[5]||0,i[6]||0,c)):new Date(i[1],o,i[3]||1,i[4]||0,i[5]||0,i[6]||0,c)}}return new Date(e)}(t),this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return u},r.isValid=function(){return this.$d.toString()!==K},r.isSame=function(t,n){var e=l(t);return this.startOf(n)<=e&&e<=this.endOf(n)},r.isAfter=function(t,n){return l(t)<this.startOf(n)},r.isBefore=function(t,n){return this.endOf(n)<l(t)},r.$g=function(t,n,e){return u.u(t)?this[n]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,n){var e=this,a=!!u.u(n)||n,i=u.p(t),o=function(w,y){var D=u.w(e.$u?Date.UTC(e.$y,y,w):new Date(e.$y,y,w),e);return a?D:D.endOf(g)},c=function(w,y){return u.w(e.toDate()[w].apply(e.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice(y)),e)},d=this.$W,f=this.$M,M=this.$D,L="set"+(this.$u?"UTC":"");switch(i){case b:return a?o(1,0):o(31,11);case p:return a?o(1,f):o(0,f+1);case E:var k=this.$locale().weekStart||0,A=(d<k?d+7:d)-k;return o(a?M-A:M+(6-A),f);case g:case H:return c(L+"Hours",0);case O:return c(L+"Minutes",1);case Y:return c(L+"Seconds",2);case $:return c(L+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,n){var e,a=u.p(t),i="set"+(this.$u?"UTC":""),o=(e={},e[g]=i+"Date",e[H]=i+"Date",e[p]=i+"Month",e[b]=i+"FullYear",e[O]=i+"Hours",e[Y]=i+"Minutes",e[$]=i+"Seconds",e[m]=i+"Milliseconds",e)[a],c=a===g?this.$D+(n-this.$W):n;if(a===p||a===b){var d=this.clone().set(H,1);d.$d[o](c),d.init(),this.$d=d.set(H,Math.min(this.$D,d.daysInMonth())).$d}else o&&this.$d[o](c);return this.init(),this},r.set=function(t,n){return this.clone().$set(t,n)},r.get=function(t){return this[u.p(t)]()},r.add=function(t,n){var e,a=this;t=Number(t);var i=u.p(n),o=function(f){var M=l(a);return u.w(M.date(M.date()+Math.round(f*t)),a)};if(i===p)return this.set(p,this.$M+t);if(i===b)return this.set(b,this.$y+t);if(i===g)return o(1);if(i===E)return o(7);var c=(e={},e[Y]=v,e[O]=z,e[$]=_,e)[i]||1,d=this.$d.getTime()+t*c;return u.w(d,this)},r.subtract=function(t,n){return this.add(-1*t,n)},r.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||K;var a=t||"YYYY-MM-DDTHH:mm:ssZ",i=u.z(this),o=this.$H,c=this.$m,d=this.$M,f=e.weekdays,M=e.months,L=e.meridiem,k=function(y,D,N,I){return y&&(y[D]||y(n,a))||N[D].slice(0,I)},A=function(y){return u.s(o%12||12,y,"0")},w=L||function(y,D,N){var I=y<12?"AM":"PM";return N?I.toLowerCase():I};return a.replace(it,function(y,D){return D||function(N){switch(N){case"YY":return String(n.$y).slice(-2);case"YYYY":return u.s(n.$y,4,"0");case"M":return d+1;case"MM":return u.s(d+1,2,"0");case"MMM":return k(e.monthsShort,d,M,3);case"MMMM":return k(M,d);case"D":return n.$D;case"DD":return u.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return k(e.weekdaysMin,n.$W,f,2);case"ddd":return k(e.weekdaysShort,n.$W,f,3);case"dddd":return f[n.$W];case"H":return String(o);case"HH":return u.s(o,2,"0");case"h":return A(1);case"hh":return A(2);case"a":return w(o,c,!0);case"A":return w(o,c,!1);case"m":return String(c);case"mm":return u.s(c,2,"0");case"s":return String(n.$s);case"ss":return u.s(n.$s,2,"0");case"SSS":return u.s(n.$ms,3,"0");case"Z":return i}return null}(y)||i.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,n,e){var a,i=this,o=u.p(n),c=l(t),d=(c.utcOffset()-this.utcOffset())*v,f=this-c,M=function(){return u.m(i,c)};switch(o){case b:a=M()/12;break;case p:a=M();break;case Z:a=M()/3;break;case E:a=(f-d)/6048e5;break;case g:a=(f-d)/864e5;break;case O:a=f/z;break;case Y:a=f/v;break;case $:a=f/_;break;default:a=f}return e?a:u.a(a)},r.daysInMonth=function(){return this.endOf(p).$D},r.$locale=function(){return x[this.$L]},r.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),a=F(t,n,!0);return a&&(e.$L=a),e},r.clone=function(){return u.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),q=B.prototype;return l.prototype=q,[["$ms",m],["$s",$],["$m",Y],["$H",O],["$W",g],["$M",p],["$y",b],["$D",H]].forEach(function(s){q[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),l.extend=function(s,r){return s.$i||(s(r,B,l),s.$i=!0),l},l.locale=F,l.isDayjs=U,l.unix=function(s){return l(1e3*s)},l.en=x[j],l.Ls=x,l.p={},l})})(nt);var st=nt.exports;const mt=ct(st);var $t={exports:{}};(function(P,W){(function(_,v){P.exports=v(st)})(rt,function(_){function v($){return $&&typeof $=="object"&&"default"in $?$:{default:$}}var z=v(_),m={name:"tr",weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekStart:1,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinal:function($){return $+"."}};return z.default.locale(m,null,!0),m})})($t);const yt={class:"rounded-lg bg-white p-6"},Mt={class:"mb-4 flex items-center justify-between border-b pb-4"},pt={class:"text-2xl font-medium text-gray-800"},vt={class:"text-sm text-gray-500"},gt={key:0,class:"mt-6"},bt=h("h2",{class:"mb-2 text-lg font-semibold text-gray-800"},"Özellikler",-1),Dt={class:"space-y-2"},St=h("span",{class:"mr-2 text-blue-500"},"•",-1),xt={class:"text-gray-800"},kt={class:"whitespace-pre-line text-gray-600"},wt={key:1,class:"mt-6"},Yt=h("h2",{class:"mb-2 text-lg font-semibold text-gray-800"},"Düzeltilen Hatalar",-1),Ot={class:"space-y-2"},Ht=h("span",{class:"mr-2 text-red-500"},"•",-1),Lt={class:"text-gray-800"},Tt={class:"text-gray-600"},At={__name:"Screen",setup(P){mt.locale("tr");const{props:W}=lt(),_=dt(W.version);return(v,z)=>(S(),G(_t,null,{default:R(()=>[h("div",yt,[h("div",Mt,[h("h1",pt,T(_.value.version),1),X(W).auth.user?(S(),G(X(ft),{key:0,href:`/versions/${_.value.id}/edit`,class:"text-sm font-medium text-black hover:text-gray-500"},{default:R(()=>[ht(" Bu versiyonu düzenle ")]),_:1},8,["href"])):J("",!0)]),h("p",vt,T(_.value.release_date),1),_.value.features.length>0?(S(),C("div",gt,[bt,h("ul",Dt,[(S(!0),C(tt,null,et(_.value.features,m=>(S(),C("li",{key:m.id,class:"flex items-start"},[St,h("div",null,[h("strong",xt,T(m.feature_name)+":",1),h("span",kt,T(m.feature_detail),1)])]))),128))])])):J("",!0),_.value.bugs.length>0?(S(),C("div",wt,[Yt,h("ul",Ot,[(S(!0),C(tt,null,et(_.value.bugs,m=>(S(),C("li",{key:m.id,class:"flex items-start"},[Ht,h("div",null,[h("strong",Lt,T(m.bug_name)+":",1),h("span",Tt,T(m.bug_detail),1)])]))),128))])])):J("",!0)])]),_:1}))}};export{At as default};
