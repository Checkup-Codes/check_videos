# SEO Kullanım Kılavuzu

## 🎯 Amaç

Multi-tenant yapıda her tenant'ın içeriklerinin Google'da düzgün listelenebilmesi için otomatik SEO ve yapılandırılmış veri sistemi.

## ✅ Yapılanlar

### 1. Otomatik Structured Data (Schema.org JSON-LD)

Sistem artık her sayfa için otomatik olarak Google'ın anlayabileceği yapılandırılmış veri oluşturuyor:

#### Ana Sayfa (/)
- ✅ Organization Schema (Site bilgisi)
- ✅ WebSite Schema (Arama özelliği)
- ✅ ItemList Schema (Son 10 yazı, test, sertifika, workspace)

#### Yazı Sayfaları (/writes/slug)
- ✅ Article Schema (Makale bilgisi)
- ✅ Breadcrumb Schema (Gezinme yolu)

#### Test Sayfaları (/tests/slug)
- ✅ Quiz Schema (Test bilgisi)
- ✅ Breadcrumb Schema

#### Sertifika Sayfaları (/certificates/slug)
- ✅ EducationalOccupationalCredential Schema
- ✅ Breadcrumb Schema

### 2. Google Arama Sonuçları

Artık Google'da site adınızı arattığınızda içerikleriniz düzgün listelenecek:

**Örnek: "checkupcodes" araması**
```
checkupcodes.com
├── Yazılar
│   ├── Laravel ile API Geliştirme
│   ├── Vue.js 3 Composition API
│   └── ...
├── Testler
│   ├── JavaScript Quiz
│   ├── PHP Bilgi Testi
│   └── ...
├── Sertifikalar
│   ├── AWS Certified Developer
│   └── ...
└── Çalışma Alanları
    └── ...
```

### 3. SEO Ayarları Sayfası (/seo)

Kullanıcı dostu arayüz ile tüm SEO ayarlarını yönetebilirsiniz:

#### Site Kimliği
- Site Adı
- Slogan
- Varsayılan Sayfa Başlığı
- Site Açıklaması
- Anahtar Kelimeler
- Yazar
- Dil ve Yerel Ayar

#### Görsel Varlıklar
- Favicon (ICO, PNG, SVG)
- Apple Touch Icon (180x180 PNG)
- Tema Rengi

#### Open Graph (Sosyal Medya)
- OG Başlık
- OG Açıklama
- OG Görsel (1200x630 önerilir)

#### Twitter Card
- Kart Tipi (Summary, Large Image, vb.)
- Twitter Hesabı (@site)
- İçerik Oluşturucu (@creator)

#### Teknik SEO
- Canonical URL
- Robots Direktifi (index/noindex)
- Schema.org JSON-LD (manuel ekleme)

#### Doğrulama Kodları
- Google Search Console
- Bing Webmaster
- Yandex Webmaster

#### Analytics
- Google Analytics ID (GA4 veya UA)
- Google Tag Manager ID

## 🚀 Kullanım

### Yönetici Olarak

