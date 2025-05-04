<template>
  <CheckScreen>
    <div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200">
      <div class="card-body p-4 sm:p-6">
        <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="mb-3 w-full sm:mb-0">
            <h1 class="break-words text-xl font-bold sm:text-2xl">{{ write.title }}</h1>
            <div class="mt-2">
              <span v-if="write.category" class="badge badge-outline text-xs">{{ write.category.name }}</span>
            </div>
          </div>

          <div class="mt-2 flex flex-shrink-0 gap-2 sm:mt-0">
            <button @click="toggleContent" class="btn btn-sm" :class="showDraw ? 'btn-primary' : 'btn-ghost'">
              {{ showDraw ? 'Metni Göster' : 'Çizim Göster' }}
            </button>

            <div v-if="props.auth.user" class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
              <ul class="dropdown-content menu z-[1] w-52 rounded-box border border-base-200 bg-base-100 p-2 shadow-md">
                <li><a :href="route('writes.edit', write.id)" class="text-sm">Düzenle</a></li>
                <li><a href="#" class="text-sm text-error" @click.prevent="deleteWrite(write.id)">Sil</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="divider my-2"></div>

        <div v-if="showDraw" class="min-h-[500px]">
          <ExcalidrawComponent :write="write" />
        </div>
        <div v-else class="content-container">
          <div v-if="write.summary" class="alert alert-info mb-4 px-3 py-2 text-sm sm:mb-6 sm:p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{{ write.summary }}</span>
          </div>

          <div class="article-content ql-editor" ref="contentRef" v-html="processedContent"></div>
        </div>

        <div
          class="text-base-content/70 mt-6 flex flex-col space-y-2 p-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:p-3 sm:text-sm"
        >
          <div>Oluşturma: {{ formatDate(write.created_at) }}</div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-3.5 w-3.5 sm:h-4 sm:w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {{ write.views_count }} görüntüleme
            </span>
            <span v-if="write.updated_at !== write.created_at" class="whitespace-nowrap">
              Son güncelleme: {{ formatDate(write.updated_at) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';

/**
 * Component name definition
 */
defineOptions({
  name: 'ShowWriteScreen',
});

/**
 * Get write data from page props
 */
const { props } = usePage();
const write = ref(props.write || {});
const auth = props.auth;
const contentRef = ref(null);
const showDraw = ref(false);

/**
 * Process content for display with proper safety measures
 */
const processedContent = computed(() => {
  if (!write.value.content) return '';

  // DOM parser oluştur
  const parser = new DOMParser();
  const doc = parser.parseFromString(write.value.content, 'text/html');

  // Tüm img elementlerini bul
  const images = doc.querySelectorAll('img');

  // Her resme lazy loading ve skeleton wrapper ekle
  images.forEach((img, index) => {
    // Resme benzersiz id ver
    const imageId = `content-img-${index}`;
    img.id = imageId;

    // Lazy loading ve öncelikli yükleme ekle
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async'); // Asenkron dekodlama
    img.setAttribute('importance', 'low'); // Düşük öncelik

    // Eğer genişlik ve yükseklik yoksa tahmini değerler ekle
    if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
      img.setAttribute('width', '800');
      img.setAttribute('height', '600');
    }

    // Skeleton container oluştur
    const skeletonWrapper = doc.createElement('div');
    skeletonWrapper.className = 'img-skeleton-wrapper relative';
    skeletonWrapper.style.width = '100%';
    skeletonWrapper.style.marginBottom = '1rem';
    skeletonWrapper.style.marginTop = '1rem';

    // Skeleton oluştur
    const skeleton = doc.createElement('div');
    skeleton.className = 'skeleton img-skeleton absolute inset-0 h-full w-full rounded-lg';
    skeleton.id = `skeleton-${imageId}`;

    // Resmin özgün wrapper'ını koru
    const imgParent = img.parentNode;

    // DOM yapısını güvenli bir şekilde değiştir
    if (imgParent) {
      const imgWrapper = doc.createElement('div');
      imgWrapper.className = 'img-wrapper relative';
      imgWrapper.style.width = '100%';

      // Dom elementlerini düzenle
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in-out';

      // Resim yükleme olayını ekle
      img.setAttribute(
        'onload',
        `
        this.style.opacity = '1';
        const skeleton = document.getElementById('skeleton-${imageId}');
        if (skeleton) skeleton.style.display = 'none';
      `
      );

      // Hata durumunu da işle (görsel yüklenemezse)
      img.setAttribute(
        'onerror',
        `
        const skeleton = document.getElementById('skeleton-${imageId}');
        if (skeleton) {
          skeleton.style.display = 'none';
          skeleton.insertAdjacentHTML('afterend', '<div class="text-error text-sm py-2">Görsel yüklenemedi</div>');
        }
        this.style.display = 'none';
      `
      );

      // Klon oluştur (orijinal elemanın bağlantılarını koparmak için)
      const imgClone = img.cloneNode(true);

      // Elementleri ağaca ekle
      imgWrapper.appendChild(imgClone);
      skeletonWrapper.appendChild(skeleton);
      skeletonWrapper.appendChild(imgWrapper);

      // Orijinal resmi skeletonWrapper ile değiştir
      try {
        imgParent.insertBefore(skeletonWrapper, img);
        imgParent.removeChild(img);
      } catch (error) {
        console.error('DOM manipülasyon hatası:', error);
      }
    }
  });

  // Düzenlenmiş HTML'i döndür
  return doc.body.innerHTML;
});

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

/**
 * Navigate to edit page
 */
const editWrite = () => {
  router.visit(route('writes.edit', { write: write.value.slug }));
};

/**
 * Handle content after component mount
 */
onMounted(() => {
  if (contentRef.value) {
    // Add any needed post-processing for content display
    setupLinkHandling();
  }

  // URL parametrelerine göre çizim/içerik gösterme durumunu belirle
  if (window.location.pathname.includes('categories')) {
    showDraw.value = true;
  } else {
    showDraw.value = props.showDraw || false;
  }
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');

  // İçerik gösteriliyorsa ve görsel yükleme gecikmesi istenmiyorsa,
  // görüntüleme durumuna bağlı olarak görsel önbelleğe alınabilir
  if (!showDraw.value) {
    // İçerik yüklendikten sonra
    nextTick(() => {
      // Görünür pencere içindeki resimleri hemen yükle
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // Görseli öncelikli yüklenecek şekilde işaretle
              img.setAttribute('loading', 'eager');
              img.setAttribute('importance', 'high');
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: '200px 0px', // Görünür alan dışında 200px önceden yüklemeye başla
          threshold: 0.01, // %1'i görünür olduğunda tetikle
        }
      );

      // Görünür alandaki tüm görsel elementlerini gözlemle
      const imgElements = document.querySelectorAll('.article-content img');
      imgElements.forEach((img) => observer.observe(img));
    });
  }
});

