# Kelime Sözlüğü - Google Benzeri Arama Arayüzü

## Özellikler

### 🎯 Ana Özellikler
- **Google benzeri arama arayüzü**: Temiz ve modern tasarım
- **Anlık kelime arama**: Enter tuşu ile hızlı arama
- **Detaylı kelime bilgileri**: Anlamlar, örnek cümleler, eş anlamlılar
- **Öğrenme istatistikleri**: Tekrar sayısı, yanlış sayısı, öğrenme durumu
- **Dil paketi bilgileri**: Kelimenin hangi paketlerde bulunduğu
- **Responsive tasarım**: Mobil ve masaüstü uyumlu

### 🔍 Arama Fonksiyonu
- Kelime adına göre arama
- Anlam içeriğine göre arama
- Büyük/küçük harf duyarsız
- Kısmi eşleşme desteği

### 📊 Gösterilen Bilgiler
1. **Kelime Bilgileri**
   - Kelime adı
   - Ana anlam
   - Kelime türü (İsim, Fiil, Sıfat, Zarf)
   - Dil bilgisi

2. **Anlamlar**
   - Ana anlam (vurgulanmış)
   - Diğer anlamlar
   - Anlam sıralaması

3. **Öğrenme İstatistikleri**
   - Öğrenme durumu (Öğrenilmedi/Öğreniliyor/Öğrenildi)
   - Tekrar sayısı
   - Yanlış sayısı

4. **Dil Paketleri**
   - Kelimenin bulunduğu tüm paketler
   - Paket adları ve dilleri

5. **Örnek Cümleler**
   - Kelime ile ilgili örnek cümleler
   - Çeviriler (varsa)

6. **Eş Anlamlılar**
   - Kelimenin eş anlamlıları
   - Dil bilgisi ile birlikte

## Teknik Detaylar

### Backend (Laravel)
- **Controller**: `WordController@searchWord`
- **Route**: `POST /rendition/words/search`
- **Response**: JSON formatında kelime detayları

### Frontend (Vue.js)
- **Component**: `Screen.vue`
- **API Call**: Fetch API ile AJAX isteği
- **State Management**: Vue 3 Composition API
- **Styling**: Tailwind CSS

### Veritabanı İlişkileri
- `lang_words` - Ana kelime tablosu
- `lang_word_meanings` - Kelime anlamları
- `lang_example_sentences` - Örnek cümleler
- `lang_synonyms` - Eş anlamlılar
- `lang_language_packs` - Dil paketleri
- `lang_word_pack_relations` - Kelime-paket ilişkileri

## Kullanım

1. **Arama Yapma**
   - Arama kutusuna kelime yazın
   - Enter tuşuna basın veya "Ara" butonuna tıklayın

2. **Sonuçları Görüntüleme**
   - Kelime bulunursa detaylı bilgiler gösterilir
   - Bulunamazsa uygun mesaj gösterilir

3. **Kelime Düzenleme**
   - Giriş yapmış kullanıcılar "Düzenle" butonunu görebilir
   - Kelime düzenleme sayfasına yönlendirilir

## Güvenlik

- CSRF token koruması
- Kullanıcı doğrulama (düzenleme için)
- SQL injection koruması
- XSS koruması

## Performans

- Lazy loading ile ilişkili veriler
- Optimized database queries
- Caching desteği (gelecekte eklenebilir)
- Responsive image loading
