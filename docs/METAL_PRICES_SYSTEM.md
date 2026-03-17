# Metal Fiyatları Sistemi - Nasıl Çalışır?

## 📋 Genel Bakış

Bu sistem, dış bir API'den (metalpriceapi.com) metal fiyatlarını otomatik olarak çekerek veritabanına kaydeder ve mobil uygulamanızın kendi API'nizden bu verilere erişmesini sağlar.

## 🏗️ Sistem Mimarisi

```
┌─────────────────┐
│  Cron Job /     │
│  Laravel        │──┐
│  Scheduler      │  │
└─────────────────┘  │
                     │
                     ▼
┌─────────────────────────────────────┐
│  FetchMetalsCommand                 │
│  (metals:fetch)                     │
│  - Retry mekanizması (3 deneme)    │
│  - Hata bildirimi                  │
└─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────┐
│  metalpriceapi.com                  │
│  (Dış API)                          │
└─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────┐
│  Veri İşleme & Dönüştürme          │
│  - Troy ounce → Gram                │
│  - Para birimi dönüşümü             │
└─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────┐
│  api_paraplan_metal_prices          │
│  (Veritabanı Tablosu)               │
└─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────┐
│  MetalPriceController               │
│  /api/paraplan/metals/latest        │
│  - Cache (5 dakika)                 │
│  - Rate limiting (60/dakika)        │
│  - Veri tazelik kontrolü            │
└─────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────┐
│  Mobil Uygulama                     │
│  (Kendi API'nize istek atıyor)     │
└─────────────────────────────────────┘
```

## 🔄 Çalışma Akışı

### 1. Veri Çekme Süreci (Cron Job)

**Zamanlama:**
- **Laravel Scheduler:** Günde 3 kez (09:00, 13:00, 17:00)
- **Alternatif:** Sistem cron job'ı kullanıyorsanız: `0 9,13,17 * * *`

**Komut:** `php artisan metals:fetch`

**Adımlar:**

1. **Konfigürasyon Kontrolü**
   - `config/paraplan/metals.php` dosyasından sembolleri okur
   - `.env` dosyasından API anahtarı ve URL'i alır
   - Eksik konfigürasyon varsa hata verir

2. **API İsteği (Retry Mekanizması ile)**
   - İlk deneme: Anında
   - Başarısız olursa: 5 saniye bekleyip tekrar dener
   - Toplam 3 deneme hakkı
   - 5xx hatalarında otomatik retry
   - 4xx hatalarında retry yapılmaz (client hatası)

3. **Veri İşleme**
   - API'den gelen fiyatlar troy ounce cinsinden
   - Gram'a dönüştürülür (1 troy ounce = 31.1035 gram)
   - Para birimi dönüşümü yapılır (örn: USD → TRY)

4. **Timestamp İşleme**
   - API response'undaki `timestamp` field'ı parse edilir
   - Unix timestamp formatında gelirse Carbon ile datetime'a çevrilir
   - Eğer timestamp yoksa `now()` kullanılır ve uyarı verilir
   - Timestamp kaynağı log'lanır (timestamp, meta.timestamp, vb.)

5. **Veritabanına Kaydetme**
   - `updateOrCreate` ile mevcut kayıt güncellenir veya yeni kayıt oluşturulur
   - Her sembol için ayrı kayıt tutulur
   - `price_time`: API'nin verdiği fiyat zamanı (API response'undaki timestamp)
   - `updated_at`: Veritabanına kaydedilme zamanı
   - Her kayıt için timestamp bilgisi log'lanır

5. **Hata Bildirimi**
   - Tüm denemeler başarısız olursa admin'e email gönderilir
   - Hata detayları log dosyasına yazılır

### 2. API Endpoint (Mobil Uygulama İçin)

**Endpoint:** `GET /api/paraplan/metals/latest`

**Özellikler:**

1. **Cache Mekanizması**
   - Veritabanı sorguları 5 dakika cache'lenir
   - Mobil uygulama sık istek atsa bile veritabanı yükü azalır
   - Cache key: Sembol listesine göre dinamik oluşturulur

2. **Rate Limiting**
   - Dakikada maksimum 60 istek
   - Aşırı kullanımı önler

3. **Veri Tazelik Kontrolü**
   - Her fiyat için veri yaşı hesaplanır (saat cinsinden)
   - 24 saatten eski veriler için `is_stale: true` flag'i
   - Response'da `has_stale_data` ve `oldest_data_age_hours` bilgileri

4. **Filtreleme**
   - `?symbols=XAUTRYG,XAGUSD` parametresi ile belirli sembolleri isteyebilirsiniz

**Response Örneği:**

```json
{
  "data": [
    {
      "base_symbol": "XAU",
      "quote_currency": "TRY",
      "provider_symbol": "XAUTRYG",
      "price": "2850.50",
      "price_time": "2025-01-15T09:00:00+00:00",
      "price_time_unix": 1736935200,
      "updated_at": "2025-01-15T09:00:15+00:00",
      "unit": "gram",
      "is_stale": false
    }
  ],
  "meta": {
    "unit": "gram",
    "supported_metals": ["XAU", "XAG"],
    "supported_quote_currencies": ["TRY", "USD"],
    "supported_provider_symbols": ["XAUTRYG", "XAGUSD"],
    "has_stale_data": false,
    "oldest_data_age_hours": 2,
    "max_data_age_hours": 24
  }
}
```

