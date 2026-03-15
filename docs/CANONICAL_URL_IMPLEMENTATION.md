# Canonical URL ve robots.txt Implementasyonu

## ✅ Yapılan Değişiklikler

### 1. Domain Konfigürasyonu (`config/domains.php`)

Yeni dosya oluşturuldu. Her domain için ayarlar:

```php
'checkupcodes.com' => [
    'index_in_google' => true,  // Ana domain, Google'da indexlenecek
],
'yusufdur.com' => [
    'index_in_google' => false, // Park edilmiş, indexlenmeyecek
],
```

### 2. SeoService Güncellemesi

Üç yeni metod eklendi:

- `getCanonicalUrl()` - Canonical URL oluşturur
- `shouldIndexInGoogle()` - Domain indexlenecek mi kontrol eder
- `getDomainConfig()` - Domain ayarlarını getirir

### 3. RobotsController Güncellemesi

Artık domain tipine göre farklı robots.txt döndürür:

- Ana domain: `Allow: /` + sitemap
- Park edilmiş: `Disallow: /` (Google'dan gizle)

### 4. app.blade.php Güncellemesi

Canonical URL meta tag'i eklendi:
```html
<link rel="canonical" href="https://checkupcodes.com/..." />
```



## 🧪 Test Etme

### 1. Canonical URL Testi

**Ana Domain (checkupcodes.com):**
```bash
curl -I http://localhost:8000/writes/test
# Beklenen: <link rel="canonical" href="https://checkupcodes.com/writes/test" />
```

**Park Edilmiş Domain (yusufdur.com):**
```bash
# .env.yusufdur.com dosyası varsa
curl -I http://yusufdur.com/writes/test
# Beklenen: <link rel="canonical" href="https://checkupcodes.com/writes/test" />
```

### 2. robots.txt Testi

**Ana Domain:**
```bash
curl http://localhost:8000/robots.txt
```

Beklenen çıktı:
```
# Main domain - indexed by search engines

User-agent: *
Allow: /

Sitemap: http://localhost:8000/sitemap.xml

# Disallow admin and private routes
Disallow: /admin/
Disallow: /private/
Disallow: /api/
```

**Park Edilmiş Domain:**
```bash
# .env.yusufdur.com ile test et
curl http://yusufdur.com/robots.txt
```

Beklenen çıktı:
```
# This is a parked domain
# Main site: https://checkupcodes.com
# All content uses canonical URLs pointing to main domain

User-agent: *
Disallow: /

# If you want to visit the main site, go to:
# https://checkupcodes.com
```



## 📝 .env Dosyası Ayarları

Her domain için `.env.{domain}` dosyasına ekle:

```env
# .env.checkupcodes.com
MAIN_DOMAIN=checkupcodes.com
APP_NAME="Check-up Codes"

# .env.yusufdur.com
MAIN_DOMAIN=checkupcodes.com
APP_NAME="Yusuf Dur"

# .env.elselif.com
MAIN_DOMAIN=checkupcodes.com
APP_NAME="Else If"
```

## 🚀 Production'a Deploy

### 1. Dosyaları Yükle

```bash
# Git ile
git add config/domains.php
git add app/Services/SeoService.php
git add app/Http/Controllers/RobotsController.php
git add resources/views/app.blade.php
git add docs/

git commit -m "feat: Add canonical URL and domain-aware robots.txt"
git push
```

### 2. Production'da Cache Temizle

```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### 3. Google Search Console

Her domain için:

1. Property ekle (yusufdur.com, elselif.com)
2. Sitemap submit et
3. URL Inspection tool ile canonical URL'leri kontrol et
4. 2-4 hafta bekle, indexleme değişikliklerini izle



## 🎯 Beklenen Sonuçlar

### Hemen (Deploy Sonrası)

- ✅ Tüm sayfalarda canonical URL görünür
- ✅ Park edilmiş domainler robots.txt ile engellenir
- ✅ Ana domain robots.txt'de sitemap görünür

### 1-2 Hafta Sonra

- ✅ Google Search Console'da canonical URL'ler görünür
- ✅ Park edilmiş domainlerin indexlenmesi durur
- ✅ Ana domain'de indexleme stabilize olur

### 2-4 Hafta Sonra

- ✅ Duplicate content uyarıları azalır
- ✅ Ana domain ranking'i iyileşir
- ✅ Organik trafik artmaya başlar

### 2-3 Ay Sonra

- ✅ Ana domain SEO gücü artar
- ✅ Sitelinks görünmeye başlayabilir
- ✅ Domain authority yükselir

## ⚠️ Önemli Notlar

1. **Park edilmiş domainler artık Google'da görünmeyecek**
   - Bu istenen bir durum (duplicate content önleme)
   - Tüm SEO gücü ana domain'e toplanacak

2. **Mevcut indexlenmiş sayfalar**
   - Google zamanla park edilmiş domainleri index'ten çıkaracak
   - Bu 2-4 hafta sürebilir
   - Normal bir süreç

3. **Canonical URL değişikliği**
   - Eğer strateji değiştirirsen (örn: her domain bağımsız)
   - `config/domains.php`'de `index_in_google: true` yap
   - Cache temizle

## 🔄 Geri Alma (Rollback)

Eğer sorun olursa:

```bash
# Git ile eski haline dön
git revert HEAD

# Veya manuel olarak
# config/domains.php dosyasını sil
# SeoService, RobotsController, app.blade.php'yi eski haline getir
```

## 📞 Sonraki Adımlar

1. ✅ Bu implementasyonu test et
2. ✅ Production'a deploy et
3. ✅ Google Search Console'da izle
4. ⏳ 2-3 ay sonra sonuçları değerlendir
5. ⏳ Strateji 2'ye (benzersiz içerik) geçmeyi düşün

