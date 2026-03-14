# Google Sitelinks Rehberi

## 🎯 Hedef: Google'da Sitelinks Gösterimi

Google'da "checkupcodes" veya "elselif" yazdığınızda şöyle görünmesi:

```
┌─────────────────────────────────────────────────┐
│ checkupcodes.com                                │
│ Check-up Codes - Yazılım Geliştirme Blogu      │
│ Laravel, Vue.js, React ve modern web...        │
│                                                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│
│ │ Yazılar │ │ Testler │ │ Sertif. │ │ Hakkım.││
│ └─────────┘ └─────────┘ └─────────┘ └────────┘│
└─────────────────────────────────────────────────┘
```

## ✅ Şu Anda Hazır Olanlar

Kurduğumuz SEO sistemi ile:
- ✅ Organization Schema (Google sitenizi tanıyor)
- ✅ WebSite Schema (Arama özelliği)
- ✅ ItemList Schema (İçerikler listeleniyor)
- ✅ Breadcrumb Schema (Sayfa hiyerarşisi)
- ✅ Article/Quiz/Certificate Schema (Her içerik tipi)
- ✅ Domain-based Multi-tenancy (Her site ayrı)

## 📅 Zaman Çizelgesi

### Hafta 1-2: Temel Kurulum
- [x] SEO ayarları dolduruldu
- [x] Structured data aktif
- [ ] Google Search Console eklendi
- [ ] Sitemap gönderildi
- [ ] Google Analytics kuruldu

### Hafta 3-4: İlk İndeksleme
- [ ] Google sitenizi keşfetti
- [ ] Ana sayfa indekslendi
- [ ] İçerikler indekslenmeye başladı
- [ ] İlk arama sonuçları görünüyor

### Ay 2-3: İçerik Birikimi
- [ ] 20+ yazı yayınlandı
- [ ] 10+ test oluşturuldu
- [ ] Düzenli içerik üretimi
- [ ] İç linkler oluşturuldu

### Ay 4-6: Sitelinks Oluşumu
- [ ] Marka aramaları arttı
- [ ] Trafik düzenli
- [ ] Google sitelinks göstermeye başladı
- [ ] Arama sonuçları optimize

### Ay 6-12: Tam Optimizasyon
- [ ] Tüm içerikler indekslendi
- [ ] Sitelinks tam görünüyor
- [ ] Arama sıralamaları yükseldi
- [ ] Organik trafik arttı

## 🚀 Hemen Yapılması Gerekenler

### 1. Google Search Console Kurulumu

**Adımlar:**
1. https://search.google.com/search-console adresine gidin
2. "Mülk Ekle" > "URL Öneki" seçin
3. Domain'inizi girin: `https://checkupcodes.com`
4. Doğrulama kodunu `/seo` sayfasından alın
5. "Doğrula" butonuna tıklayın

**Doğrulama Kodu Nerede?**
```
/seo sayfası > Google Ayarları > Search Console Doğrulama Kodu
```

### 2. Sitemap Gönderimi

**Adımlar:**
1. Search Console'da "Sitemap" bölümüne gidin
2. Sitemap URL'inizi girin: `https://checkupcodes.com/sitemap.xml`
3. "Gönder" butonuna tıklayın

**Sitemap Kontrolü:**
```bash
# Tarayıcıda açın:
https://checkupcodes.com/sitemap.xml

# Şunları içermeli:
- Ana sayfa
- Tüm yazılar
- Tüm testler
- Tüm sertifikalar
- Tüm kategoriler
```

### 3. Google Analytics Kurulumu

**Adımlar:**
1. https://analytics.google.com adresine gidin
2. Hesap oluşturun
3. Mülk oluşturun (checkupcodes.com)
4. Tracking ID'yi alın (G-XXXXXXXXXX)
5. `/seo` sayfasına ekleyin

### 4. İçerik Stratejisi

**Haftalık Plan:**
- 2-3 yeni yazı
- 1 yeni test
- Sosyal medya paylaşımları
- İç link optimizasyonu

**İçerik Kalitesi:**
- Minimum 500 kelime
- Özgün içerik
- Görseller ekleyin
- Video/kod örnekleri
- İç linkler

### 5. Site Yapısı Optimizasyonu

**Ana Menü (Header):**
```
Ana Sayfa | Yazılar | Testler | Sertifikalar | Hakkımda
```

**Footer Linkleri:**
```
Hakkımda
İletişim
Gizlilik Politikası
Kullanım Koşulları
Sitemap
```

**İç Linkler:**
- Her yazıda 2-3 iç link
- İlgili içeriklere link
- Kategori sayfalarına link
- Ana sayfaya link

## 📊 Sitelinks İçin Önerilen Sayfalar

Google genellikle şu sayfaları sitelinks olarak gösterir:

### checkupcodes.com için:
1. **Ana Sayfa** - `/`
2. **Yazılar** - `/writes`
3. **Testler** - `/tests`
4. **Sertifikalar** - `/certificates`
5. **Hakkımda** - `/about`
6. **İletişim** - `/contact`

### elselif.com için:
1. **Ana Sayfa** - `/`
2. **Yazılar** - `/writes`
3. **Kategoriler** - `/categories`
4. **Çalışma Alanları** - `/workspaces`
5. **Hakkımda** - `/about`
6. **İletişim** - `/contact`

## 🎯 Sitelinks Optimizasyonu

### 1. Sayfa Başlıkları

**İyi Örnekler:**
```
Yazılar - Check-up Codes
Testler - Check-up Codes
Sertifikalar - Check-up Codes
```

