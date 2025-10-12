import { ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { ref, useSSRContext } from "vue";
const _sfc_main = {
  __name: "TypescriptTutorial",
  __ssrInlineRender: true,
  setup(__props) {
    const playlistId = ref("PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l");
    const videos = ref([]);
    const loading = ref(false);
    const keywords = ref(
      "yazılım öğrenme yolları, yazılım öğrenme siteleri, yazılım öğrenme platformları, yazılım öğrenme kitapları, yazılım öğrenme videoları, yazılım öğrenme uygulamaları, yazılım öğrenme yolları, yazılım öğrenme siteleri, yazılım öğrenme platformları, yazılım"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 class="p-5 text-2xl">Aktif Kategori: Typescript Tutorial</h1><div class="grid grid-cols-2 p-5 leading-loose"><div><h3 class="text-xl">Adımlar</h3><div class="my-3 w-11/12 rounded bg-gray-50 p-3"><div class="rounded p-2"><h4 class="py-1">Adım 1</h4><div class="w-full bg-white p-2">Video İsmi</div><h4 class="py-1">Uzun Açıklama</h4><div class="w-full bg-white p-2"> Array nedir ve ts&#39;de yeri nedir bu video bunlardan bahsettik. <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> Merhaba! Kanalıma hoş geldiniz! Bu eğitim serisinde amacımız, sıfırdan TypeScript öğrenmek ve birlikte gerçek dünya projeleri geliştirmek. Ben bir profesyonel eğitimci olmayabilirim, ancak öğreterek öğrenme metoduyla kendimi geliştiriyorum ve bu süreçte sizlere de yardımcı olabilmek beni mutlu ediyor. Bu eğitim serisinde, TypeScript&#39;in temellerinden başlayarak adım adım ilerleyeceğiz. TypeScript&#39;i neden kullanmanız gerektiğini anlatacak, nasıl kurulacağını ve temel özelliklerini öğreneceğiz. Ardından, gerçek dünya projeleri üzerinde birlikte çalışarak, Mobil, Masaüstü, Web ve Mobil Uygulamalar geliştireceğiz. Eğer web geliştirmeye yeni başlıyorsanız veya TypeScript&#39;i daha iyi anlamak istiyorsanız, bu eğitim serisi tam size göre! Sadece öğreterek öğrenme metoduyla ilerleyeceğiz, böylece birlikte projeler geliştirirken hem siz öğrenecek hem de ben kendimi geliştireceğim. Bu seriyi izledikten sonra, TypeScript&#39;i kullanarak gerçek dünya projelerine başlayabilecek, farklı platformlarda uygulamalar geliştirebilecek ve kendinizi geliştirme yolculuğunuzda önemli bir adım atmış olacaksınız. Videoları beğenmeyi ve kanalıma abone olmayı unutmayın, böylece yeni videolarımdan haberdar olabilirsiniz. Sizlere yardımcı olabilmek ve birlikte öğrenmek için sabırsızlanıyorum! Haydi, hemen başlayalım ve birlikte TypeScript&#39;in büyülü dünyasına adım atalım! <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> Laravel Oynatma Listemiz : • Laravel Bootcamp Ekranda yazdığım kodların kaynak dosyası : <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> ⭐️ Timestamps ⭐️ 00:00 | İntro 00:03 | Neden kullanırız 01:10 | Konuya Giriş 05:40 | Örnek verelim 09:30 | Son <br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> 💙💙💙<br> ⭐ Discord: / discord <br> 📝LinkedIn: / cekap 🌎 Website: <br> 💙💙💙 Cekap <br> 📸 Instagram : / cekapykp <br> 📱 Twitter: / cekapykp <br> 📂 GitHub: https://github.com/cekapykp <br><br><br> ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br> ⭐️ Tags ⭐️ <br> -TypeScript -TypeScript nedir -TypeScript avantajları -TypeScript kurulumu -TypeScript öğreniyoruz -TypeScript tutorial -TypeScript bootcamp -TypeScript framework <br><br> ⭐️ Hashtags⭐️ <br> #typescript #typescripttutorial #typescriptbootcamp </div></div></div></div><div><div class="mb-6 rounded-lg bg-white p-6 shadow-lg"><h2 class="mb-4 text-2xl font-semibold">Keywords</h2><div><textarea class="h-40 w-full rounded border bg-gray-50 p-4 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Keywordleri virgülle ayrılmış şekilde girin" rows="4">${ssrInterpolate(keywords.value)}</textarea><div class="flex justify-end"><button class="mt-3 w-1/3 rounded bg-indigo-600 py-2 text-white transition-all hover:bg-indigo-500"> Kopyala </button></div></div></div><div class="rounded-lg bg-white p-6 shadow-lg"><h1 class="mb-4 text-2xl font-semibold">YouTube Playlist Videos</h1><input${ssrRenderAttr("value", playlistId.value)} class="mb-4 w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="YouTube Playlist ID girin"><div class="flex justify-end"><button class="w-1/3 rounded bg-indigo-600 py-2 text-white transition-all hover:bg-indigo-500"> Fetch Videos </button></div>`);
      if (loading.value) {
        _push(`<div class="text-indigo-500">Yükleniyor...</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="video-list mt-6 space-y-4"><!--[-->`);
      ssrRenderList(videos.value, (video) => {
        _push(`<li class="flex items-center rounded-lg bg-gray-50 p-4 shadow-sm"><img${ssrRenderAttr("src", video.thumbnail)} alt="Video Thumbnail" class="mr-4 h-20 w-36 rounded-lg object-cover shadow-sm"><div><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} target="_blank" class="text-lg font-semibold text-indigo-600 hover:underline">${ssrInterpolate(video.title)}</a><p class="text-sm text-gray-500">Süre: ${ssrInterpolate(video.duration)}</p><p class="text-sm text-gray-500">Görüntülenme: ${ssrInterpolate(video.viewCount)}</p><p class="text-sm text-gray-500">Beğeniler: ${ssrInterpolate(video.likeCount)}</p></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Category/TypescriptTutorial.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
