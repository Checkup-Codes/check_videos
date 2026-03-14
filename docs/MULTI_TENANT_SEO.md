# Multi-Tenant SEO Sistemi

## 🎯 Genel Bakış

Sistem artık **domain-based multi-tenancy** destekliyor. Her domain (checkupcodes.com, elselif.com) kendi SEO ayarlarını bağımsız olarak yönetebilir.

## ✅ Özellikler

### 1. Domain Bazlı SEO Yönetimi

Her domain için ayrı:
- ✅ Site adı ve slogan
- ✅ Meta açıklamaları
- ✅ Logo ve favicon
- ✅ Open Graph görselleri
- ✅ Twitter Card ayarları
- ✅ Google Analytics ID
- ✅ Google Search Console doğrulama kodları
- ✅ Structured Data (Schema.org)

### 2. Otomatik Domain Algılama

Sistem otomatik olarak:
- Request'ten domain'i algılar (`request()->getHost()`)
- İlgili domain'in SEO ayarlarını yükler
- Cache'i domain bazlı yönetir
- Fallback olarak default domain kullanır

### 3. Veritabanı Yapısı

```sql
util_seos
├── id (UUID)
├── domain (VARCHAR) - checkupcodes.com, elselif.com, vb.
├── route (VARCHAR)
├── site_name
├── title
├── description
├── ... (diğer SEO alanları)
└── UNIQUE KEY (domain, route)
```

## 🚀 Kullanım

### Yönetici Olarak

#### 1. checkupcodes.com için SEO Ayarları

```
1. https://checkupcodes.com/seo adresine gidin
2. Site bilgilerinizi doldurun:
   - Site Adı: "Check-up Codes"
   - Slogan: "Yazılım Geliştirme Blogu"
   - Açıklama: "Yazılım dünyasında size yardımcı olacak içerikler"
3. Logo ve favicon yükleyin
4. Google Analytics ID: G-CHECKUPCODES123
5. Kaydet
```

#### 2. elselif.com için SEO Ayarları

```
1. https://elselif.com/seo adresine gidin
2. Site bilgilerinizi doldurun:
   - Site Adı: "Elselif"
   - Slogan: "Zengin İçerik, Kategorize edilmiş"
   - Açıklama: "Modern tasarım ile detaylı içerikler"
3. Logo ve favicon yükleyin
4. Google Analytics ID: G-ELSELIF456
5. Kaydet
```

### Otomatik Çalışma

Sistem otomatik olarak:

**checkupcodes.com'da:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Check-up Codes",
  "url": "https://checkupcodes.com",
  ...
}
```

**elselif.com'da:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Elselif",
  "url": "https://elselif.com",
  ...
}
```

## 📊 Google Arama Sonuçları

### checkupcodes.com

Google'da "checkupcodes" araması:
```
checkupcodes.com
├── Yazılar
│   ├── Laravel ile API Geliştirme
│   ├── Vue.js 3 Composition API
│   └── ...
├── Testler
│   ├── JavaScript Quiz
│   └── ...
└── Sertifikalar
    └── ...
```

### elselif.com

Google'da "elselif" araması:
```
elselif.com
├── Yazılar
│   ├── DEEPSEEK ile Verimlilik
│   └── ...
├── Çalışma Alanları
│   └── ...
└── Kategoriler
    └── ...
```

## 🔧 Teknik Detaylar

### Backend

**SeoService.php**
```php
// Domain'e göre cache key
private function getCacheKey(): string
{
    $domain = request()->getHost();
    return "seo_data_{$domain}";
}

// Domain'e göre SEO verisi
$seo = Seo::where('domain', $domain)->first();
```

**SeoController.php**
```php
public function edit()
{
    $domain = request()->getHost();
    $seo = Seo::where('domain', $domain)->first();
    
    return Inertia::render('Seo/Edit', [
        'seo' => $seo,
        'currentDomain' => $domain,
    ]);
}
```

### Frontend

**Seo/Edit.vue**
```vue
<div class="inline-flex items-center gap-2">
  <svg>...</svg>
  <span>Domain: {{ currentDomain }}</span>
</div>
```

### Cache Yönetimi

Her domain için ayrı cache:
```
seo_data_checkupcodes.com
seo_data_elselif.com
seo_data_localhost
```

