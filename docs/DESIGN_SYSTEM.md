# Tasarım Sistemi Rehberi

## 📐 Layout Yapısı

### 1. CheckScreen Wrapper (Tüm Sayfalarda)
```vue
<CheckScreen>
  <!-- İçerik buraya -->
</CheckScreen>
```
- Otomatik padding: `px-2 sm:px-4 lg:px-8`
- Max width: `max-w-[920px]` (1800px+ ekranlarda centered)
- Scroll: Otomatik overflow handling

### 2. Form Container
```vue
<div class="space-y-4 py-6">
  <form @submit.prevent="submitForm" class="space-y-4">
    <!-- Form fields -->
  </form>
</div>
```
- Üst padding: `py-6` (tutarlı)
- Form içi spacing: `space-y-4`

## 🎯 Form Elemanları

### Input Field Pattern
```vue
<div ref="fieldRef">
  <label class="mb-1 block text-sm font-medium text-foreground">
    Label <span v-if="required" class="text-destructive">*</span>
  </label>
  <input
    type="text"
    v-model="form.field"
    placeholder="Placeholder text"
    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="{ 'border-destructive focus-visible:ring-destructive': errors.field || form.errors.field }"
  />
  <p v-if="errors.field || form.errors.field" class="mt-1 text-xs text-destructive">
    {{ errors.field || form.errors.field }}
  </p>
</div>
```

### Textarea Pattern
```vue
<div ref="fieldRef">
  <label class="mb-1 block text-sm font-medium text-foreground">Label</label>
  <textarea
    v-model="form.field"
    rows="4"
    placeholder="Placeholder text"
    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="{ 'border-destructive focus-visible:ring-destructive': errors.field || form.errors.field }"
  ></textarea>
  <p v-if="errors.field || form.errors.field" class="mt-1 text-xs text-destructive">
    {{ errors.field || form.errors.field }}
  </p>
</div>
```

### Select Pattern
```vue
<div ref="fieldRef">
  <label class="mb-1 block text-sm font-medium text-foreground">Label</label>
  <select
    v-model="form.field"
    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="{ 'border-destructive focus-visible:ring-destructive': errors.field || form.errors.field }"
  >
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <p v-if="errors.field || form.errors.field" class="mt-1 text-xs text-destructive">
    {{ errors.field || form.errors.field }}
  </p>
</div>
```

### Radio Group Pattern (Status Selection)
```vue
<div ref="statusRef" class="md:col-span-2">
  <label class="mb-2 block text-sm font-medium text-foreground">Durum</label>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
    <label
      v-for="option in options"
      :key="option.value"
      class="relative flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all duration-200"
      :class="{
        'border-primary bg-primary/10 ring-2 ring-primary/20 dark:bg-primary/20': form.field === option.value,
        'border-border bg-background hover:border-primary/50 hover:bg-accent': form.field !== option.value,
      }"
    >
      <input
        type="radio"
        :value="option.value"
        v-model="form.field"
        class="h-5 w-5 cursor-pointer border-2 border-muted-foreground/30 text-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <component :is="option.icon" class="h-5 w-5" />
          <span class="text-sm font-semibold">{{ option.label }}</span>
        </div>
        <p class="mt-1 text-xs text-muted-foreground">{{ option.description }}</p>
      </div>
    </label>
  </div>
</div>
```

### Checkbox Pattern
```vue
<label class="relative flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all duration-200"
  :class="form.field ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-border bg-background hover:border-primary/50 hover:bg-accent'"
>
  <input
    type="checkbox"
    v-model="form.field"
    class="mt-0.5 h-5 w-5 cursor-pointer rounded border-2 border-muted-foreground/30 bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  />
  <div class="flex-1">
    <div class="flex items-center gap-2">
      <svg class="h-5 w-5" />
      <span class="text-sm font-semibold">Label</span>
    </div>
    <p class="mt-1 text-xs text-muted-foreground">Description</p>
  </div>
</label>
```

## 🔘 Button Patterns

### Primary Button
```vue
<button
  type="submit"
  :disabled="form.processing"
  class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
>
  <svg v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
  {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
</button>
```

### Secondary Button
```vue
<button
  type="button"
  class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
>
  Button Text
</button>
```

### Button Group (Form Actions)
```vue
<div class="flex justify-end gap-2 pt-2">
  <button type="button" @click="resetForm" class="secondary-button">
    Sıfırla
  </button>
  <button type="submit" :disabled="form.processing" class="primary-button">
    Kaydet
  </button>
</div>
```

## 📱 Responsive Grid

### Two Column Form
```vue
<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <!-- Full width field -->
  <div class="md:col-span-2">
    <!-- Field -->
  </div>
  
  <!-- Half width fields -->
  <div><!-- Field 1 --></div>
  <div><!-- Field 2 --></div>
</div>
```

## 🎨 Spacing Standards

- Form container: `py-6`
- Form fields: `space-y-4`
- Field label margin: `mb-1`
- Error message margin: `mt-1`
- Button group padding: `pt-2`
- Button gap: `gap-2`
- Grid gap: `gap-4`

## 🎯 Height Standards

- Input/Select: `h-9`
- Textarea: `min-h-[80px]` or rows attribute
- Button: `h-9`
- Checkbox/Radio: `h-5 w-5`

## 🎨 Color Tokens

- Text: `text-foreground`
- Muted text: `text-muted-foreground`
- Background: `bg-background`
- Border: `border-border`
- Input border: `border-input`
- Error: `text-destructive` / `border-destructive`
- Primary: `bg-primary` / `text-primary-foreground`
- Accent: `bg-accent` / `text-accent-foreground`

## 📋 Page Structure Templates

### Create/Edit Page (Without Sidebar)
```vue
<template>
  <CheckScreen>
    <GoBackButton :url="backUrl" />
    <div class="space-y-4 py-6">
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Form fields -->
        <div class="flex justify-end gap-2 pt-2">
          <!-- Buttons -->
        </div>
      </form>
    </div>
  </CheckScreen>
</template>
```

### Index Page (Without Sidebar)
```vue
<template>
  <CheckScreen>
    <IntroScreen :title="pageTitle" />
    <!-- Content -->
  </CheckScreen>
</template>
```

### Page with Sidebar
```vue
<template>
  <LayoutModule>
    <template #screen>
      <CheckScreen>
        <!-- Content -->
      </CheckScreen>
    </template>
  </LayoutModule>
</template>
```

## ✅ Checklist

Yeni sayfa oluştururken:
- [ ] CheckScreen wrapper kullanıldı mı?
- [ ] Form container `space-y-4 py-6` class'larına sahip mi?
- [ ] Input height'ları `h-9` mi?
- [ ] Label'lar `mb-1 block text-sm font-medium text-foreground` class'larına sahip mi?
- [ ] Error mesajları `mt-1 text-xs text-destructive` class'larına sahip mi?
- [ ] Button'lar standart pattern'i takip ediyor mu?
- [ ] Responsive grid kullanıldı mı? (`md:grid-cols-2`)
- [ ] GoBackButton eklendi mi? (create/edit sayfalarında)
- [ ] Form processing state gösteriliyor mu?
- [ ] Disabled state'ler doğru çalışıyor mu?
