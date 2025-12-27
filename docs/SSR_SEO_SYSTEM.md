# SSR/SEO Veri Sistemi Dokümantasyonu

Bu dokümantasyon, multi-tenancy destekli SSR (Server-Side Rendering) ve SEO veri sistemini açıklar.

## Genel Bakış

Sistem, tüm sayfalarda tutarlı SEO verilerini (title, description, logo) sağlamak için tasarlanmıştır. Tüm veriler merkezi `SeoService` üzerinden yönetilir.

## Mimari

### 1. SeoService (Merkezi Veri Yönetimi)

**Dosya:** `app/Services/SeoService.php`

Tüm SEO verilerini tek bir yerden yönetir:

```php
class SeoService
{
    // Request-scope cache - aynı request'te tekrar sorgu atmaz
    private static ?array $cachedData = null;
    
    // Laravel cache ile DB sorgularını minimize et
    public function getGlobalSeo(): array
    {
        return Cache::remember('seo_data_global', 300, function () {
            $seo = Seo::first();
            $logo = WriteImage::where('category', 'logo')->first();
            return [
                'siteName' => $seo->title ?? config('app.name'),
                'siteDescription' => $seo->description ?? '',
                'logo' => $logo->image_path ?? '/images/checkup_codes_logo.png',
            ];
        });
    }

    // Sayfa bazlı SEO verisi
    public function getScreenSeo(
        string $screenName,
        ?string $pageTitle = null,
        ?string $pageDescription = null,
        bool $isMobileSidebar = false
    ): array {
        $global = $this->getGlobalSeo();
        return [
            'name' => $screenName,
            'isMobileSidebar' => $isMobileSidebar,
            'seo' => [
                'title' => $pageTitle 
                    ? "{$pageTitle} | {$global['siteName']}" 
                    : $global['siteName'],
                'pageTitle' => $pageTitle,
                'siteName' => $global['siteName'],
                'description' => $pageDescription ?? $global['siteDescription'],
                'logo' => $global['logo'],
            ],
        ];
    }
}
```

**Avantajları:**
- DRY: Tek bir yerde tanımlı, tüm controller'lar kullanır
- Performans: Request-scope + Laravel cache ile minimum DB sorgusu
- SEO: Sayfa bazlı title desteği ("PageTitle | SiteName" formatı)
- Multi-tenancy: Tenant context eklemek için hazır yapı

### 2. Global Veri Katmanı (HandleInertiaRequests Middleware)

**Dosya:** `app/Http/Middleware/HandleInertiaRequests.php`

Tüm Inertia sayfalarına otomatik olarak `app.seo` verisi sağlar:

```php
private function getAppData(): array
{
    $seoService = app(SeoService::class);
    $globalSeo = $seoService->getGlobalSeo();

    return [
        'name' => config('app.name'),
        'seo' => [
            'title' => $globalSeo['siteName'],
            'siteName' => $globalSeo['siteName'],
            'description' => $globalSeo['siteDescription'],
            'logo' => $globalSeo['logo'],
        ],
    ];
}
```

### 3. Controller Trait (HasScreenData)

**Dosya:** `app/Http/Controllers/Traits/HasScreenData.php`

Controller'larda tekrar kullanılabilir screen data metodu:

```php
trait HasScreenData
{
    protected function getScreenData(
        string $screenName,
        ?string $pageTitle = null,
        ?string $pageDescription = null,
        bool $isMobileSidebar = false
    ): array {
        return app(SeoService::class)->getScreenSeo(
            $screenName,
            $pageTitle,
            $pageDescription,
            $isMobileSidebar
        );
    }
}
```

### 4. Frontend Computed Properties (HeaderLayout)

**Dosya:** `resources/js/Layouts/MainLayout/HeaderLayout.vue`

Fallback zinciri ile SEO verilerini alır:

```javascript
const seoTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Check-up Codes'
  );
});

const logoPath = computed(() => {
  return (
    page.props?.screen?.seo?.logo ||
    page.props?.seo?.logo ||
    page.props?.app?.seo?.logo ||
    '/images/checkup_codes_logo.png'
  );
});
```

## SEO Title Formatı

Sistem sayfa bazlı title desteği sağlar:

| Durum | Sonuç |
|-------|-------|
| `pageTitle` verilmişse | `"Yolculuk | Check-up Codes"` |
| `pageTitle` verilmemişse | `"Check-up Codes"` |

Bu format Google'ın önerdiği SEO best practice'lerine uygundur.

## Controller Kullanımı

### Trait Kullanan Controller'lar

```php
use App\Http\Controllers\Traits\HasScreenData;

class JourneyController extends Controller
{
    use HasScreenData;

    public function index()
    {
        return Inertia::render('Journey/IndexJourney', [
            'entries' => $entries,
            // pageTitle: "Yolculuk", isMobileSidebar: true
            'screen' => $this->getScreenData('journey', 'Yolculuk', null, true),
        ]);
    }

    public function show($id)
    {
        $entry = Journey::findOrFail($id);
        return Inertia::render('Journey/ShowJourney', [
            'entry' => $entry,
            // Dinamik title: entry başlığı
            'screen' => $this->getScreenData('journey', $entry->title),
        ]);
    }
}
```

