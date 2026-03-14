# Logo ve Favicon Sistemi

## Genel Bakış

SEO ayarları üzerinden yönetilen, sitenin her yerinde dinamik olarak kullanılan logo ve simge sistemi.

## Özellikler

### 1. Merkezi Yönetim
- Tüm logo ve simgeler `/seo` sayfasından yönetilir
- Domain-bazlı: Her domain kendi logosunu ayarlayabilir
- Tek yerden güncelleme, her yerde otomatik değişim

### 2. Desteklenen Görseller

#### Site Logosu
- **Kullanım**: Navbar, footer, tüm sayfalarda
- **Format**: PNG, SVG, JPG, WebP
- **Önerilen Boyut**: 200x60 piksel (genişlik x yükseklik)
- **Özellikler**: 
  - Şeffaf arka plan önerilir
  - SVG formatı ölçeklenebilir olduğu için tercih edilir
  - Maksimum dosya boyutu: 2MB

#### Favicon (Tarayıcı Simgesi)
- **Kullanım**: Tarayıcı sekmesi, bookmark'lar
- **Format**: ICO, PNG, SVG
- **Önerilen Boyut**: 32x32 veya 64x64 piksel
- **Özellikler**:
  - Basit, tanınabilir olmalı
  - Küçük boyutta net görünmeli
  - Maksimum dosya boyutu: 512KB

#### Apple Touch Icon
- **Kullanım**: iPhone/iPad ana ekran kısayolu
- **Format**: PNG
- **Önerilen Boyut**: 180x180 piksel
- **Özellikler**:
  - Köşeler iOS tarafından otomatik yuvarlanır
  - Renkli ve dikkat çekici olmalı
  - Maksimum dosya boyutu: 512KB

## Kullanım

### SEO Sayfasından Yükleme

1. `/seo` sayfasına gidin
2. "Logo ve Simgeler" bölümünü bulun
3. İlgili görseli yükleyin veya URL girin
4. "Kaydet" butonuna tıklayın

### Dosya Yükleme

```
Logo Yükle → Dosya seç → Otomatik yüklenir → Kaydet
```

### URL ile Ekleme

```
/storage/logo.png → Manuel giriş → Kaydet
```

## Teknik Detaylar

### Veritabanı

**Tablo**: `util_seos`

**Kolonlar**:
- `logo` - Site logosu yolu
- `favicon` - Favicon yolu
- `apple_touch_icon` - Apple Touch Icon yolu
- `domain` - Domain (multi-tenancy)

### Dosya Konumları

**Yüklenen Dosyalar**: `storage/app/public/seo/`

**Public Erişim**: `/storage/seo/`

### API Endpoints

```php
POST /seo/logo              // Logo yükle
POST /seo/favicon           // Favicon yükle
POST /seo/apple-touch-icon  // Apple Touch Icon yükle
PUT  /seo                   // Tüm SEO ayarlarını güncelle
```

### Frontend Kullanımı

Logo, SeoService üzerinden tüm sayfalara otomatik olarak aktarılır:

```javascript
// Inertia props üzerinden erişim
const { logo } = usePage().props.screen.seo;

// Template'te kullanım
<img :src="logo" alt="Site Logo" />
```

### Backend Kullanımı

```php
// SeoService üzerinden erişim
$seoService = app(\App\Services\SeoService::class);
$globalSeo = $seoService->getGlobalSeo();
$logo = $globalSeo['logo'];

// Blade template'te
{{ $meta['logo'] }}
```

## Domain-Bazlı Çalışma

Her domain kendi logosunu ayarlayabilir:

```
checkupcodes.com → /storage/seo/checkupcodes_logo.png
elselif.com      → /storage/seo/elselif_logo.png
localhost        → /images/checkup_codes_logo.png (varsayılan)
```

## Cache Yönetimi

Logo değiştirildiğinde cache otomatik olarak temizlenir:

```php
app(SeoService::class)->clearCache();
```

Manuel cache temizleme:

```bash
php artisan cache:clear
```

