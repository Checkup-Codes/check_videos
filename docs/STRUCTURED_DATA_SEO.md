# Structured Data & SEO Sistemi

## Genel Bakış

Multi-tenant yapıda her tenant'ın içeriklerinin Google'da düzgün listelenebilmesi için **Schema.org JSON-LD** yapılandırılmış veri sistemi kuruldu.

## Özellikler

### 1. Otomatik Structured Data

Sistem, her sayfa tipi için otomatik olarak uygun structured data oluşturur:

- **Homepage**: Organization + WebSite + ItemList (tüm içerik tipleri)
- **Yazılar (Articles)**: Article + Breadcrumb
- **Testler (Quizzes)**: Quiz + Breadcrumb
- **Sertifikalar**: EducationalOccupationalCredential + Breadcrumb
- **Kategoriler**: ItemList + Breadcrumb

### 2. Google Arama Sonuçları

Bu yapı sayesinde Google'da arama yapıldığında:

**"checkupcodes" araması:**
- ✅ Yazılarım
- ✅ Sertifikalarım
- ✅ Çalışma Alanım
- ✅ Testlerim

**"elselif" araması:**
- ✅ Yazılarım
- ✅ Çalışma alanım
- ✅ Kategorilerim

### 3. Schema Tipleri

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Site Adı",
  "url": "https://site.com",
  "logo": "https://site.com/logo.png",
  "description": "Site açıklaması"
}
```

#### WebSite Schema (Arama Özelliği ile)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Site Adı",
  "url": "https://site.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://site.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### Article Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Yazı Başlığı",
  "description": "Yazı açıklaması",
  "url": "https://site.com/writes/slug",
  "datePublished": "2024-01-01T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Yazar Adı"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Adı"
  }
}
```

#### Quiz Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Test Başlığı",
  "description": "Test açıklaması",
  "numberOfQuestions": 10,
  "timeRequired": "PT15M"
}
```

#### ItemList Schema (İçerik Listeleri)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Yazılar",
  "numberOfItems": 10,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Thing",
        "name": "Yazı Başlığı",
        "url": "https://site.com/writes/slug"
      }
    }
  ]
}
```

#### Breadcrumb Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://site.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Yazılar",
      "item": "https://site.com/writes"
    }
  ]
}
```

## Kullanım

### Backend (Controller)

```php
// Homepage
$seoService = app(\App\Services\SeoService::class);
$contentSummary = [
    'writes' => [...],
    'tests' => [...],
    'certificates' => [...],
];
$schemas = $seoService->getHomepageSchema($contentSummary);

return inertia('Page', [
    'structuredData' => $schemas,
]);
```

```php
// Article Page
$structuredData = [
    $seoService->getArticleSchema([
        'title' => $article->title,
        'description' => $article->summary,
        'url' => route('writes.show', $article->slug),
        'published_at' => $article->published_at->toIso8601String(),
        'author_name' => $article->author->name,
        'image' => $article->featured_image,
    ]),
    $seoService->getBreadcrumbSchema($breadcrumbs),
];

return inertia('Page', [
    'structuredData' => $structuredData,
]);
```

### Frontend (Blade Template)

`app.blade.php` otomatik olarak `structuredData` prop'unu render eder:

```blade
@if(isset($page['props']['structuredData']))
    @if(is_array($page['props']['structuredData']) && isset($page['props']['structuredData'][0]))
        @foreach($page['props']['structuredData'] as $schema)
        <script type="application/ld+json">
            {!! json_encode($schema) !!}
        </script>
        @endforeach
    @else
        <script type="application/ld+json">
            {!! json_encode($page['props']['structuredData']) !!}
        </script>
    @endif
@endif
```

## SEO Ayarları

`/seo` sayfasından yönetilebilir:

1. **Site Kimliği**: Site adı, slogan, açıklama
2. **Görsel Varlıklar**: Logo, favicon, OG image
3. **Open Graph**: Sosyal medya paylaşımları
4. **Twitter Card**: Twitter paylaşımları
5. **Teknik SEO**: Robots, canonical URL
6. **Doğrulama**: Google, Bing, Yandex
7. **Analytics**: Google Analytics, GTM

## Test Etme

### Google Rich Results Test
https://search.google.com/test/rich-results

### Schema.org Validator
https://validator.schema.org/

### Google Search Console
- Structured data raporlarını kontrol edin
- Hataları düzeltin
- İndeksleme durumunu takip edin

## Multi-Tenancy

Her tenant için:
- Kendi site adı
- Kendi logosu
- Kendi içerikleri
- Kendi structured data'sı

Sistem otomatik olarak tenant context'e göre doğru verileri kullanır.

## Performans

- Request-scope cache ile aynı request'te tekrar sorgu atılmaz
- Laravel cache ile DB sorguları minimize edilir
- Sadece gerekli alanlar seçilir (select)
- Lazy loading ile büyük içerikler sonradan yüklenir

## Gelecek Geliştirmeler

- [ ] Video schema (YouTube entegrasyonu)
- [ ] Event schema (etkinlikler için)
- [ ] FAQ schema (SSS sayfaları için)
- [ ] HowTo schema (tutorial yazılar için)
- [ ] Product schema (ürün sayfaları için)
- [ ] Review schema (yorumlar için)
