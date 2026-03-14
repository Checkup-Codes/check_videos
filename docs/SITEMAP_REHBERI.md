# Sitemap Sistemi Rehberi

## Genel Bakış

Sitemap sistemi, Google ve diğer arama motorlarının sitenizi daha iyi taraması için domain-bazlı (multi-tenant) bir yapıya sahiptir. Her domain için ayrı sitemap dosyası oluşturulur.

## Domain-Bazlı Sitemap Yapısı

### Dosya İsimlendirme

Sistem, her domain için otomatik olarak ayrı sitemap dosyası oluşturur:

- **localhost**: `sitemap.xml`
- **checkupcodes.com**: `sitemap_checkupcodes_com.xml`
- **elselif.com**: `sitemap_elselif_com.xml`

### Sitemap URL'leri

Her domain kendi sitemap'ine erişir:

```
https://checkupcodes.com/sitemap.xml → sitemap_checkupcodes_com.xml dosyasını gösterir
https://elselif.com/sitemap.xml → sitemap_elselif_com.xml dosyasını gösterir
http://localhost:8000/sitemap.xml → sitemap.xml dosyasını gösterir
```

## Sitemap İçeriği

### Öncelik Sıralaması (Priority)

Sitelinks için optimize edilmiş öncelik değerleri:

1. **Ana Sayfa** (1.0)
   - `/` - En yüksek öncelik

2. **Ana Bölümler** (0.9) - Sitelinks için kritik!
   - `/writes` - Yazılar
   - `/tests` - Testler
   - `/certificates` - Sertifikalar
   - `/categories` - Kategoriler (0.8)
   - `/workspaces` - Çalışma Alanları (0.8)

3. **Kategori Sayfaları** (0.7)
   - `/categories/{slug}`

4. **Test Sayfaları** (0.7)
   - `/tests/{slug}`

5. **Yazı Sayfaları** (0.6)
   - `/writes/{slug}`

6. **Sertifika Sayfaları** (0.6)
   - `/certificates/{slug}`

7. **Çalışma Alanı Sayfaları** (0.5)
   - `/workspaces/{slug}`

### Güncelleme Sıklığı (Change Frequency)

- Ana sayfa ve ana bölümler: `daily`
- Kategoriler: `weekly`
- Yazılar, testler: `monthly`
- Sertifikalar: `yearly`
- Çalışma alanları: `monthly`

## Sitemap Oluşturma

### Manuel Oluşturma

Tüm domainler için sitemap oluştur:
```bash
php artisan sitemap:generate
```

Belirli bir domain için:
```bash
php artisan sitemap:generate --domain=checkupcodes.com
```

Birden fazla domain için:
```bash
php artisan sitemap:generate --domain=checkupcodes.com --domain=elselif.com
```

### Otomatik Oluşturma

Sistem her gün otomatik olarak tüm domainler için sitemap oluşturur (cron job ile).

Cron job ayarı (`app/Console/Kernel.php`):
```php
$schedule->command('sitemap:generate')->daily();
```

## Robots.txt Entegrasyonu

Her domain için robots.txt otomatik olarak doğru sitemap'i gösterir:

**checkupcodes.com için:**
```
User-agent: *
Allow: /

Sitemap: https://checkupcodes.com/sitemap_checkupcodes_com.xml

# Disallow admin and private routes
Disallow: /admin/
Disallow: /private/
Disallow: /api/
```

**elselif.com için:**
```
User-agent: *
Allow: /

Sitemap: https://elselif.com/sitemap_elselif_com.xml

# Disallow admin and private routes
Disallow: /admin/
Disallow: /private/
Disallow: /api/
```

## Google Search Console Kurulumu

### 1. Her Domain İçin Ayrı Kayıt

Her domain için ayrı Google Search Console kaydı yapın:

