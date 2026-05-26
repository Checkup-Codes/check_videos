# Multi-Tenant Platform Mimarisi

Bu doküman, **Check-up Codes** platformunun multi-tenant mimarisini, env yönetimini, local/prod ayrımını ve SEO sistemini tek referans noktasında açıklar.

---

## 1. Genel Bakış

Platform tek bir Laravel kod tabanı üzerinde çalışır. Her domain (tenant) aynı dosyaları kullanır; ancak **kendi veritabanı**, **kendi env dosyası** ve **kendi storage dizini** ile izole edilir.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Hostinger (tek sunucu)                      │
│                                                                 │
│  checkupcodes.com ──┐                                           │
│  elselif.com      ──┼──► public/index.php                       │
│  yusufdur.com     ──┘         │                                 │
│                               ▼                                 │
│                    bootstrap/app.php                            │
│                    HTTP_HOST → .env.{domain} yükle              │
│                               │                                 │
│              ┌────────────────┼────────────────┐                │
│              ▼                ▼                ▼                │
│         checkupcodes DB   elselif DB      yusufdur DB           │
│         storage/multi/    storage/multi/  storage/multi/        │
│         checkupcodes.com  elselif.com     yusufdur.com          │
└─────────────────────────────────────────────────────────────────┘
```

| Kavram | Açıklama |
|--------|----------|
| **Ana domain** | `checkupcodes.com` — platform sahibi, tüm modüller açık |
| **Tenant domain** | Park edilmiş müşteri domainleri (`elselif.com`, `yusufdur.com` vb.) |
| **Park etme** | Hostinger'da domain, checkupcodes sunucusuna yönlendirilir |
| **Kod paylaşımı** | Tüm domainler aynı `public_html` klasörünü kullanır |
| **Veri izolasyonu** | Domain başına ayrı MySQL DB + storage |

---

## 2. Dizin Yapısı

```
public_html/
├── bootstrap/app.php          # Tenant env seçimi (HTTP_HOST / APP_TENANT)
├── config/
│   ├── domains.php            # Domain listesi, feature flags, SEO ayarları
│   └── tenants/
│       ├── .env.example       # Şablon (git'te kalır)
│       ├── .env.checkupcodes.com   # Prod secrets (git'te YOK)
│       ├── .env.elselif.com        # Prod secrets (git'te YOK)
│       └── .env.{domain}           # Her tenant için bir dosya
├── storage/
│   ├── multi/
│   │   ├── checkupcodes.com/
│   │   │   └── public/        # Bu domain'e özel yüklenen dosyalar
│   │   ├── elselif.com/
│   │   │   └── public/
│   │   └── {domain}/
│   │       └── public/
│   └── app/
│       └── sitemaps/          # Domain bazlı sitemap cache
│           ├── sitemap_checkupcodes_com.xml
│           └── sitemap_elselif_com.xml
├── public/
│   ├── index.php              # Laravel giriş noktası
│   └── .htaccess              # sitemap.xml / robots.txt → Laravel'e yönlendirilir
├── server.php                 # php artisan serve + domain bazlı /storage/
└── app/
    ├── Support/TenantDomain.php       # Domain çözümleme
    ├── Services/SeoService.php        # Merkezi SEO
    ├── Services/SitemapGenerator.php  # Domain bazlı sitemap
    └── Http/Controllers/
        ├── RobotsController.php
        └── SitemapController.php
```

---

## 3. İstek Akışı (Request Lifecycle)

### Web isteği

1. Kullanıcı `https://www.elselif.com/writes/foo` adresine gider
2. Apache `public/index.php` çalıştırır
3. `bootstrap/app.php` host'u okur → `elselif.com` (www. kaldırılır)
4. `config/tenants/.env.elselif.com` yüklenir
5. Laravel, elselif DB'sine bağlanır
6. `config/domains.php` içinden elselif feature/SEO ayarları okunur
7. `/storage/` istekleri `server.php` veya web sunucusu üzerinden `storage/multi/elselif.com/public/` dizinine gider