## Fallback Sistemi

Logo bulunamazsa sırasıyla şu yollar denenir:

1. SEO tablosundaki `logo` alanı
2. WriteImage tablosundaki logo kategorisi
3. Varsayılan logo: `/images/checkup_codes_logo.png`

## Örnek Kullanım Senaryoları

### Senaryo 1: Yeni Logo Yükleme

1. Kullanıcı `/seo` sayfasına gider
2. "Logo Yükle" butonuna tıklar
3. `logo.png` dosyasını seçer
4. Dosya `/storage/seo/` klasörüne yüklenir
5. Veritabanında `logo` alanı güncellenir
6. Cache temizlenir
7. Tüm sayfalarda yeni logo görünür

### Senaryo 2: Domain Değiştirme

```
checkupcodes.com → Logo A
elselif.com      → Logo B
```

Kullanıcı domain değiştirdiğinde otomatik olarak o domain'e ait logo gösterilir.

### Senaryo 3: Logo Güncelleme

1. Kullanıcı mevcut logoyu siler (X butonuna tıklar)
2. Yeni logo yükler
3. Eski logo dosyası kalır (manuel silinebilir)
4. Yeni logo tüm sayfalarda görünür

## Güvenlik

### Dosya Validasyonu

```php
'logo' => 'required|image|mimes:jpg,jpeg,png,svg,webp|max:2048'
'favicon' => 'required|image|mimes:ico,png,svg|max:512'
'apple_touch_icon' => 'required|image|mimes:png|max:512'
```

### CSRF Koruması

Tüm upload işlemleri CSRF token ile korunur.

### Dosya Boyutu Limitleri

- Logo: 2MB
- Favicon: 512KB
- Apple Touch Icon: 512KB

## Performans

### Cache Stratejisi

- SEO verileri 5 dakika cache'lenir
- Request-scope cache ile aynı request'te tekrar sorgu atılmaz
- Domain-bazlı cache key'ler

### Optimizasyon Önerileri

1. SVG formatı kullanın (ölçeklenebilir, küçük dosya boyutu)
2. Görselleri optimize edin (TinyPNG, ImageOptim)
3. WebP formatı kullanın (modern tarayıcılar için)
4. CDN kullanın (production ortamında)

## Sorun Giderme

### Logo Görünmüyor

1. Cache'i temizleyin: `php artisan cache:clear`
2. Dosya yolunu kontrol edin: `/storage/seo/` klasörü var mı?
3. Dosya izinlerini kontrol edin: `chmod 755 storage/`
4. Symbolic link'i kontrol edin: `php artisan storage:link`

### Yükleme Başarısız

1. Dosya boyutunu kontrol edin (max 2MB)
2. Dosya formatını kontrol edin (PNG, SVG, JPG, WebP)
3. PHP upload limitlerini kontrol edin (`upload_max_filesize`, `post_max_size`)
4. Storage klasörü yazılabilir mi kontrol edin

### Domain'e Göre Logo Değişmiyor

1. Domain tespitini kontrol edin: `request()->getHost()`
2. Veritabanında domain kaydı var mı kontrol edin
3. Cache'i temizleyin

## İlgili Dosyalar

- `app/Models/Seo.php` - SEO model
- `app/Services/SeoService.php` - SEO service (logo getirme)
- `app/Http/Controllers/SeoController.php` - Upload işlemleri
- `resources/js/Pages/Seo/Edit.vue` - SEO ayarları sayfası
- `resources/views/app.blade.php` - Favicon render
- `database/migrations/2026_03_15_120000_add_logo_to_seos_table.php` - Logo migration

## İlgili Belgeler

- [SEO Kullanım Kılavuzu](./SEO_KULLANIM_KILAVUZU.md)
- [SEO Doldurma Kılavuzu](./SEO_DOLDURMA_KILAVUZU.md)
- [Multi-Tenant SEO](./MULTI_TENANT_SEO.md)
- [Structured Data SEO](./STRUCTURED_DATA_SEO.md)
