# Modül Mimarisi Kılavuzu

Bu döküman, WritesCategories modülünü referans alarak yeni modüller oluştururken uygulanması gereken mimari yapıyı, dosya organizasyonunu, cache stratejisini ve tasarım kalıplarını açıklar.

## İçindekiler

1. [Dosya Yapısı](#dosya-yapısı)
2. [Backend Mimarisi](#backend-mimarisi)
3. [Frontend Mimarisi](#frontend-mimarisi)
4. [SEO Sistemi](#seo-sistemi)
5. [Cache & Store Yapısı](#cache--store-yapısı)
6. [Performans Optimizasyonları](#performans-optimizasyonları)
7. [Tasarım Sistemi](#tasarım-sistemi)

---

## Dosya Yapısı

### Backend (Laravel)

```
app/
├── Http/
│   └── Controllers/
│       └── {ModuleName}/
│           ├── {Entity}Controller.php      # Ana controller
│           └── {SubEntity}Controller.php   # Alt entity controller
├── Models/
│   └── {ModuleName}/
│       ├── {Entity}.php                    # Ana model
│       └── {SubEntity}.php                 # Alt model
├── Services/
│   └── {ModuleName}/
│       └── {Entity}Service.php             # Business logic
└── Policies/
    └── {ModuleName}/
        └── {Entity}Policy.php              # Authorization
```

### Frontend (Vue/Inertia)

```
resources/js/Pages/{ModuleName}/
├── _components/                    # Modüle özel componentler
│   └── icons/                      # SVG icon componentleri
├── _composables/                   # Paylaşılan liste/tree componentleri
│   ├── {Entity}List.vue
│   └── {Entity}Tree.vue
├── _layouts/                       # Modül layout'ları
│   ├── Layout{ModuleName}.vue      # Ana layout (sidebar + content)
│   ├── SidebarLayout{Entity}.vue   # Sidebar varyantları
│   └── SidebarLayout{SubEntity}.vue
├── _utils/                         # Utility fonksiyonlar
│   ├── css/
│   ├── useFlashMessage.js
│   └── useSidebar.js
├── {Entity}/                       # Entity sayfaları
│   ├── Index{Entity}.vue           # Liste sayfası (wrapper)
│   ├── Show{Entity}.vue            # Detay sayfası (wrapper)
│   ├── Create{Entity}.vue          # Oluşturma sayfası (wrapper)
│   ├── Edit{Entity}.vue            # Düzenleme sayfası (wrapper)
│   ├── Index/
│   │   └── Screen.vue              # Gerçek içerik
│   ├── Show/
│   │   └── Screen.vue
│   ├── Create/
│   │   └── Screen.vue
│   └── Edit/
│       └── Screen.vue
└── {SubEntity}/                    # Alt entity sayfaları
    └── ... (aynı yapı)
```

### Vuex Store

```
resources/js/Store/
├── index.js                        # Store tanımı
└── Modules/
    └── {ModuleName}.js             # Modül store'u
```

---

## Backend Mimarisi

### Controller Yapısı

```php
<?php

namespace App\Http\Controllers\{ModuleName};

use App\Http\Controllers\Controller;
use App\Services\{ModuleName}\{Entity}Service;
use Illuminate\Support\Facades\Auth;

class {Entity}Controller extends Controller
{
    private ${entity}Service;

    public function __construct({Entity}Service ${entity}Service)
    {
        $this->{entity}Service = ${entity}Service;
    }

    /**
     * Index - Sidebar verilerini gönderir (ilk yükleme için cache'lenir)
     */
    public function index()
    {
        $result = $this->{entity}Service->getAll();
        $sidebarData = $this->{entity}Service->getSidebarData();
        
        return inertia('{ModuleName}/{Entity}/Index{Entity}', [
            'items'      => $result['data'],
            'sidebar'    => $sidebarData['data'],  // İlk yükleme için
            'screen'     => $this->{entity}Service->getScreenData('Başlık', true),
            'isAdmin'    => Auth::check()
        ]);
    }

    /**
     * Show - Two-phase loading: Temel bilgi anında, içerik lazy load
     */
    public function show($slug)
    {
        // Phase 1: Minimal veri (SEO + temel bilgi)
        $basicData = $this->{entity}Service->getBasicBySlug($slug);
        
        return inertia('{ModuleName}/{Entity}/Show{Entity}', [
            'item'       => $basicData['data'],
            'sidebar'    => [],  // Store'dan gelecek
            'screen'     => $this->{entity}Service->getScreenData($basicData['data']->title),
            'isAdmin'    => Auth::check()
        ]);
    }

    /**
     * API: İçerik lazy loading
     */
    public function getContent($slug)
    {
        $result = $this->{entity}Service->getBySlug($slug);
        
        return response()->json([
            'success' => true,
            'content' => $result['data']->content,
            // ... diğer ağır veriler
        ]);
    }

    /**
     * API: Sidebar verileri lazy loading
     */
    public function getSidebarData()
    {
        $result = $this->{entity}Service->getSidebarData();
        
        return response()->json([
            'success' => true,
            'items' => $result['data'],
        ]);
    }
}
```

### Service Yapısı

```php
<?php

namespace App\Services\{ModuleName};

use App\Models\{ModuleName}\{Entity};
use App\Services\SeoService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class {Entity}Service
{
    /**
     * Tüm kayıtları getir (cache'li)
     */
    public function getAll()
    {
        $isAdmin = Auth::check();
        
        if (!$isAdmin) {
            return Cache::remember('public_{entities}_list', 60 * 60, function () {
                return [
                    'data' => {Entity}::select(['id', 'title', 'slug', 'status', 'created_at'])
                        ->where('status', 'published')
                        ->orderByDesc('created_at')
                        ->get()
                ];
            });
        }
        
        return [
            'data' => {Entity}::select(['id', 'title', 'slug', 'status', 'created_at'])
                ->orderByDesc('created_at')
                ->get()
        ];
    }

    /**
     * Temel bilgi (SEO için) - içerik hariç
     */
    public function getBasicBySlug($slug)
    {
        $isAdmin = Auth::check();
        
        $query = {Entity}::select([
            'id', 'title', 'slug', 'status', 'created_at', 
            'meta_description', 'cover_image'
            // 'content' YOK - lazy load edilecek
        ])->where('slug', $slug);
        
        if (!$isAdmin) {
            $query->where('status', 'published');
        }
        
        return ['data' => $query->firstOrFail()];
    }

    /**
     * Tam veri (içerik dahil)
     */
    public function getBySlug($slug)
    {
        $isAdmin = Auth::check();
        
        $query = {Entity}::with(['relations'])
            ->where('slug', $slug);
        
        if (!$isAdmin) {
            $query->where('status', 'published');
        }
        
        return ['data' => $query->firstOrFail()];
    }

    /**
     * SEO verisi
     */
    public function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(SeoService::class)->getScreenSeo(
            '{entities}',
            $pageTitle,
            null,
            $isMobile
        );
    }
}
```

### Route Tanımları

```php
// routes/web.php

// Public Routes
Route::resource('/{entities}', {Entity}Controller::class);

// API Routes (Lazy Loading)
Route::get('/api/{entities}/{slug}/content', [{Entity}Controller::class, 'getContent'])
    ->name('api.{entities}.content');
Route::get('/api/{entities}/sidebar-data', [{Entity}Controller::class, 'getSidebarData'])
    ->name('api.{entities}.sidebar');
```

---

## Frontend Mimarisi

### Wrapper Component (Show{Entity}.vue)

```vue
<template>
  <PageMeta
    :title="metaTitle"
    :description="metaDescription"
    :keywords="metaKeywords"
    :image="metaImage"
    type="article"
  />
  <Layout{ModuleName}>
    <template #screen>
      <Screen />
    </template>
  </Layout{ModuleName}>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Layout{ModuleName} from '@/Pages/{ModuleName}/_layouts/Layout{ModuleName}.vue';
import Screen from '@/Pages/{ModuleName}/{Entity}/Show/Screen.vue';
import PageMeta from '@/Components/PageMeta.vue';

defineOptions({ name: 'Show{Entity}Page' });

const { props } = usePage();
const item = props.item || {};

const metaTitle = computed(() => item.title || 'Başlık');
const metaDescription = computed(() => item.meta_description || '');
const metaKeywords = computed(() => item.seo_keywords || '');
const metaImage = computed(() => item.cover_image || '');
</script>
```

### Screen Component (Show/Screen.vue)

```vue
<template>
  <CheckScreen>
    <!-- Header: Anında görünür -->
    <div v-if="isLoading" class="space-y-3">
      <div class="skeleton h-8 w-3/4 rounded-md"></div>
      <div class="skeleton h-4 w-24 rounded-md"></div>
    </div>
    <template v-else>
      <h1 class="text-3xl font-bold text-foreground">{{ item.title }}</h1>
      <span class="text-muted-foreground">{{ formatDate(item.created_at) }}</span>
    </template>

    <!-- Content: Lazy loaded -->
    <div class="content-container">
      <div v-if="isContentLoading" class="space-y-4">
        <div class="skeleton h-4 w-full rounded-md"></div>
        <div class="skeleton h-4 w-5/6 rounded-md"></div>
        <div class="skeleton h-32 w-full rounded-md"></div>
      </div>
      <div v-else-if="contentLoadError" class="text-destructive">
        {{ contentLoadError }}
        <button @click="loadContent" class="text-primary hover:underline">Tekrar Dene</button>
      </div>
      <div v-else v-html="content"></div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

defineOptions({ name: 'Show{Entity}Screen' });

const { props } = usePage();
const item = ref(props.item || {});

// Lazy loading state
const isContentLoading = ref(true);
const contentLoadError = ref(null);
const content = ref('');

const isLoading = computed(() => !item.value.title);

// Lazy load content
const loadContent = async () => {
  if (!item.value.slug) return;
  
  try {
    isContentLoading.value = true;
    contentLoadError.value = null;
    
    const response = await fetch(`/api/{entities}/${item.value.slug}/content`);
    const data = await response.json();
    
    if (data.success) {
      content.value = data.content;
    } else {
      contentLoadError.value = data.error || 'İçerik yüklenemedi';
    }
  } catch (error) {
    contentLoadError.value = 'İçerik yüklenirken bir hata oluştu';
  } finally {
    isContentLoading.value = false;
  }
};

onMounted(() => {
  loadContent();
});
</script>

<style scoped>
.skeleton {
  @apply bg-muted;
  background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
```

---

## SEO Sistemi

### SeoService Kullanımı

```php
// Controller'da
public function show($slug)
{
    $item = $this->service->getBasicBySlug($slug);
    
    return inertia('...', [
        'item' => $item['data'],
        'screen' => $this->service->getScreenData($item['data']->title),
    ]);
}

// Service'de
public function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
{
    return app(SeoService::class)->getScreenSeo(
        '{module-name}',      // Screen identifier
        $pageTitle,           // Browser tab: "PageTitle | SiteName"
        null,                 // Description (opsiyonel)
        $isMobile             // Mobile sidebar flag
    );
}
```

### PageMeta Component

```vue
<PageMeta
  :title="item.title"
  :description="item.meta_description"
  :keywords="item.seo_keywords"
  :image="item.cover_image"
  type="article"
/>
```

---

## Cache & Store Yapısı

### Vuex Store Modülü

```javascript
// resources/js/Store/Modules/{ModuleName}.js

import axios from 'axios';

const state = () => ({
  items: [],
  sidebarDataLoaded: false,
  sidebarDataLoading: false,
  lastUserId: null,
  scrollPosition: 0,
  filter: 'all',
});

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_SIDEBAR_DATA_LOADED(state, value) {
    state.sidebarDataLoaded = value;
  },
  SET_SIDEBAR_DATA_LOADING(state, value) {
    state.sidebarDataLoading = value;
  },
  SET_LAST_USER_ID(state, userId) {
    state.lastUserId = userId;
  },
  CLEAR_SIDEBAR_CACHE(state) {
    state.items = [];
    state.sidebarDataLoaded = false;
  },
  SET_SCROLL_POSITION(state, position) {
    state.scrollPosition = position;
  },
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
};

const actions = {
  // Sidebar verilerini yükle (user değişikliğini kontrol eder)
  async loadSidebarData({ commit, state }, { forceRefresh = false, currentUserId = null } = {}) {
    const userChanged = currentUserId !== state.lastUserId;
    
    if (userChanged) {
      commit('CLEAR_SIDEBAR_CACHE');
      commit('SET_LAST_USER_ID', currentUserId);
    }
    
    if (state.sidebarDataLoaded && !forceRefresh && !userChanged) {
      return { items: state.items };
    }
    
    if (state.sidebarDataLoading) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (!state.sidebarDataLoading) {
            clearInterval(check);
            resolve({ items: state.items });
          }
        }, 50);
      });
    }
    
    commit('SET_SIDEBAR_DATA_LOADING', true);
    
    try {
      const response = await axios.get('/api/{entities}/sidebar-data');
      if (response.data.success) {
        commit('SET_ITEMS', response.data.items || []);
        commit('SET_SIDEBAR_DATA_LOADED', true);
      }
    } catch (error) {
      console.error('Error loading sidebar data:', error);
    } finally {
      commit('SET_SIDEBAR_DATA_LOADING', false);
    }
    
    return { items: state.items };
  },
  
  // Props'tan gelen veriyi store'a kaydet
  setSidebarDataFromProps({ commit, state }, { items, currentUserId = null }) {
    const userChanged = currentUserId !== state.lastUserId;
    
    if (userChanged) {
      commit('CLEAR_SIDEBAR_CACHE');
      commit('SET_LAST_USER_ID', currentUserId);
    }
    
    if (items && items.length > 0) {
      commit('SET_ITEMS', items);
      commit('SET_SIDEBAR_DATA_LOADED', true);
    }
  },
  
  // Cache'i temizle ve yeniden yükle (CRUD sonrası)
  async invalidateAndReload({ commit, dispatch }, { currentUserId = null } = {}) {
    commit('CLEAR_SIDEBAR_CACHE');
    return dispatch('loadSidebarData', { forceRefresh: true, currentUserId });
  },
  
  setScrollPosition({ commit }, position) {
    commit('SET_SCROLL_POSITION', position);
  },
  
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
};

const getters = {
  items: (state) => state.items,
  sidebarDataLoaded: (state) => state.sidebarDataLoaded,
  sidebarDataLoading: (state) => state.sidebarDataLoading,
  lastUserId: (state) => state.lastUserId,
  scrollPosition: (state) => state.scrollPosition,
  filter: (state) => state.filter,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
```

### Store'u index.js'e Ekle

```javascript
// resources/js/Store/index.js

import { createStore } from 'vuex';
import {ModuleName} from './Modules/{ModuleName}';

export default createStore({
  modules: {
    {ModuleName},
    // ... diğer modüller
  },
});
```

---

## Performans Optimizasyonları

### 1. Two-Phase Loading

```
Kullanıcı linke tıklar
    ↓
Phase 1: Anında (< 100ms)
    - Sayfa açılır
    - SEO/title güncellenir
    - Header bilgileri görünür
    - Skeleton gösterilir
    ↓
Phase 2: Lazy Load (async)
    - İçerik API'den çekilir
    - Skeleton → Gerçek içerik
```

### 2. Sidebar Cache Stratejisi

```
İlk Ziyaret (/writes)
    ↓
Props'tan sidebar verisi gelir
    ↓
Store'a kaydedilir (cache)
    ↓
Sonraki Navigasyonlar (/writes/yazi-1, /writes/yazi-2)
    ↓
Store'dan veri kullanılır (API çağrısı YOK)
    ↓
Cache Invalidation Durumları:
    - Login/Logout (user değişimi)
    - CRUD işlemleri (success flash message)
```

### 3. KeepAlive ile Sidebar Korunması

```vue
<KeepAlive :max="5" :include="['SidebarLayout{Entity}']">
  <component :is="sidebarComponent" :key="screenName" />
</KeepAlive>
```

### 4. Layout Shift Önleme

```vue
<!-- YANLIŞ: Border farkı layout shift yapar -->
<div :class="isActive ? 'bg-primary' : 'border border-border bg-card'">

<!-- DOĞRU: Border her zaman var, sadece renk değişir -->
<div class="border border-transparent" :class="isActive ? 'bg-primary' : 'border-border bg-card'">
```

---

## Tasarım Sistemi

### CSS Variables (Shadcn UI)

```css
/* Renkler */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring

/* Kullanım */
bg-background text-foreground
bg-card text-card-foreground
bg-primary text-primary-foreground
bg-muted text-muted-foreground
border-border
```

### Skeleton Loading

```vue
<div class="skeleton h-4 w-full rounded-md"></div>

<style>
.skeleton {
  @apply bg-muted;
  background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style>
```

### Form Tasarımı (Create/Edit)

```vue
<div class="mx-auto max-w-2xl p-6">
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-foreground">Başlık</h1>
    <p class="text-sm text-muted-foreground">Açıklama</p>
  </div>
  
  <form @submit.prevent="submit" class="space-y-6">
    <div class="space-y-2">
      <label class="text-sm font-medium text-foreground">Label</label>
      <input 
        v-model="form.field"
        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      <p v-if="form.errors.field" class="text-sm text-destructive">
        {{ form.errors.field }}
      </p>
    </div>
    
    <button 
      type="submit"
      class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      :disabled="form.processing"
    >
      Kaydet
    </button>
  </form>
</div>
```

---

## Checklist: Yeni Modül Oluştururken

### Backend
- [ ] Model oluştur (`app/Models/{ModuleName}/{Entity}.php`)
- [ ] Migration oluştur
- [ ] Service oluştur (`app/Services/{ModuleName}/{Entity}Service.php`)
- [ ] Controller oluştur (`app/Http/Controllers/{ModuleName}/{Entity}Controller.php`)
- [ ] Route'ları tanımla (resource + API endpoints)
- [ ] `getBasicBySlug` metodu ekle (SEO için)
- [ ] `getScreenData` metodu ekle (SeoService entegrasyonu)
- [ ] Cache stratejisi uygula (public veriler için)

### Frontend
- [ ] Dosya yapısını oluştur (`Pages/{ModuleName}/...`)
- [ ] Vuex store modülü oluştur
- [ ] Layout component oluştur (sidebar + content)
- [ ] Wrapper componentler oluştur (Index, Show, Create, Edit)
- [ ] Screen componentler oluştur
- [ ] Lazy loading implement et (content API)
- [ ] Sidebar cache entegrasyonu yap
- [ ] KeepAlive ekle (sidebar için)
- [ ] Skeleton loading ekle
- [ ] PageMeta component ekle (SEO)

### Cache Invalidation
- [ ] Login/logout durumunda cache temizle
- [ ] CRUD işlemlerinden sonra cache yenile
- [ ] Router success event listener ekle

---

## Referans Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `app/Http/Controllers/WritesCategories/WritesController.php` | Controller örneği |
| `app/Services/WritesCategories/WriteService.php` | Service örneği |
| `resources/js/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue` | Layout örneği |
| `resources/js/Pages/WritesCategories/Writes/Show/Screen.vue` | Show screen örneği |
| `resources/js/Store/Modules/Writes.js` | Store örneği |
| `app/Services/SeoService.php` | SEO service |