### CLI (artisan komutları)

```bash
# Belirli tenant için çalıştır
APP_TENANT=elselif.com php artisan migrate

# Belirtilmezse varsayılan: checkupcodes.com
php artisan migrate
```

`bootstrap/app.php` sırası:
1. `APP_TENANT` env değişkeni
2. Yoksa `APP_ENV`
3. Yoksa `.env.checkupcodes.com`

---

## 4. Env Dosyası Mimarisi

### Dosya adlandırma

```
config/tenants/.env.{domain}
```

Örnekler:
- `config/tenants/.env.checkupcodes.com`
- `config/tenants/.env.elselif.com`
- `config/tenants/.env.yusufdur.com`

> **Kök `.env` dosyası kullanılmaz.** Tüm tenant ayarları `config/tenants/` altındadır.

### Her tenant env'de olması gerekenler

```env
APP_NAME="Else If"
APP_KEY=base64:...              # Tüm tenantlar aynı key'i paylaşabilir (session uyumu için)
APP_DEBUG=false                 # Prod'da false, local'de true
APP_URL=https://www.elselif.com # Canonical URL ve sitemap için KRİTİK

DB_DATABASE=u807351145_elselif
DB_USERNAME=u807351145_elselif
DB_PASSWORD=...

SESSION_DOMAIN=.elselif.com     # Cookie'nin hangi domainde geçerli olacağı
SESSION_SECURE_COOKIE=true      # HTTPS zorunlu

VITE_APP_NAME="Else If"
```

### Git stratejisi

`.gitignore` kuralları:

```
.env
.env.*
!config/tenants/.env.example
```

| Dosya | Git'te? |
|-------|---------|
| `config/tenants/.env.example` | ✅ Evet (şablon) |
| `config/tenants/.env.checkupcodes.com` | ❌ Hayır (prod secret) |
| `config/tenants/.env.elselif.com` | ❌ Hayır |
| `storage/multi/` | ❌ Hayır (yüklenen medya) |
| `storage/app/sitemaps/` | ❌ Hayır (runtime cache) |

**Prod → Local geçiş:** Prod env dosyalarını güvenli bir yerde sakla (1Password, Hostinger panel, encrypted backup). Repoyu clone'ladıktan sonra local env dosyalarını manuel oluştur.

---

## 5. Local Geliştirme Kurulumu

### Adım 1: Repoyu clone et

```bash
git clone https://github.com/Checkup-Codes/check_videos.git
cd check_videos
composer install
npm install && npm run build
```

### Adım 2: Local tenant env oluştur

```bash
cp config/tenants/.env.example config/tenants/.env.localhost
```

`config/tenants/.env.localhost` örneği:

```env
APP_NAME="Check-up Codes Local"
APP_ENV=local
APP_KEY=base64:...          # php artisan key:generate çıktısı
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=checkupcodes_local
DB_USERNAME=root
DB_PASSWORD=

SESSION_DOMAIN=localhost
SESSION_SECURE_COOKIE=false

VITE_APP_NAME="Check-up Codes Local"
```

### Adım 3: Veritabanı

```bash
# Local MySQL'de DB oluştur
mysql -u root -e "CREATE DATABASE checkupcodes_local"

APP_TENANT=localhost php artisan migrate --seed
```

### Adım 4: Sunucuyu başlat

```bash
php artisan serve
# veya domain simülasyonu için:
php -S localhost:8000 server.php
```

### Adım 5: Birden fazla tenant'ı local'de test et

`/etc/hosts` dosyasına ekle:

```
127.0.0.1  checkupcodes.test
127.0.0.1  elselif.test
```

Her domain için env oluştur:

```bash
cp config/tenants/.env.example config/tenants/.env.checkupcodes.test
cp config/tenants/.env.example config/tenants/.env.elselif.test
```

