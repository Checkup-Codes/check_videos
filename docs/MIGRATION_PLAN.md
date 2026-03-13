# Tasarım Sistemi Migrasyon Planı

## 📋 Genel Bakış

WritesCategories modülündeki tutarlı tasarım dilini tüm projeye yaymak için adım adım plan.

## ✅ Tamamlanan İşler

### 1. Dokümantasyon
- [x] DESIGN_SYSTEM.md - Tasarım sistemi rehberi oluşturuldu
- [x] DESIGN_IMPROVEMENTS.md - İyileştirme önerileri dokümante edildi
- [x] MIGRATION_PLAN.md - Bu migrasyon planı oluşturuldu

### 2. Journey Modülü
- [x] CreateJourney.vue - Tasarım sistemi standartlarına uyarlandı
  - CheckScreen wrapper eklendi
  - Input height'ları h-9'a güncellendi
  - Label margin'leri mb-1'e güncellendi
  - Form spacing'i space-y-4'e güncellendi
  - Button stilleri standartlaştırıldı

## 🔄 Devam Eden İşler

### Öncelikli Modüller (Haftaya Yayılabilir)

#### 1. Certificates Modülü
**Dosyalar:**
- [ ] CreateCertificate.vue
- [ ] EditCertificate.vue
- [ ] IndexCertificate.vue
- [ ] ShowCertificate.vue

**Yapılacaklar:**
- CheckScreen wrapper ekle
- Padding'leri standartlaştır (py-6)
- Input height'ları h-9 yap
- Label margin'leri mb-1 yap
- Button stilleri güncelle
- Form spacing'i space-y-4 yap

#### 2. Rendition (Words) Modülü
**Dosyalar:**
- [ ] Create/Screen.vue
- [ ] Edit/Screen.vue
- [ ] Index/Screen.vue
- [ ] Show/Screen.vue

**Yapılacaklar:**
- Aynı standartları uygula
- Özel component'leri (ActivityHeatmap, DuplicateModal) gözden geçir

#### 3. Projects Modülü
**Dosyalar:**
- [ ] Project/Create/Screen.vue
- [ ] Project/Edit/Screen.vue
- [ ] Customers/Create/Screen.vue
- [ ] Services/Index/Screen.vue

**Yapılacaklar:**
- Aynı standartları uygula
- SidebarLayoutProject'i gözden geçir

#### 4. Bookmarks Modülü
**Dosyalar:**
- [ ] Create/CreateBookmark.vue
- [ ] Edit/EditBookmark.vue
- [ ] Index/IndexBookmarks.vue

#### 5. Tests Modülü
**Dosyalar:**
- [ ] Create/CreateTest.vue
- [ ] Edit/EditTest.vue
- [ ] Index/IndexTest.vue

#### 6. Equipment Modülü
**Dosyalar:**
- [ ] Create/CreateEquipment.vue
- [ ] Edit/EditEquipment.vue
- [ ] Index/IndexEquipment.vue

#### 7. Lessons Modülü
**Dosyalar:**
- [ ] Create/CreateLesson.vue
- [ ] Edit/EditLesson.vue
- [ ] Index/IndexLesson.vue

## 🎯 Migrasyon Checklist (Her Sayfa İçin)

### Layout
- [ ] CheckScreen wrapper kullanılıyor mu?
- [ ] Form container `space-y-4 py-6` class'larına sahip mi?
- [ ] Responsive grid kullanılıyor mu? (`md:grid-cols-2`)

### Form Elements
- [ ] Input height'ları `h-9` mi?
- [ ] Label'lar `mb-1 block text-sm font-medium text-foreground` class'larına sahip mi?
- [ ] Error mesajları `mt-1 text-xs text-destructive` class'larına sahip mi?
- [ ] Placeholder'lar `placeholder:text-muted-foreground` kullanıyor mu?
- [ ] Focus state'leri `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` kullanıyor mu?
- [ ] Disabled state'ler `disabled:cursor-not-allowed disabled:opacity-50` kullanıyor mu?