/**
 * Setup handling for links in content
 */
const setupLinkHandling = () => {
  if (!contentRef.value) return;

  // Get all links in the content
  const links = contentRef.value.querySelectorAll('a');

  // Add target blank to external links
  links.forEach((link) => {
    const url = link.getAttribute('href');
    if (url && !url.startsWith('/') && !url.startsWith('#')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
};

const toggleContent = () => {
  showDraw.value = !showDraw.value;
  const url = new URL(window.location.href);

  if (showDraw.value) {
    url.searchParams.set('draw', '1');
  } else {
    url.searchParams.delete('draw');
  }

  window.history.pushState({}, '', url);
};

const deleteWrite = (id) => {
  if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
    router.delete(route('writes.destroy', id));
  }
};
</script>

<style>
/* İçeriğin mobil uyumlu ve düzgün görüntülenmesi için */
.content-container {
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  word-wrap: break-word;
}

.article-content {
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont;
  line-height: 1.6;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
}

/* Code element için özel tasarım - en yüksek öncelikli */
.article-content code:not(.ql-syntax *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace !important;
  background-color: hsl(var(--b2)) !important;
  color: hsl(var(--bc)) !important;
  border-radius: 0.35rem !important;
  border: 1px solid hsl(var(--b3)) !important;
  padding: 0.15rem 0.4rem !important;
  margin: 0 0.1rem !important;
  font-size: 0.9em !important;
  display: inline !important;
  white-space: pre-wrap !important;
  word-break: normal !important;
}

/* Skeleton animation */
.skeleton {
  background: linear-gradient(90deg, hsl(var(--b3)) 25%, hsl(var(--b2)) 50%, hsl(var(--b3)) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Mobil için ek düzenlemeler */
@media (max-width: 640px) {
  /* İçerik alanı */
  .article-content {
    font-size: 0.95rem;
  }

  /* Badge boyutu */
  .badge {
    font-size: 0.7rem;
  }
}
</style>
