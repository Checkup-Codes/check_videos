# Tenant Web Panel Dokümantasyonu

## 🎯 Genel Bakış

Sadece **checkupcodes.com** domain'inde görünen, tenant yönetimi için web arayüzü.

## 📍 Erişim

```
https://checkupcodes.com/tenants
```

**Önemli:** Bu sayfa sadece ana domain'de (checkupcodes.com) görünür. Diğer domainlerde 404 hatası verir.

## ✨ Özellikler

### 1. Dashboard İstatistikleri

- **Toplam Tenant**: Kaç tenant var
- **Database Boyutu**: Tüm tenantların toplam DB boyutu
- **Storage Boyutu**: Tüm tenantların toplam dosya boyutu
- **Toplam Dosya**: Kaç dosya var

### 2. Tenant Listesi

Her tenant için:
- Domain adı (tıklanabilir link)
- İsim
- Database boyutu ve tablo sayısı
- Storage boyutu ve dosya sayısı
- Oluşturulma tarihi
- Sil butonu

### 3. Yeni Tenant Ekleme

**Form Alanları:**
- Domain (zorunlu): candundar.com
- User verilerini kopyala (checkbox)
- Gelişmiş ayarlar (opsiyonel):
  - Database adı
  - Database kullanıcı
  - Database şifre

**İşlem:**
1. Formu doldur
2. "Tenant Oluştur" butonuna tıkla
3. Arka planda `php artisan tenant:setup` komutu çalışır
4. 2-3 dakika içinde tenant hazır

### 4. Tenant Silme

**Uyarı:** .env ve storage silinir, database güvenlik için silinmez.

**İşlem:**
1. Tenant satırında "Sil" butonuna tıkla
2. Onay modalı açılır
3. "Evet, Sil" butonuna tıkla
4. Tenant silinir

### 5. Nokta Klasörlerini Temizle

Boş `domain.` klasörlerini temizler.

**İşlem:**
1. "Nokta Klasörlerini Temizle" butonuna tıkla
2. Onay ver
3. Temizlik yapılır

### 6. Yenile

Sayfayı yeniler, güncel verileri getirir.



## 🔧 Teknik Detaylar

### Backend (TenantController.php)

**Metodlar:**
- `index()` - Tenant listesi ve istatistikler
- `store()` - Yeni tenant oluştur
- `destroy()` - Tenant sil
- `cleanupDots()` - Nokta klasörlerini temizle

**Güvenlik:**
- Sadece checkupcodes.com'da çalışır
- Auth middleware ile korunmuş
- CSRF token kontrolü

### Frontend (Tenants/Index.vue)

**Teknolojiler:**
- Vue 3 Composition API
- TypeScript
- Tailwind CSS
- Inertia.js

**Özellikler:**
- Responsive tasarım
- Dark mode desteği
- Real-time istatistikler
- Modal'lar (create, delete)
- Loading states

### API Endpoints

```
GET  /tenants              - Tenant listesi
POST /tenants              - Yeni tenant oluştur
DELETE /tenants/{domain}   - Tenant sil
POST /tenants/cleanup-dots - Nokta klasörlerini temizle
```

## 📊 Veri Akışı

### Tenant Oluşturma

```
1. User formu doldurur
2. Frontend POST /tenants
3. Backend Artisan::call('tenant:setup')
4. Komut çalışır:
   - .env oluşturur
   - Database oluşturur
   - Migration çalıştırır
   - User kopyalar
   - Storage oluşturur
   - Config günceller
5. Response döner
6. Sayfa yenilenir
```

### İstatistik Hesaplama

```
1. Tüm .env.{domain} dosyaları taranır
2. Her domain için:
   - Database boyutu sorgulanır (INFORMATION_SCHEMA)
   - Storage klasörü taranır (RecursiveIterator)
   - Dosya sayısı hesaplanır
3. Toplam istatistikler hesaplanır
4. Frontend'e gönderilir
```

## 🎨 Kullanıcı Arayüzü

### Renk Kodları