### Özel getScreenData Metodu Olan Controller/Service'ler

```php
private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
{
    return app(\App\Services\SeoService::class)->getScreenSeo(
        'words',
        $pageTitle,
        null,
        $isMobile
    );
}
```

## Veri Akışı

```
┌─────────────────────────────────────────────────────────────────┐
│                        Veritabanı                               │
│  ┌─────────────┐    ┌──────────────────────────────────────┐   │
│  │  seo table  │    │  write_images (category='logo')      │   │
│  │  - title    │    │  - image_path                        │   │
│  │  - desc     │    │                                      │   │
│  └─────────────┘    └──────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SeoService (Merkezi)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  - Request-scope cache (static $cachedData)             │   │
│  │  - Laravel cache (5 dakika TTL)                         │   │
│  │  - getGlobalSeo(): siteName, siteDescription, logo      │   │
│  │  - getScreenSeo(): sayfa bazlı title + global data      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  HandleInertiaRequests  │     │  Controller/Service     │
│  → app.seo (global)     │     │  → screen.seo (sayfa)   │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (Vue.js)                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  HeaderLayout.vue - Fallback zinciri:                    │   │
│  │  1. page.props.screen.seo.title (sayfa bazlı)           │   │
│  │  2. page.props.app.seo.title (global fallback)          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Cache Yönetimi

### Cache Temizleme

SEO verileri güncellendiğinde cache temizlenmeli:

```php
// SeoController veya admin panelinde
$seoService = app(SeoService::class);
$seoService->clearCache();
```

### Cache Süresi

- Laravel cache: 5 dakika (production'da artırılabilir)
- Request-scope cache: Request sonunda otomatik temizlenir

## Multi-Tenancy Desteği

`SeoService` multi-tenancy için hazır yapıya sahip:

```php
private function getCacheKey(): string
{
    // TODO: Multi-tenancy için tenant context ekle
    // $tenantId = app('tenant')->id ?? 'default';
    // return "seo_data_{$tenantId}";
    
    return 'seo_data_global';
}
```

## Mevcut Durum

| Modül | Controller/Service | Durum |
|-------|-------------------|-------|
| Index (Ana Sayfa) | IndexController | ✅ SeoService |
| Dashboard | DashboardController | ✅ SeoService |
| Journey | JourneyController | ✅ HasScreenData trait |
| Workspace | WorkspaceController | ✅ HasScreenData trait |
| Bookmarks | BookmarkController | ✅ HasScreenData trait |
| Services | ServicesController | ✅ HasScreenData trait |
| Projects | ProjectsController | ✅ HasScreenData trait |
| Customers | CustomersController | ✅ HasScreenData trait |
| Words | WordController | ✅ SeoService |
| Versions | VersionsController | ✅ SeoService |
| Tests | TestService | ✅ SeoService |
| Test Categories | TestCategoryService | ✅ SeoService |
| Writes | WriteService | ✅ SeoService |
| Media | MediaController | ✅ SeoService |
| Social Media | SocialMediaController | ✅ SeoService |
| Global | HandleInertiaRequests | ✅ SeoService |

## Yeni Controller Ekleme

### Seçenek 1: Trait Kullanımı (Önerilen)

```php
use App\Http\Controllers\Traits\HasScreenData;

class YeniController extends Controller
{
    use HasScreenData;

    public function index()
    {
        return Inertia::render('Yeni/Index', [
            'data' => $data,
            'screen' => $this->getScreenData('yeni-sayfa', 'Sayfa Başlığı', null, true),
        ]);
    }
}
```

### Seçenek 2: Doğrudan SeoService Kullanımı

```php
public function index()
{
    return Inertia::render('Yeni/Index', [
        'data' => $data,
        'screen' => app(\App\Services\SeoService::class)->getScreenSeo(
            'yeni-sayfa',
            'Sayfa Başlığı',
            null,
            true
        ),
    ]);
}
```

## Screen Data Yapısı

```typescript
interface ScreenData {
  name: string;           // Sayfa adı (örn: 'journey', 'workspace')
  isMobileSidebar: boolean; // Mobil sidebar gösterilsin mi
  seo: {
    title: string;        // Full title: "PageTitle | SiteName" veya "SiteName"
    pageTitle: string;    // Sadece sayfa başlığı (opsiyonel)
    siteName: string;     // Site adı
    description: string;  // Meta description
    logo: string;         // Logo URL'i
  };
}
```

## Sorun Giderme

### Logo veya Title Yanlış Görünüyor

1. Controller'da `screen` prop'unun gönderildiğinden emin olun
2. `SeoService` cache'ini temizleyin: `app(SeoService::class)->clearCache()`
3. Veritabanında `seo` tablosunda kayıt olduğunu doğrulayın

### Sayfa Yenilendiğinde Veriler Değişiyor

Controller'da `screen` prop'u eksik olabilir. Middleware'den gelen `app.seo` kullanılıyor demektir.

### Performans Sorunları

1. Cache TTL'i artırın (production için 1 saat önerilir)
2. Request-scope cache'in çalıştığını doğrulayın
