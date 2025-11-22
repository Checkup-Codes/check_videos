# Cron Job Düzeltme ve Test Rehberi

## ❌ Mevcut Yanlış Komut

```
/usr/bin/php /home/u807351145/cd /home/u807351145/domains/checkupcodes.com/public_html && APP_ENV=checkupcodes.com /usr/bin/php artisan metals:fetch
```

**Sorun:** `cd` bir komut değil, shell built-in. Bu şekilde çalışmaz!

## ✅ Doğru Cron Job Komutu

Hostinger panelinde cron job'ı şu şekilde güncelleyin:

```bash
cd /home/u807351145/domains/checkupcodes.com/public_html && APP_ENV=checkupcodes.com /usr/bin/php artisan metals:fetch >> /home/u807351145/domains/checkupcodes.com/public_html/storage/logs/cron-metals.log 2>&1
```

### Komut Açıklaması:

1. `cd /home/u807351145/domains/checkupcodes.com/public_html` - Proje dizinine git
2. `&&` - Önceki komut başarılı olursa devam et
3. `APP_ENV=checkupcodes.com` - Environment variable ayarla
4. `/usr/bin/php artisan metals:fetch` - Komutu çalıştır
5. `>> /path/to/log.log` - Çıktıyı log dosyasına ekle (append)
6. `2>&1` - Hata mesajlarını da aynı dosyaya yönlendir

## 🔍 Test Komutları

### 1. Manuel Test (SSH üzerinden)

SSH ile sunucuya bağlanın ve şu komutları çalıştırın:

```bash
# Proje dizinine git
cd /home/u807351145/domains/checkupcodes.com/public_html

# Environment variable'ı ayarla ve komutu çalıştır
APP_ENV=checkupcodes.com /usr/bin/php artisan metals:fetch

# Veya log ile birlikte
APP_ENV=checkupcodes.com /usr/bin/php artisan metals:fetch >> storage/logs/cron-test.log 2>&1
```

### 2. PHP Path Kontrolü

```bash
# PHP path'ini kontrol et
which php
# Veya
/usr/bin/php -v
```

### 3. Artisan Path Kontrolü

```bash
# Artisan dosyasının var olduğunu kontrol et
ls -la /home/u807351145/domains/checkupcodes.com/public_html/artisan

# Artisan'ın çalıştığını test et
cd /home/u807351145/domains/checkupcodes.com/public_html
/usr/bin/php artisan list | grep metals
```

### 4. Environment Dosyası Kontrolü

```bash
# .env.checkupcodes.com dosyasının var olduğunu kontrol et
ls -la /home/u807351145/domains/checkupcodes.com/public_html/.env.checkupcodes.com

# İçeriğini kontrol et (API key'lerin olduğundan emin ol)
cat /home/u807351145/domains/checkupcodes.com/public_html/.env.checkupcodes.com | grep METALS
```

### 5. Log Dosyası Kontrolü

```bash
# Log dosyasını kontrol et
tail -f /home/u807351145/domains/checkupcodes.com/public_html/storage/logs/laravel.log

# Cron log'unu kontrol et (eğer oluşturduysanız)
tail -f /home/u807351145/domains/checkupcodes.com/public_html/storage/logs/cron-metals.log
```

## 📝 Hostinger Cron Job Ayarları

### Zamanlama:
- **Günde 3 kez:** `0 9,13,17 * * *` (09:00, 13:00, 17:00)
- **Günde 1 kez:** `0 12 * * *` (12:00)

### Komut:
```bash
cd /home/u807351145/domains/checkupcodes.com/public_html && APP_ENV=checkupcodes.com /usr/bin/php artisan metals:fetch >> /home/u807351145/domains/checkupcodes.com/public_html/storage/logs/cron-metals.log 2>&1
```

## 🐛 Sorun Giderme

### Sorun 1: Cron job hiç çalışmıyor
- **Kontrol:** Cron job'ın aktif olduğundan emin olun
- **Kontrol:** Zamanlamanın doğru olduğundan emin olun
- **Test:** Manuel olarak komutu çalıştırın

### Sorun 2: "Command not found" hatası
- **Çözüm:** PHP path'ini kontrol edin: `which php`
- **Çözüm:** Artisan path'ini kontrol edin

### Sorun 3: "No such file or directory" hatası
- **Çözüm:** Proje dizini path'ini kontrol edin
- **Çözüm:** `.env.checkupcodes.com` dosyasının var olduğundan emin olun

### Sorun 4: Boş çıktı
- **Kontrol:** Log dosyasını kontrol edin
- **Kontrol:** Komutun gerçekten çalıştığını doğrulayın
- **Test:** Manuel olarak çalıştırıp çıktıyı görün

### Sorun 5: Environment variable çalışmıyor
- **Test:** `APP_ENV=checkupcodes.com /usr/bin/php artisan env` komutunu çalıştırın
- **Kontrol:** `.env.checkupcodes.com` dosyasının doğru yerde olduğundan emin olun

## 📊 Log Dosyası Örneği

Başarılı çalışma log'u şöyle görünmeli:

```
Fetching metal prices from API...
API Response received. Status: 200
API Base Currency: TRY
API Timestamp: 2025-11-18 20:59:59
✓ Price time from API: 2025-11-18 20:59:59 (source: timestamp)
Using direct rate for TRYXAU: 170893.8182816693
Saved price for XAUTRY: 5496.50 TRY/gram (price_time: 2025-11-18 20:59:59)
Successfully saved 4 metal price(s). Skipped 0.
```

## ✅ Başarı Kontrolü

Cron job'ın çalıştığını kontrol etmek için:

1. **Veritabanını kontrol edin:**
```sql
SELECT * FROM api_paraplan_metal_prices 
ORDER BY updated_at DESC 
LIMIT 10;
```

2. **Log dosyasını kontrol edin:**
```bash
tail -20 storage/logs/cron-metals.log
```

3. **Son güncelleme zamanını kontrol edin:**
```bash
# Veritabanındaki son kayıt zamanı
# API endpoint'inden kontrol edin: /api/paraplan/metals/latest
```