### Buttons
- [ ] Primary button standart pattern'i takip ediyor mu?
- [ ] Secondary button standart pattern'i takip ediyor mu?
- [ ] Button height'ı `h-9` mi?
- [ ] Loading state gösteriliyor mu?
- [ ] Button group `flex justify-end gap-2 pt-2` kullanıyor mu?

### Spacing
- [ ] Form spacing `space-y-4` mi?
- [ ] Button group padding `pt-2` mi?
- [ ] Grid gap `gap-4` mi?

## 🚀 İleri Seviye İyileştirmeler (Opsiyonel)

### Phase 1: Reusable Components
- [ ] FormField component oluştur
- [ ] FormInput component oluştur
- [ ] FormTextarea component oluştur
- [ ] FormSelect component oluştur
- [ ] FormActions component oluştur
- [ ] StatusRadioGroup component oluştur

### Phase 2: Composables
- [ ] useFormValidation composable oluştur
- [ ] useFormSubmit composable oluştur
- [ ] useScrollToError composable oluştur

### Phase 3: Refactoring
- [ ] WritesCategories'i yeni component'lerle refactor et
- [ ] Diğer modülleri yeni component'lerle refactor et

## 📊 İlerleme Takibi

### Modül Durumları
| Modül | Durum | Tamamlanma | Notlar |
|-------|-------|------------|--------|
| WritesCategories | ✅ Tamamlandı | 100% | Referans modül |
| Journey | 🔄 Devam Ediyor | 25% | CreateJourney tamamlandı |
| Certificates | ⏳ Bekliyor | 0% | - |
| Rendition | ⏳ Bekliyor | 0% | - |
| Projects | ⏳ Bekliyor | 0% | - |
| Bookmarks | ⏳ Bekliyor | 0% | - |
| Tests | ⏳ Bekliyor | 0% | - |
| Equipment | ⏳ Bekliyor | 0% | - |
| Lessons | ⏳ Bekliyor | 0% | - |

### Genel İlerleme
- **Tamamlanan Modüller:** 1/9 (11%)
- **Devam Eden Modüller:** 1/9 (11%)
- **Bekleyen Modüller:** 7/9 (78%)

## 🎓 Best Practices

### 1. Test Ederek İlerle
Her sayfa güncellemesinden sonra:
- Formu test et
- Validation'ı test et
- Responsive davranışı kontrol et
- Dark mode'u kontrol et

### 2. Küçük Adımlarla İlerle
- Bir modülü tamamen bitir, sonra diğerine geç
- Her commit'te çalışan kod bırak
- Breaking change'lerden kaçın

### 3. Dokümantasyonu Güncelle
- Yeni pattern'ler eklendiğinde DESIGN_SYSTEM.md'yi güncelle
- Özel durumları dokümante et
- Örnek kodları güncel tut

## 📝 Notlar

### Özel Durumlar
- **Sidebar Layout'lu Sayfalar:** CheckScreen'i sidebar içinde kullan
- **Modal'lar:** Aynı form standartlarını uygula
- **Inline Form'lar:** Daha kompakt spacing kullanabilirsin (space-y-2)

### Dikkat Edilmesi Gerekenler
- Mevcut functionality'yi bozmamaya dikkat et
- Backend validation'ları koru
- Accessibility standartlarını koru
- SEO meta tag'lerini koru

## 🔗 İlgili Dosyalar

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Tasarım sistemi rehberi
- [DESIGN_IMPROVEMENTS.md](./DESIGN_IMPROVEMENTS.md) - İyileştirme önerileri
- [WritesCategories örnek dosyalar](../resources/js/Pages/WritesCategories/)

## 📞 Yardım

Sorularınız için:
1. DESIGN_SYSTEM.md'ye bakın
2. WritesCategories modülündeki örneklere bakın
3. Özel durumlar için bu dosyayı güncelleyin