Her birinde farklı `APP_URL`, `DB_DATABASE`, `SESSION_DOMAIN` ayarla.

Valet veya nginx ile virtual host kurulumu da yapılabilir; kritik nokta **HTTP_HOST'un env dosya adıyla eşleşmesi**.

### Local'de tenant değiştirerek CLI çalıştırma

```bash
APP_TENANT=elselif.com php artisan migrate
APP_TENANT=elselif.com php artisan db:seed
APP_TENANT=checkupcodes.com php artisan tinker
```

---

## 6. Production (Hostinger) Kurulumu

### Domain park etme

1. Müşteri domainini Hostinger'da satın al / yönet
2. DNS'i checkupcodes sunucusuna yönlendir (park domain)
3. Tüm domainler aynı `public_html` klasörüne işaret eder

### Yeni tenant ekleme (prod)

```bash
php artisan tenant:setup yeni-musteri.com \
  --db-name=u807351145_yeni \
  --db-user=u807351145_yeni \
  --db-pass='SIFRE'
```

Bu komut otomatik olarak:
1. `config/tenants/.env.yeni-musteri.com` oluşturur
2. MySQL veritabanı oluşturur
3. Migration + seed çalıştırır
4. `storage/multi/yeni-musteri.com/public/` dizinini oluşturur
5. `config/domains.php` dosyasına domain ekler

### Prod deploy checklist

```bash
git pull
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Eski statik sitemap varsa sil (Laravel üretmeli)
rm -f public/sitemap.xml public/sitemap_*.xml

# Tüm tenant sitemap'lerini üret
php artisan sitemap:generate
```

### Cron (Hostinger)

```bash
# Her gece 03:00 — tüm tenant sitemap'leri
0 3 * * * cd /home/u807351145/domains/checkupcodes.com/public_html && php artisan sitemap:generate
```

---

## 7. Ana Domain vs Tenant Domain

### checkupcodes.com (Ana Domain)

| Özellik | Değer |
|---------|-------|
| `type` | `main` |
| `index_in_google` | `true` |
| `features` | `['all']` — tüm modüller açık |
| Admin paneli | `/tenants` sadece ana domainden erişilebilir (`main.domain` middleware) |
| Rol | Platform sahibi, SaaS yönetimi, yeni tenant oluşturma |

`config/domains.php`:

```php
'checkupcodes.com' => [
    'name' => 'Check-up Codes',
    'type' => 'main',
    'index_in_google' => true,
    'features' => ['all'],
],
```

### Tenant domainler (elselif.com, yusufdur.com vb.)

