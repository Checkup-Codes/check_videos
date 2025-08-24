# 🎨 Tema Sistemi Dokümantasyonu

Bu proje, çoklu tema desteği ile geliştirilmiştir. Kullanıcılar farklı temalar arasında geçiş yapabilir ve her tema kendine özgü renk paleti, tipografi ve stil özelliklerine sahiptir.

## 🧙‍♂️ Lord of the Rings Teması

Lord of the Rings teması, J.R.R. Tolkien'in efsanevi dünyasından ilham alınarak tasarlanmıştır.

### Renk Paleti
- **Primary**: Altın sarısı (#d4af37) - Yüzük'ün parıltısını temsil eder
- **Secondary**: Kahverengi (#8b4513) - Orta Dünya'nın topraklarını temsil eder
- **Accent**: Parlak altın (#ffd700) - Elflerin işçiliğini temsil eder
- **Neutral**: Koyu kahve (#2d1810) - Mordor'un karanlığını temsil eder
- **Base-100**: Açık bej (#f5f5dc) - Shire'ın huzurunu temsil eder

### Özellikler
- **Font**: Cinzel - Orta Çağ tarzı serif font
- **Border Radius**: 0.75rem - Yumuşak köşeler
- **Shadows**: Kahverengi tonlarında gölgeler
- **Animations**: Hover efektleri ve geçişler
- **Gradients**: Altın ve kahverengi tonlarında gradyanlar

## 🎯 Mevcut Temalar

1. **Light** - Varsayılan açık tema
2. **Dark** - Koyu tema
3. **LotR** - Lord of the Rings teması

## 🎨 Tema Yönetimi

Tema yönetimi, `/theme-management` route'unda ayrı bir sayfa olarak çalışır.

### Özellikler
- **Ayrı Sayfa**: `/theme-management` route'unda normal sayfa
- **Mevcut Tema Bilgisi**: Aktif temanın detayları
- **Tema Paletleri**: Tüm temaların renk paleti önizlemesi
- **Detay Modal**: Tema detaylarını gösteren modal
- **Tema Değiştirme**: Tek tıkla tema değiştirme
- **Renk Kodları**: Her rengin hex kodları
- **Özellik Listesi**: Her temanın özellikleri
- **Örnek Bileşenler**: Tema ile uyumlu bileşen örnekleri

### Kullanım
1. Navigation'da "🎨 Tema Yönetimi" linkine tıklayın
2. `/theme-management` sayfasına yönlendirilirsiniz
3. Tema kartlarından birini seçin (detay modalı açılır)
4. Detay modalında tema özelliklerini inceleyin
5. "Bu Temayı Seç" butonuna tıklayarak temayı değiştirin
6. Modal'ı kapatmak için "Kapat" butonuna tıklayın

## 🔧 Teknik Detaylar

### Tema Değiştirme
Temalar Vuex store üzerinden yönetilir:

```javascript
// Tema değiştirme
store.dispatch('Theme/changeTheme', 'lotr');

// Mevcut temayı alma
const currentTheme = store.getters['Theme/getCurrentTheme'];

// Tüm temaları alma
const availableThemes = store.getters['Theme/getAvailableThemes'];
```

### CSS Değişkenleri
Her tema için CSS custom properties tanımlanmıştır:

```css
html[data-theme='lotr'] {
  --p: 25 70% 45%; /* primary */
  --s: 15 60% 35%; /* secondary */
  --a: 45 80% 55%; /* accent */
  --n: 20 30% 15%; /* neutral */
  --b1: 30 20% 92%; /* base-100 */
  --border-radius: 0.75rem;
  --shadow: 0 4px 6px -1px rgba(139, 69, 19, 0.3);
}
```

### LocalStorage
Tema tercihi localStorage'da saklanır:
- Key: `theme`
- Value: Tema adı (örn: `lotr`, `dark`, `light`)

## 🎨 Yeni Tema Ekleme

Yeni bir tema eklemek için:

1. **Theme Store'u güncelle** (`resources/js/Store/Modules/Theme.js`):
   ```javascript
   availableThemes: ['light', 'dark', 'lotr', 'yeni-tema']
   ```

2. **CSS değişkenlerini ekle** (`resources/css/app.css`):
   ```css
   html[data-theme='yeni-tema'] {
     --p: [primary-hsl];
     --s: [secondary-hsl];
     --a: [accent-hsl];
     /* ... diğer değişkenler */
   }
   ```

3. **DaisyUI temasını ekle** (`tailwind.config.js`):
   ```javascript
   themes: [
     // ... mevcut temalar
     {
       'yeni-tema': {
         primary: "#renk-kodu",
         secondary: "#renk-kodu",
         // ... diğer renkler
       }
     }
   ]
   ```

4. **ThemeSwitcher'a ikon ekle** (`resources/js/Layouts/_components/ThemeSwitcher.vue`)

5. **ThemeManagement.vue sayfasında tema yönetimi fonksiyonlarını güncelle**:
   - `getThemeIcon()` fonksiyonuna ikon ekle
   - `getThemeName()` fonksiyonuna isim ekle
   - `getThemeDescription()` fonksiyonuna açıklama ekle
   - `getThemeColors()` fonksiyonuna renkler ekle
   - `getThemeColorDetails()` fonksiyonuna renk detayları ekle
   - `getThemeFeatures()` fonksiyonuna özellikler ekle

## 🧪 Test Etme

Tema değişikliklerini test etmek için:

1. **Tema Yönetimi Sayfası**: `/theme-management` route'una gidin
2. **ThemeSwitcher**: Sidebar'daki tema değiştirici
3. **Navigation**: AuthenticatedLayout'ta tema yönetimi linki

## 📱 Responsive Tasarım

Tüm temalar responsive tasarım prensiplerine uygun olarak geliştirilmiştir:
- Mobile-first yaklaşım
- Breakpoint'lere uygun renk geçişleri
- Touch-friendly buton boyutları

## 🎭 Animasyonlar

Lord of the Rings teması özel animasyonlar içerir:
- Hover efektleri
- Geçiş animasyonları
- Transform efektleri
- Shadow animasyonları

## 🔍 Browser Desteği

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📝 Notlar

- Tema değişiklikleri anında uygulanır
- LocalStorage'da tema tercihi saklanır
- Sayfa yenilendiğinde tema korunur
- Tüm bileşenler tema sistemini destekler
- Tema yönetimi sayfası modal kullanır
- Renk paletleri görsel olarak gösterilir