- **Mavi**: Tenant sayısı, primary actions
- **Yeşil**: Database boyutu
- **Mor**: Storage boyutu
- **Turuncu**: Dosya sayısı
- **Kırmızı**: Silme işlemleri

### İkonlar

- 🏢 Tenant
- 💾 Database
- 📁 Storage
- 📄 Dosya
- ➕ Ekle
- 🧹 Temizle
- 🔄 Yenile
- 🗑️ Sil
- ⚠️ Uyarı
- ✅ Başarılı
- ⏳ Yükleniyor



## 🚀 Deployment

### 1. Dosyaları Yükle

```bash
git add app/Http/Controllers/TenantController.php
git add resources/js/Pages/Tenants/Index.vue
git add routes/web.php
git add docs/TENANT_WEB_PANEL.md
git commit -m "feat: Add tenant web panel"
git push
```

### 2. Production'da

```bash
# Cache temizle
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Frontend build (eğer gerekirse)
npm run build
```

### 3. Test Et

```bash
# Tarayıcıda aç
https://checkupcodes.com/tenants

# Giriş yap (auth gerekli)
# Tenant listesini gör
# Yeni tenant ekle
```

## 🔒 Güvenlik

### Domain Kontrolü

```php
$currentDomain = request()->getHost();
$mainDomain = config('domains.main_domain', 'checkupcodes.com');

if ($currentDomain !== $mainDomain) {
    abort(404);
}
```

### Auth Middleware

```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/tenants', [TenantController::class, 'index']);
});
```

### CSRF Protection

```javascript
headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
}
```

## 📝 Örnek Kullanım

### Senaryo: Yeni Müşteri

1. **Hostinger'da:**
   - Domain al: candundar.com
   - Park et: checkupcodes.com

2. **Web Panel'de:**
   - https://checkupcodes.com/tenants aç
   - "Yeni Tenant Ekle" tıkla
   - Domain: candundar.com
   - "User verilerini kopyala" işaretle
   - "Tenant Oluştur" tıkla
   - 2-3 dakika bekle

3. **Test Et:**
   - https://candundar.com aç
   - Giriş yap (kopyalanan user ile)
   - Logo yükle
   - İçerik ekle

## 🐛 Sorun Giderme

### "404 Not Found" Hatası

**Sebep:** Başka bir domain'den erişmeye çalışıyorsun

**Çözüm:** Sadece checkupcodes.com'dan eriş

### "Tenant already exists" Hatası

**Sebep:** .env.{domain} dosyası zaten var

**Çözüm:** 
- Mevcut tenant'ı sil
- Veya manuel olarak .env dosyasını sil

### Database Boyutu Gösterilmiyor

**Sebep:** Database kullanıcısının INFORMATION_SCHEMA yetkisi yok

**Çözüm:**
```sql
GRANT SELECT ON information_schema.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

### Storage Boyutu Yanlış

**Sebep:** Klasör izinleri yanlış

**Çözüm:**
```bash
chmod -R 755 storage/multi
```

## 💡 Gelecek İyileştirmeler

### Kısa Vadede

- [ ] Tenant durum göstergesi (active, inactive)
- [ ] Tenant arama/filtreleme
- [ ] Toplu işlemler (çoklu silme)
- [ ] Export (CSV, Excel)

### Orta Vadede

- [ ] Tenant detay sayfası
- [ ] Backup/restore işlemleri
- [ ] Kullanım grafikleri (zaman içinde büyüme)
- [ ] Email bildirimleri

### Uzun Vadede

- [ ] Tenant template sistemi
- [ ] Otomatik domain satın alma (Hostinger API)
- [ ] Ödeme entegrasyonu
- [ ] Self-service portal (müşteriler kendi yönetir)

## ✅ Sonuç

Artık web arayüzünden tenant yönetimi yapabilirsin:
- ✅ Tek tıkla yeni tenant
- ✅ Real-time istatistikler
- ✅ Kolay silme
- ✅ Nokta klasörü temizleme

Komut satırına gerek yok! 🎉