1. [Google Search Console](https://search.google.com/search-console)'a gidin
2. "Özellik Ekle" butonuna tıklayın
3. Domain'i girin (örn: checkupcodes.com)
4. Doğrulama yöntemini seçin (DNS veya HTML dosyası)
5. Doğrulamayı tamamlayın

### 2. Sitemap Gönderimi

Her domain için sitemap'i gönderin:

1. Google Search Console'da domain'i seçin
2. Sol menüden "Sitemaps" seçeneğine tıklayın
3. Sitemap URL'ini girin:
   - checkupcodes.com için: `sitemap_checkupcodes_com.xml`
   - elselif.com için: `sitemap_elselif_com.xml`
4. "Gönder" butonuna tıklayın

### 3. İndeksleme Takibi

- "Kapsam" bölümünden kaç sayfanın indekslendiğini takip edin
- "Performans" bölümünden arama performansını izleyin
- Hataları düzenli olarak kontrol edin

## Teknik Detaylar

### Dosya Konumları

- **Service**: `app/Services/SitemapGenerator.php`
- **Controller**: `app/Http/Controllers/SitemapController.php`
- **Command**: `app/Console/Commands/GenerateSitemap.php`
- **Robots Controller**: `app/Http/Controllers/RobotsController.php`
- **Config**: `config/app.php` (domains listesi)
- **Sitemap Dosyaları**: `public/sitemap_*.xml`

### Domain Tespiti

Sistem, domain'i şu şekilde tespit eder:

```php
$domain = request()->getHost();
```

### Sitemap Dosya Adı Oluşturma

```php
// Sanitize domain for filename
$safeDomain = str_replace(['.', ':'], '_', $domain);

// For localhost or default, use sitemap.xml
if (in_array($domain, ['localhost', '127.0.0.1', '::1'])) {
    return 'sitemap.xml';
}

// For production domains, use domain-specific filename
return "sitemap_{$safeDomain}.xml";
```

## Yeni Domain Ekleme

Yeni bir domain eklemek için:

1. `config/app.php` dosyasındaki `domains` dizisine ekleyin:
```php
'domains' => [
    'checkupcodes.com',
    'elselif.com',
    'yenidomain.com', // Yeni domain
    'localhost',
],
```

2. Sitemap'i oluşturun:
```bash
php artisan sitemap:generate --domain=yenidomain.com
```

3. Google Search Console'a ekleyin ve sitemap'i gönderin

## Sitelinks İçin Optimizasyon

Sitemap, Google Sitelinks için optimize edilmiştir:

1. **Ana bölümler yüksek önceliğe sahip** (0.9)
2. **Günlük güncelleme sıklığı** (daily)
3. **Temiz URL yapısı** (`/writes`, `/tests`, vb.)
4. **Tutarlı site yapısı**

Bu ayarlar, Google'ın sitenizin yapısını anlamasını ve Sitelinks oluşturmasını kolaylaştırır.

## Sorun Giderme

### Sitemap Oluşturulmuyor

1. Dosya izinlerini kontrol edin:
```bash
chmod 755 public/
```

2. Manuel olarak oluşturmayı deneyin:
```bash
php artisan sitemap:generate
```

3. Log dosyalarını kontrol edin:
```bash
tail -f storage/logs/laravel.log
```

### Sitemap Boş

1. Veritabanında içerik olduğundan emin olun
2. Model ilişkilerini kontrol edin
3. `status` alanlarının `published` olduğunu kontrol edin

### Google Sitemap'i Okuyamıyor

1. Sitemap dosyasının public klasöründe olduğunu kontrol edin
2. Dosya izinlerini kontrol edin
3. XML formatının geçerli olduğunu kontrol edin: [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
4. robots.txt'nin doğru sitemap'i gösterdiğini kontrol edin

## İlgili Belgeler

- [SEO Kullanım Kılavuzu](./SEO_KULLANIM_KILAVUZU.md)
- [Sitelinks Rehberi](./SITELINKS_REHBERI.md)
- [Multi-Tenant SEO](./MULTI_TENANT_SEO.md)
- [Structured Data SEO](./STRUCTURED_DATA_SEO.md)
