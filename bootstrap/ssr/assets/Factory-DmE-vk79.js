import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "@fortawesome/vue-fontawesome";
import "vue/server-renderer";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 class="p-5 text-2xl">Proje Başlangıcı: YouTube İçerik Üretimi için Profesyonel Yaklaşım</h1><div class="grid grid-cols-2 p-5 leading-loose"><div><h3 class="text-xl">Adımlar</h3><div class="my-3 w-11/12 rounded bg-gray-50 p-3"><div class="rounded p-2"><h4 class="py-1">Adım 1</h4><div class="w-full bg-white p-2">Kategori Oluştur</div><h4 class="py-1">Örnek Senaryo</h4><div class="w-full bg-white p-2"> Oluşturulan seri short ya da video farketmez önce bir kategori oluşurmalıyız. <ol class="list-disc px-5"><li>100 günde yazılım öğrenme challange</li><li>Laravel Bootcamp</li><li>Typescript Tutorial</li></ol></div></div></div></div><div><h2 class="text-xl">Başlarken</h2><br><p> YouTube kanalınız için içerik üretimi, tıpkı bir fabrika işletmek gibi titiz planlama ve düzen gerektirir. Zamanın ilerlemesiyle video çekimleri için yeterli zamanı bulmak zorlaşabilir, ancak bir YouTube kanalının CV&#39;nize katacağı değer tartışılmazdır. Bu nedenle, video çekim sürecine daha profesyonel ve düzenli bir yaklaşımla başlamayı hedefliyoruz. </p><br><h3 class="text-xl">Hedef ve Zaman Planı</h3><br><h4 class="text-lg font-semibold">Oynatma Listeleri ve Video Serileri:</h4><ol class="list-disc px-5"><li>Her bir video serisi için en az 30 video hedeflenmeli.</li><li>30 videoyu çekmek için 90 günlük bir zaman dilimi belirlenmeli.</li><li>Bir seriye başlamak için en az 5 video stoklanmalı.</li><li>YouTube videolarının süresi 8-12 dakika arasında olmalı.</li><li>Bir oturumda 3-4 video çekimi yapılabilir, bu stok için uygundur.</li><li>5 video çekildikten sonra yüklemelere başlanmalı.</li><li>Video çekim günlerinde sadece çekim, edit günlerinde sadece düzenleme yapılmalıdır.</li><li>Bir günde birden fazla video çekimi veya düzenleme yapılabilir.</li></ol><br><h4 class="text-lg font-semibold">Video Yapısı:</h4><p>Her YouTube videosu aşağıdaki bölümlerden oluşmalıdır:</p><ol class="list-disc px-5"><li>Açılış Konuşması: Videonun amacı ve neden çekildiği açıklanmalı. .</li><li>Kullanılan Araçlar: VSCode, Chrome, React-Native veya Node gibi kullanılan araçlar belirtilmeli.</li><li>Videonun Konusu ve Anafikri: Konunun özeti ve anafikri ele alınmalı.</li><li>Özgün Örnekler: Konu özgün örneklerle detaylandırılmalı.</li><li> Kapanış Konuşması: Diğer videolar ve oynatma listelerindeki önerilen videolar belirtilerek kapanış yapılmalı. </li></ol><br><h4 class="text-lg font-semibold">Yardımcı Unsurlar :</h4><p>Her YouTube videosu aşağıdaki bölümlerden oluşmalıdır:</p><ol class="list-disc px-5"><li>Açılış Introsu ve Ses Efekti: 2-3 saniyelik kısa bir intro ve ses efekti kullanılmalı.</li><li>Kapanış Ekranı: 8 saniyelik video önerme kısmı, özel tasarımla hazırlanmalı.</li><li> Bilgilendirici Kanal Introsu: Videoların sağında bilgilendirici bir kanal introsu yer almalı (haber bültenlerindeki son dakika haberleri gibi). </li></ol><br><h4 class="text-lg font-semibold">Ek Öneriler</h4><ol class="list-disc px-5"><li>Planlama ve Senaryo: Her video için detaylı bir senaryo ve plan oluşturulmalı.</li><li> İzleyici Katılımı: İzleyicilerle etkileşim sağlamak için sorular sorulmalı ve geri bildirimler dikkate alınmalı. </li><li> Görsel ve İşitsel Kalite: Videoların görsel ve işitsel kalitesi yüksek olmalı, profesyonel kamera ve mikrofonlar kullanılmalı. </li><li>SEO Optimizasyonu: Video başlıkları, açıklamaları ve etiketler SEO optimizasyonuna uygun olmalı.</li><li>Sosyal Medya: Videolar sosyal medya platformlarında paylaşılmalı ve tanıtılmalı.</li><li> Analiz ve Geliştirme: YouTube analitik araçları kullanılarak izleyici davranışları analiz edilmeli ve içerik buna göre geliştirilmelidir. </li></ol><div> Bu profesyonel yaklaşım, YouTube kanalınızı daha verimli ve etkili bir şekilde yönetmenizi sağlayarak, içeriklerinizin kalitesini ve izleyici kitlenizi artıracaktır. </div></div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Factory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Factory = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Factory as default
};