**Timestamp Alanları:**
- `price_time`: API'nin verdiği fiyat zamanı (ISO 8601 formatında)
- `price_time_unix`: Aynı zamanın Unix timestamp formatı
- `updated_at`: Veritabanına kaydedilme zamanı

## 📊 Veritabanı Yapısı

**Tablo:** `api_paraplan_metal_prices`

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | bigint | Primary key |
| `base_symbol` | string | Metal kodu (XAU, XAG) |
| `quote_currency` | string | Para birimi (TRY, USD) |
| `provider_symbol` | string | Tam sembol (XAUTRYG, XAGUSD) |
| `price` | decimal(18,8) | Gram başına fiyat |
| `price_time` | timestamp | API'nin verdiği fiyat zamanı |
| `created_at` | timestamp | Kayıt oluşturma zamanı |
| `updated_at` | timestamp | Son güncelleme zamanı |

**Indexler:**
- `provider_symbol` - Hızlı sorgulama için
- `(provider_symbol, price_time)` - Composite index

## ⚙️ Konfigürasyon

### .env Dosyası

```env
METALS_API_BASE_URL=https://api.metalpriceapi.com/v1/latest
METALS_API_KEY=your_api_key_here
METALS_API_BASE_CURRENCY=USD
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="Your App Name"
```

### config/paraplan/metals.php

```php
return [
    'api' => [
        'base_url' => env('METALS_API_BASE_URL'),
        'key' => env('METALS_API_KEY'),
        'base_currency' => env('METALS_API_BASE_CURRENCY', 'USD'),
    ],
    'symbols' => [
        [
            'base_symbol' => 'XAU',
            'quote_currency' => 'TRY',
            'provider_symbol' => 'XAUTRYG',
        ],
        [
            'base_symbol' => 'XAG',
            'quote_currency' => 'USD',
            'provider_symbol' => 'XAGUSD',
        ],
    ],
];
```

## 🔐 Güvenlik

1. **API Key Authentication**
   - Tüm `/api/paraplan/*` endpoint'leri `ValidateApiKey` middleware'i ile korunur
   - Mobil uygulamanızda API key'i header'da göndermelisiniz

2. **Rate Limiting**
   - API endpoint'leri rate limiting ile korunur
   - Aşırı istekler engellenir

## 📈 Avantajlar

1. **Dış API Bağımlılığını Azaltır**
   - Mobil uygulama dış API'ye direkt bağlanmaz
   - Kendi API'nizden hızlı yanıt alır

2. **Maliyet Optimizasyonu**
   - Dış API limitlerinden etkilenmezsiniz
   - Cache sayesinde gereksiz API çağrıları yapılmaz

3. **Güvenilirlik**
   - Retry mekanizması ile geçici hatalar otomatik çözülür
   - Hata bildirimi ile sorunları hızlıca tespit edersiniz

4. **Veri Tarihçesi**
   - Veritabanında geçmiş veriler tutulur
   - İleride analiz yapabilirsiniz

5. **Performans**
   - Cache mekanizması ile hızlı yanıt
   - Veritabanı indexleri ile optimize sorgular

## 🚨 Hata Yönetimi

### Cron Job Başarısız Olursa

1. **Otomatik Retry**
   - 3 deneme yapılır
   - Her deneme arasında 5 saniye beklenir

2. **Email Bildirimi**
   - Tüm denemeler başarısız olursa admin'e email gönderilir
   - Email adresi: `MAIL_FROM_ADDRESS` değeri

3. **Log Kayıtları**
   - Tüm hatalar `storage/logs/laravel.log` dosyasına yazılır
   - Detaylı hata mesajları ve stack trace'ler kaydedilir

### Veri Eski Olursa

- Mobil uygulama `is_stale` flag'ini kontrol edebilir
- `has_stale_data` meta bilgisi ile genel durumu görebilir
- 24 saatten eski veriler için uyarı gösterilebilir

## 🔧 Bakım ve İzleme

### Log Kontrolü

```bash
tail -f storage/logs/laravel.log | grep "Metals\|Metal"
```

### Cron Job Durumu

Laravel Scheduler kullanıyorsanız:
```bash
php artisan schedule:list
```

Sistem cron kullanıyorsanız:
```bash
crontab -l
```

### Cache Temizleme

Gerekirse cache'i temizleyebilirsiniz:
```bash
php artisan cache:clear
```

## 📝 Notlar

- Fiyatlar **gram** cinsinden saklanır (troy ounce'dan dönüştürülür)
- Veriler günde 3 kez güncellenir (09:00, 13:00, 17:00)
- Cache süresi: 5 dakika
- Rate limit: 60 istek/dakika
- Maksimum veri yaşı uyarısı: 24 saat

## 🔄 Güncelleme Zamanları

Sistem şu saatlerde otomatik çalışır:
- **09:00** - Sabah güncellemesi
- **13:00** - Öğle güncellemesi  
- **17:00** - Akşam güncellemesi

Bu saatleri değiştirmek için `app/Console/Kernel.php` dosyasını düzenleyin.