**Kötü Örnekler:**
```
Check-up Codes - Yazılar - Blog - Makaleler
Tüm Testler ve Quizler - Check-up Codes
```

### 2. Meta Açıklamaları

**Yazılar Sayfası:**
```
Laravel, Vue.js, React ve modern web teknolojileri üzerine 
Türkçe yazılar. Tutorial, kod örnekleri ve best practice'ler.
```

**Testler Sayfası:**
```
Yazılım bilginizi test edin. JavaScript, PHP, Laravel, Vue.js 
ve daha fazlası üzerine interaktif testler.
```

### 3. URL Yapısı

**İyi:**
```
/writes
/tests
/certificates
/about
```

**Kötü:**
```
/index.php?page=writes
/content/articles/list
/test-page-1
```

## 🔍 Sitelinks Kontrolü

### Google Search Console'da Kontrol

1. Search Console'a gidin
2. "Performans" bölümüne tıklayın
3. "Sayfalar" sekmesine geçin
4. En çok tıklanan sayfaları görün

**Sitelinks Adayları:**
- En çok tıklanan 5-10 sayfa
- Düzenli trafik alan sayfalar
- Net başlığı olan sayfalar

### Manuel Kontrol

Google'da şunları arayın:
```
site:checkupcodes.com
```

**Kontrol Edin:**
- Kaç sayfa indekslendi?
- Hangi sayfalar ilk sırada?
- Başlıklar doğru mu?
- Açıklamalar doğru mu?

## 💡 Sitelinks İpuçları

### Google'ın Sitelinks Seçme Kriterleri

1. **Popülerlik**
   - En çok ziyaret edilen sayfalar
   - En çok tıklanan linkler
   - Düzenli trafik

2. **Yapı**
   - Net navigasyon
   - Mantıklı hiyerarşi
   - Temiz URL'ler

3. **İçerik**
   - Kaliteli içerik
   - Özgün bilgi
   - Güncel içerik

4. **Kullanıcı Deneyimi**
   - Hızlı yükleme
   - Mobil uyumlu
   - Kolay navigasyon

### Sitelinks'i Hızlandırma

1. **Marka Aramaları Artırın**
   - Sosyal medyada paylaşın
   - Email imzanızda site adınız
   - Offline reklamlarda site adı

2. **İç Linkleri Güçlendirin**
   - Ana sayfadan önemli sayfalara link
   - Footer'da önemli linkler
   - Sidebar'da popüler içerikler

3. **Kullanıcı Davranışını İyileştirin**
   - Hızlı site
   - Kolay navigasyon
   - Mobil uyumlu
   - İyi UX

## ⚠️ Sık Yapılan Hatalar

### 1. Sabırsızlık
❌ "1 hafta oldu, neden sitelinks yok?"
✅ 2-6 ay sabırla bekleyin

### 2. İçerik Eksikliği
❌ 5 yazı ile sitelinks bekleme
✅ Minimum 20-30 kaliteli içerik

### 3. Teknik Hatalar
❌ Broken linkler, 404 hataları
✅ Tüm linkler çalışmalı

### 4. Tutarsız Yapı
❌ Her sayfada farklı menü
✅ Tutarlı navigasyon

### 5. Kötü UX
❌ Yavaş site, mobil uyumsuz
✅ Hızlı, responsive, kullanıcı dostu

## 📈 İlerleme Takibi

### Haftalık Kontrol

**Google Search Console:**
- [ ] Yeni sayfalar indekslendi mi?
- [ ] Hata var mı?
- [ ] Tıklama sayısı arttı mı?
- [ ] Gösterim sayısı arttı mı?

**Google Analytics:**
- [ ] Ziyaretçi sayısı
- [ ] Sayfa görüntüleme
- [ ] Ortalama oturum süresi
- [ ] Hemen çıkma oranı

### Aylık Kontrol

- [ ] Kaç yeni içerik eklendi?
- [ ] Hangi içerikler popüler?
- [ ] Arama sıralamaları nasıl?
- [ ] Sitelinks görünüyor mu?

## 🎉 Başarı Kriterleri

### Sitelinks Göründüğünde:

✅ **Tebrikler!** Şunları başardınız:
- Google sitenizi güvenilir buluyor
- İçerikleriniz kaliteli
- Site yapınız optimize
- Kullanıcılar sitenizi seviyor

### Sonraki Adımlar:

1. **Rich Snippets**
   - Yıldız puanları
   - Fiyat bilgileri
   - Etkinlik tarihleri

2. **Featured Snippets**
   - "Nasıl yapılır" içerikleri
   - Liste içerikleri
   - Tablo içerikleri

3. **Knowledge Panel**
   - Marka bilgileri
   - Logo
   - Sosyal medya profilleri

## 📚 Kaynaklar

- [Google Search Central](https://developers.google.com/search)
- [Sitelinks Hakkında](https://developers.google.com/search/docs/appearance/sitelinks)
- [Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Search Console Yardım](https://support.google.com/webmasters)

## 🚀 Özet

**Şu Anda:**
- ✅ Teknik altyapı hazır
- ✅ Structured data aktif
- ✅ SEO optimize

**Yapılacaklar:**
- [ ] Search Console kurulumu
- [ ] Sitemap gönderimi
- [ ] İçerik üretimi
- [ ] Sabırla bekleme (2-6 ay)

**Sonuç:**
Google Sitelinks gösterecek! Ama zaman ve kaliteli içerik gerekiyor. 

**Önemli:** SEO bir maraton, sprint değil! 🏃‍♂️💨