Cache TTL: 5 dakika (300 saniye)

## 🎨 UX/UI

### Domain Göstergesi

SEO ayarları sayfasında aktif domain gösterilir:
```
┌─────────────────────────────────────┐
│ SEO Ayarları                        │
│ Sitenizin arama motorları için...  │
│                                     │
│ 🌐 Domain: checkupcodes.com        │
└─────────────────────────────────────┘
```

### Bağımsız Yönetim

Her domain:
- Kendi SEO ayarlarını görür
- Kendi ayarlarını düzenler
- Diğer domain'lerin ayarlarını görmez/etkilemez

## 🔄 Migration

### Mevcut Veriler

Migration çalıştırıldığında:
1. `domain` kolonu eklenir
2. Mevcut kayıtlar current domain'e atanır
3. Composite unique key oluşturulur (domain + route)

### Yeni Kayıtlar

Yeni SEO kaydı oluşturulurken:
- Domain otomatik olarak eklenir
- Her domain için ayrı kayıt oluşturulur

## 🐛 Sorun Giderme

### SEO Ayarları Görünmüyor

1. Domain'in doğru algılandığını kontrol edin:
```php
dd(request()->getHost());
```

2. Veritabanında kayıt var mı kontrol edin:
```sql
SELECT * FROM util_seos WHERE domain = 'checkupcodes.com';
```

3. Cache'i temizleyin:
```bash
php artisan cache:clear
```

### Yanlış Domain Gösteriliyor

1. `.env` dosyasında `APP_URL` kontrol edin
2. Web server (Nginx/Apache) konfigürasyonunu kontrol edin
3. Reverse proxy (Cloudflare) ayarlarını kontrol edin

### Structured Data Çalışmıyor

1. Sayfa kaynağını kontrol edin
2. Domain'e göre doğru veri geldiğini doğrulayın
3. Google Rich Results Test kullanın

## 📈 Performans

### Cache Stratejisi

- Request-scope cache: Aynı request'te tekrar sorgu atılmaz
- Laravel cache: Domain bazlı 5 dakika TTL
- Cache invalidation: SEO güncellendiğinde otomatik temizlenir

### Database Queries

Optimize edilmiş sorgular:
```php
// ✅ İyi: Domain ile direkt sorgu
Seo::where('domain', $domain)->first();

// ❌ Kötü: Tüm kayıtları çekip filtreleme
Seo::all()->where('domain', $domain)->first();
```

## 🎯 Best Practices

### 1. Domain Yönetimi

- Her production domain için ayrı SEO kaydı oluşturun
- Development/staging için ayrı kayıtlar kullanın
- Wildcard domain kullanmayın

### 2. Cache Yönetimi

- SEO güncellemelerinden sonra cache'i temizleyin
- Production'da cache TTL'i artırın (30 dakika)
- CDN cache'ini de temizlemeyi unutmayın

### 3. Testing

- Her domain için ayrı test edin
- Google Rich Results Test kullanın
- Search Console'da her domain'i ayrı ekleyin

## 🚀 Deployment

### Production Checklist

- [ ] Her domain için SEO kaydı oluşturuldu
- [ ] Logo ve favicon yüklendi
- [ ] Open Graph görselleri eklendi
- [ ] Google Analytics ID'leri eklendi
- [ ] Search Console doğrulama kodları eklendi
- [ ] Sitemap gönderildi
- [ ] Rich Results test edildi
- [ ] Cache TTL optimize edildi

## 📚 İlgili Dokümantasyon

- [STRUCTURED_DATA_SEO.md](./STRUCTURED_DATA_SEO.md) - Structured Data detayları
- [SEO_KULLANIM_KILAVUZU.md](./SEO_KULLANIM_KILAVUZU.md) - Kullanıcı kılavuzu
- [SSR_SEO_SYSTEM.md](./SSR_SEO_SYSTEM.md) - SSR ve SEO sistemi

## 🎉 Sonuç

Artık her tenant (checkupcodes.com, elselif.com) kendi SEO ayarlarını bağımsız olarak yönetebilir!

**Önemli:** Her domain için ayrı Google Search Console property oluşturmayı unutmayın! 🚀
