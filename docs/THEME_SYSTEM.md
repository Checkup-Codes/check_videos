# 🎨 Tema Sistemi Dokümantasyonu

Bu dokümantasyon, uygulamanın tema sistemini ve nasıl kullanılacağını açıklar.

## 🌟 Özellikler

- **Her temanın hem light hem dark versiyonu** - Sistem tercihi yerine tam kontrol
- **13 farklı tema seçeneği** - Light, Dark, Neon, LOTR, Cyberpunk, Nature, Ocean, Sunset ve Custom
- **Gerçek zamanlı tema değiştirme** - Anında görsel geri bildirim
- **LocalStorage desteği** - Tema tercihi tarayıcıda saklanır
- **Responsive tasarım** - Tüm cihazlarda uyumlu
- **Özelleştirilebilir temalar** - Custom tema ile kendi renklerinizi seçin

## 🎯 Mevcut Temalar

### Temel Temalar
- **Light** ☀️ - Klasik açık tema
- **Dark** 🌙 - Klasik koyu tema

### Neon Temalar
- **Neon Light** 💡☀️ - Futuristik neon açık tema
- **Neon Dark** 💡🌙 - Futuristik neon koyu tema

### Lord of the Rings Temalar
- **LOTR Light** 🧙‍♂️☀️ - Orta Çağ tarzı açık tema
- **LOTR Dark** 🧙‍♂️🌙 - Orta Çağ tarzı koyu tema

### Cyberpunk Temalar
- **Cyberpunk Light** 🤖☀️ - Cyberpunk estetiği açık tema
- **Cyberpunk Dark** 🤖🌙 - Cyberpunk estetiği koyu tema

### Nature Temalar
- **Nature Light** 🌿☀️ - Doğa temalı açık tema
- **Nature Dark** 🌿🌙 - Doğa temalı koyu tema

### Ocean Temalar
- **Ocean Light** 🌊☀️ - Okyanus temalı açık tema
- **Ocean Dark** 🌊🌙 - Okyanus temalı koyu tema

### Sunset Temalar
- **Sunset Light** 🌅☀️ - Gün batımı temalı açık tema
- **Sunset Dark** 🌅🌙 - Gün batımı temalı koyu tema

### Özel Tema
- **Custom** ⚙️ - Kendi renklerinizi ve ayarlarınızı özelleştirin

## 🚀 Kullanım

### Tema Değiştirme
1. **ThemeSwitcher** butonuna tıklayın (header'da)
2. **ThemeManagement** sayfasına gidin (`/theme-management`)
3. İstediğiniz temayı seçin
4. Tema anında uygulanır

### Tema Yönetimi Sayfası
1. Sol menüden "Tema Yönetimi" seçeneğine tıklayın
2. Mevcut tema bilgisini görüntüleyin
3. Tema kartlarından birini seçin
4. Detay modalında tema özelliklerini inceleyin
5. "Bu Temayı Seç" butonuna tıklayarak temayı değiştirin
6. Modal'ı kapatmak için "Kapat" butonuna tıklayın

## 🔧 Teknik Detaylar

### Tema Değiştirme
Temalar Vuex store üzerinden yönetilir:

```javascript
// Tema değiştirme
store.dispatch('Theme/changeTheme', 'lotr-light');

// Mevcut temayı alma
const currentTheme = store.getters['Theme/getCurrentTheme'];

// Tüm temaları alma
const availableThemes = store.getters['Theme/getAvailableThemes'];
```

### CSS Değişkenleri
Her tema için CSS custom properties tanımlanmıştır:

```css
html[data-theme='lotr-light'] {
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
- Value: Tema adı (örn: `lotr-light`, `neon-dark`, `dark`)

## 🎨 Yeni Tema Ekleme

Yeni bir tema eklemek için:

1. **Theme Store'u güncelle** (`resources/js/Store/Modules/Theme.js`):
   ```javascript
   availableThemes: [
     // ... mevcut temalar
     'yeni-tema-light', 'yeni-tema-dark'
   ]
   ```

2. **CSS değişkenlerini ekle** (`resources/css/app.css`):
   ```css
   html[data-theme='yeni-tema-light'] {
     --p: [primary-hsl];
     --s: [secondary-hsl];
     --a: [accent-hsl];
     /* ... diğer değişkenler */
   }
   
   html[data-theme='yeni-tema-dark'] {
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
       'yeni-tema-light': {
         primary: "#renk-kodu",
         secondary: "#renk-kodu",
         // ... diğer renkler
       }
     },
     {
       'yeni-tema-dark': {
         primary: "#renk-kodu",
         secondary: "#renk-kodu",
         // ... diğer renkler
       }
     }
   ]
   ```

4. **ThemeSwitcher'a ikon ekle** (`resources/js/Layouts/_components/ThemeSwitcher.vue`)

5. **ThemeManagement.vue sayfasında tema yönetimi fonksiyonlarını güncelle**:
   - `getThemeIcon()`
   - `getThemeName()`
   - `getThemeDescription()`
   - `getThemeColors()`
   - `getThemeColorDetails()`
   - `getThemeFeatures()`

## 🔒 Güvenlik ve Performans

- **LocalStorage kullanımı** - Güvenli tema tercihi saklama
- **CSS değişkenleri** - Performanslı tema değiştirme
- **Vuex state management** - Merkezi tema yönetimi
- **Lazy loading** - Sadece gerekli CSS yüklenir

## 🐛 Bilinen Sorunlar

- Sistem tercihi (prefers-color-scheme) artık kullanılmıyor
- Her tema kendi light/dark versiyonunu yönetiyor
- Tarayıcı ayarlarından gelen dark mode etkisiz

## 📝 Notlar

- Tema değişiklikleri anında uygulanır
- Tüm temalar responsive tasarıma sahiptir
- Custom tema ayarları localStorage'da saklanır
- Tema geçişleri yumuşak animasyonlarla yapılır

## 🤝 Katkıda Bulunma

Yeni tema önerileri için:
1. Issue açın
2. Tema konseptini açıklayın
3. Renk paleti önerin
4. Özel özellikler belirtin

## 📞 Destek

Tema sistemi ile ilgili sorunlar için:
- GitHub Issues kullanın
- Detaylı hata açıklaması yapın
- Tarayıcı ve işletim sistemi bilgisi ekleyin