| Özellik | Değer |
|---------|-------|
| `type` | `tenant` |
| `index_in_google` | `true` — kendi SEO'su var |
| `features` | Açık modüller listesi |
| `hidden_features` | Gizli modüller (menüde görünmez, sitemap'e eklenmez) |
| DB | Tamamen izole, kendi içeriği |
| SEO | Kendi canonical URL, sitemap, robots.txt |

Örnek — elselif sadece yazı + test:

```php
'elselif.com' => [
    'name' => 'Else If',
    'type' => 'tenant',
    'index_in_google' => true,
    'features' => ['writes', 'tests'],
    'hidden_features' => ['workspaces', 'projects', 'journey'],
],
```

---

## 8. SEO Mimarisi

### Bileşenler

```
HTTP Request
     │
     ▼
TenantDomain::current()          → hangi domain?
TenantDomain::baseUrl()          → APP_URL (https://www.elselif.com)
     │
     ▼
SeoService
     ├── getGlobalSeo()          → util_seos tablosu (domain bazlı)
     ├── getCanonicalUrl()       → kendi domain URL'i
     ├── getRobotsMetaTag()      → index/noindex
     └── getFullMeta()           → OG, Twitter, schema
     │
     ▼
resources/views/app.blade.php    → <head> meta tagları
     │
     ├── /robots.txt              → RobotsController (dinamik)
     └── /sitemap.xml             → SitemapController (dinamik)
```

### SEO veritabanı (`util_seos`)

Her domain için ayrı kayıt tutulur:

| Alan | Açıklama |
|------|----------|
| `domain` | `elselif.com` |
| `site_name` | Site adı |
| `description` | Meta açıklama |
| `og_image` | Sosyal paylaşım görseli |
| `google_verification` | Search Console doğrulama |
| `google_analytics_id` | GA4 ID |
| `robots` | `index, follow` / `noindex, follow` |

Admin panelden düzenleme: **`/seo`** (giriş yapılmış kullanıcı)

### Canonical URL

- Tenant domainler **kendi URL'lerini** canonical olarak kullanır
- `APP_URL` değeri www/non-www tercihini belirler
- `EnforceCanonicalHost` middleware www ve HTTPS tutarlılığını sağlar

### robots.txt

```
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /login
...
Sitemap: https://www.elselif.com/sitemap.xml
```

### sitemap.xml

- **Dinamik üretilir** — `public/sitemap.xml` statik dosyası kullanılmaz
- `.htaccess` kuralı sitemap isteklerini Laravel'e yönlendirir
- Cache: `storage/app/sitemaps/sitemap_{domain}.xml`
- `hidden_features` içindeki modüller sitemap'e eklenmez
- URL'ler `APP_URL` üzerinden HTTPS olarak üretilir

### Structured Data (Schema.org)

Ana sayfa, yazı, test, sertifika sayfalarında JSON-LD:
- `Organization`
- `WebSite`
- `Article` (yazılar)
- `Quiz` (testler)
- `BreadcrumbList`

### Tenant SEO checklist (yeni müşteri)

1. `/seo` panelinden site adı, açıklama, logo, OG image doldur
2. Google Search Console'a domain ekle, verification kodunu `/seo`'ya gir
3. `https://domain.com/sitemap.xml` kontrol et — doğru domain URL'leri görünmeli
4. `https://domain.com/robots.txt` kontrol et
5. Search Console'a sitemap gönder

---

## 9. Storage Mimarisi

### Domain bazlı dosya yolu

```
/storage/multi/{domain}/public/
```

Örnek: elselif logosu
```
storage/multi/elselif.com/public/images/logo.png
→ https://elselif.com/storage/images/logo.png
```

### server.php (local dev)

`php -S localhost:8000 server.php` kullanıldığında `/storage/` istekleri otomatik olarak doğru domain dizinine yönlendirilir.

### Fallback

Domain storage'da dosya yoksa `storage/app/public/` denenir (geriye dönük uyumluluk).

---

## 10. Önemli Artisan Komutları

| Komut | Açıklama |
|-------|----------|
| `tenant:setup {domain}` | Yeni tenant oluştur (env + DB + storage + domains.php) |
| `sitemap:generate` | Tüm domainler için sitemap üret |
| `sitemap:generate --domain=elselif.com` | Tek domain için |
| `APP_TENANT=x php artisan migrate` | Belirli tenant DB'sine migration |
| `APP_TENANT=x php artisan db:seed` | Belirli tenant DB'sine seed |

---

## 11. Admin Paneli

| URL | Erişim | Açıklama |
|-----|--------|----------|
| `/tenants` | Sadece `checkupcodes.com` | Tüm tenant listesi, DB/storage istatistikleri |
| `/tenants/{domain}` | Ana domain | Tenant detay |
| `/seo` | Her domain (auth) | O domain'in SEO ayarları |
| `/media` | Her domain (auth) | Medya yönetimi |

---

## 12. Sık Karşılaşılan Sorunlar

### Sitemap'te `http://localhost` görünüyor

**Sebep:** Eski statik `public/sitemap.xml` dosyası Apache tarafından direkt sunuluyordu.

**Çözüm:**
```bash
rm -f public/sitemap.xml public/sitemap_*.xml
```
`.htaccess` zaten sitemap'i Laravel'e yönlendiriyor. Tekrar `/sitemap.xml` ziyaret et.

### Yanlış DB'ye bağlanıyor

**Sebep:** HTTP_HOST ile env dosya adı eşleşmiyor (www. farkı, port, trailing dot).

**Kontrol:** `storage/logs/laravel.log` içinde `[ENV] Host: ...` satırına bak.

### Session/login domainler arası karışıyor

**Sebep:** `SESSION_DOMAIN` yanlış ayarlı.

**Çözüm:** Her tenant env'de `SESSION_DOMAIN=.domain.com` olmalı.

### APP_URL www/non-www tutarsızlığı

**Sebep:** Env'de `https://elselif.com`, kullanıcı `https://www.elselif.com` ziyaret ediyor.

**Çözüm:** Env'deki `APP_URL` ile tercih edilen versiyonu eşleştir. Middleware otomatik yönlendirir.

---

## 13. Local ↔ Prod Workflow (Önerilen)

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Local Dev  │  push   │    GitHub    │  pull   │  Hostinger   │
│              │ ──────► │    (repo)    │ ──────► │   (prod)     │
│ .env.localhost│        │  kod only    │         │ .env.{domain}│
│ local MySQL  │         │  no secrets  │         │ prod MySQL   │
└──────────────┘         └──────────────┘         └──────────────┘
```

1. **Local'de geliştir** — `APP_TENANT=localhost`, local DB
2. **Commit + push** — sadece kod (env dosyaları gitignore'da)
3. **Prod'da pull + build** — env dosyaları sunucuda kalır, dokunulmaz
4. **Yeni tenant** — önce local'de `tenant:setup` test et, sonra prod'da çalıştır

### Prod env yedekleme

```bash
# Sunucuda periyodik yedek
tar -czf tenant-envs-backup-$(date +%Y%m%d).tar.gz config/tenants/.env.*
```

Bu arşivi **asla** git'e ekleme.

---

## 14. SaaS / Satılabilir Platform İçin Yol Haritası

Mevcut altyapı ile yapılabilecekler:

| Aşama | Durum | Açıklama |
|-------|-------|----------|
| Domain bazlı DB izolasyonu | ✅ Hazır | `config/tenants/.env.{domain}` |
| Domain bazlı storage | ✅ Hazır | `storage/multi/{domain}/` |
| Domain bazlı SEO | ✅ Hazır | `SeoService` + `util_seos` |
| Otomatik tenant kurulumu | ✅ Hazır | `tenant:setup` |
| Feature gating | ✅ Hazır | `config/domains.php` → `hidden_features` |
| Self-service onboarding | 🔲 Yapılacak | Müşteri panelinden domain + plan seçimi |
| Billing / plan limitleri | 🔲 Yapılacak | Stripe + plan bazlı feature |
| Tenant admin paneli | 🔲 Kısmen | `/seo` var, tam tenant dashboard yok |
| Env secrets yönetimi | 🔲 Yapılacak | Vault veya encrypted storage |

---

## 15. Hızlı Referans

```bash
# Local başlat
APP_TENANT=localhost php artisan serve

# Prod tenant migration
APP_TENANT=elselif.com php artisan migrate

# Yeni müşteri
php artisan tenant:setup musteri.com --db-name=... --db-user=... --db-pass=...

# Sitemap
php artisan sitemap:generate
php artisan sitemap:generate --domain=elselif.com

# Cache temizle
php artisan config:clear && php artisan cache:clear
```

**Kritik dosyalar:**
- `bootstrap/app.php` — env seçimi
- `config/domains.php` — domain/feature/SEO config
- `config/tenants/.env.{domain}` — tenant secrets
- `app/Support/TenantDomain.php` — domain çözümleme
- `app/Services/SeoService.php` — SEO mantığı
- `public/.htaccess` — sitemap/robots routing

---

*Son güncelleme: Mart 2026*