1. `/seo` sayfasına gidin
2. Site bilgilerinizi doldurun:
   - Site adı (örn: "Check-up Codes")
   - Slogan (örn: "Yazılım Geliştirme Blogu")
   - Açıklama (160 karakter, Google'da görünecek)
3. Logo ve favicon yükleyin
4. Open Graph görseli ekleyin (sosyal medya paylaşımları için)
5. Google Search Console doğrulama kodunu ekleyin
6. Google Analytics ID'nizi ekleyin
7. Kaydet butonuna tıklayın

### Otomatik Çalışan Özellikler

Hiçbir şey yapmanıza gerek yok! Sistem otomatik olarak:

- ✅ Her yazı için Article schema oluşturur
- ✅ Her test için Quiz schema oluşturur
- ✅ Her sertifika için Certificate schema oluşturur
- ✅ Ana sayfada tüm içerikleri ItemList olarak listeler
- ✅ Her sayfada breadcrumb (gezinme yolu) ekler
- ✅ Google'ın sitenizi daha iyi anlamasını sağlar

## 📊 Test Etme

### 1. Google Rich Results Test
https://search.google.com/test/rich-results

Sitenizin URL'ini girin ve yapılandırılmış verilerin doğru çalıştığını kontrol edin.

### 2. Schema.org Validator
https://validator.schema.org/

JSON-LD kodlarınızın geçerli olduğunu doğrulayın.

### 3. Google Search Console

1. https://search.google.com/search-console adresine gidin
2. Sitenizi ekleyin (doğrulama kodu /seo sayfasından)
3. "Geliştirmeler" > "Yapılandırılmış Veriler" bölümünü kontrol edin
4. Hataları düzeltin

### 4. Sayfa Kaynağını Kontrol Edin

Herhangi bir sayfada sağ tık > "Sayfa Kaynağını Görüntüle" yapın ve şunu arayın:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  ...
}
</script>
```

## 🎨 UX/UI Özellikleri

### Basit ve Anlaşılır
- Tüm ayarlar tek sayfada
- Her alan için açıklama metni
- Karakter sayacı (title: 70, description: 160)
- Görsel önizleme
- Renk seçici

### Görsel Geri Bildirim
- Yüklenen görsellerin önizlemesi
- Başarı mesajları
- Hata mesajları
- Yükleme durumu göstergeleri

### Yapılandırılmış Veri Bilgilendirme
- Aktif schema tiplerinin listesi
- Google'da nasıl görüneceğinin örneği
- Test araçlarına hızlı erişim linkleri

## 🔧 Teknik Detaylar

### Backend (Laravel)

**SeoService.php**
- `getOrganizationSchema()`: Site bilgisi
- `getWebSiteSchema()`: Arama özelliği
- `getArticleSchema()`: Yazı bilgisi
- `getQuizSchema()`: Test bilgisi
- `getCertificateSchema()`: Sertifika bilgisi
- `getItemListSchema()`: İçerik listeleri
- `getBreadcrumbSchema()`: Gezinme yolu
- `getHomepageSchema()`: Ana sayfa (tümü)

**Controllers**
- `IndexController`: Ana sayfa schema'sı
- `WritesController`: Yazı schema'sı
- `TestsController`: Test schema'sı
- `CertificateController`: Sertifika schema'sı

### Frontend (Blade)

**app.blade.php**
```blade
@if(isset($page['props']['structuredData']))
    @foreach($page['props']['structuredData'] as $schema)
    <script type="application/ld+json">
        {!! json_encode($schema) !!}
    </script>
    @endforeach
@endif
```

### Cache

- Request-scope cache: Aynı request'te tekrar sorgu atılmaz
- Laravel cache: DB sorguları minimize edilir (5 dakika TTL)
- Cache temizleme: SEO ayarları güncellendiğinde otomatik

## 📈 Beklenen Sonuçlar

### Kısa Vadede (1-2 hafta)
- Google Search Console'da yapılandırılmış veri raporları görünür
- Rich results test'leri başarılı olur
- Sitemap'te tüm içerikler listelenir

### Orta Vadede (1-2 ay)
- Google arama sonuçlarında rich snippets görünmeye başlar
- Site adı aramasında içerikler listelenmeye başlar
- Tıklama oranı (CTR) artar

### Uzun Vadede (3-6 ay)
- Organik trafik artar
- Arama sıralamaları yükselir
- Marka bilinirliği artar

## 🎯 Multi-Tenancy

Her tenant için:
- ✅ Kendi site adı
- ✅ Kendi logosu
- ✅ Kendi içerikleri
- ✅ Kendi structured data'sı
- ✅ Kendi Google Analytics'i

Sistem otomatik olarak tenant context'e göre doğru verileri kullanır.

## 🐛 Sorun Giderme

### Structured Data Görünmüyor
1. Sayfa kaynağını kontrol edin
2. `structuredData` prop'unun controller'dan gönderildiğinden emin olun
3. Cache'i temizleyin: `php artisan cache:clear`

### Google'da Görünmüyor
1. Google Search Console'da indeksleme durumunu kontrol edin
2. Sitemap'i gönderin: `/sitemap.xml`
3. URL'i manuel olarak indeksleme isteği gönderin
4. Sabırlı olun (1-2 hafta sürebilir)

### Hata Mesajları
1. Google Rich Results Test'te hataları kontrol edin
2. Schema.org Validator'da JSON'u doğrulayın
3. Eksik alanları doldurun (title, description, url zorunlu)

## 📚 Kaynaklar

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)

## 🎉 Sonuç

Artık siteniz Google'da profesyonel ve düzenli görünecek! Her tenant kendi içeriklerini kolayca yönetebilir ve Google'da öne çıkabilir.

**Önemli:** SEO bir maraton, sprint değil. Sabırlı olun ve düzenli içerik üretin! 🚀
