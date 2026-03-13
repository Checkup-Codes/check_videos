# WritesCategories Tasarım İyileştirmeleri

## 🎯 Mevcut Güçlü Yönler

1. **CheckScreen Kullanımı**: Tüm sayfalarda tutarlı wrapper
2. **Form Yapısı**: İyi organize edilmiş, temiz kod
3. **Responsive Design**: Mobile-first yaklaşım
4. **Error Handling**: Tutarlı hata gösterimi
5. **Loading States**: Form processing durumları iyi yönetilmiş
6. **Sidebar Layout**: İyi ayrılmış içerik yapısı

## 🔧 Önerilen İyileştirmeler

### 1. Component Extraction (Tekrar Eden Kodları Azaltma)

#### FormField Component Oluştur
```vue
<!-- resources/js/Components/Form/FormField.vue -->
<template>
  <div :ref="fieldRef">
    <label v-if="label" class="mb-1 block text-sm font-medium text-foreground">
      {{ label }}
      <span v-if="required" class="text-destructive">*</span>
    </label>
    
    <slot :hasError="hasError" />
    
    <p v-if="error" class="mt-1 text-xs text-destructive">
      {{ error }}
    </p>
    <p v-if="hint && !error" class="mt-1 text-xs text-muted-foreground">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  error: String,
  hint: String,
  required: Boolean,
  fieldRef: Object,
});

const hasError = computed(() => !!props.error);
</script>
```

**Kullanım:**
```vue
<FormField label="Başlık" :error="errors.title" required>
  <template #default="{ hasError }">
    <input
      v-model="form.title"
      type="text"
      class="form-input"
      :class="{ 'border-destructive': hasError }"
    />
  </template>
</FormField>
```

### 2. Form Input Component
```vue
<!-- resources/js/Components/Form/FormInput.vue -->
<template>
  <FormField :label="label" :error="error" :hint="hint" :required="required">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      :class="{ 'border-destructive focus-visible:ring-destructive': error }"
    />
  </FormField>
</template>

<script setup>
import FormField from './FormField.vue';

defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  label: String,
  placeholder: String,
  error: String,
  hint: String,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
});

defineEmits(['update:modelValue']);
</script>
```

**Kullanım:**
```vue
<FormInput
  v-model="form.title"
  label="Başlık"
  placeholder="Yazının başlığını girin"
  :error="errors.title || form.errors.title"
  required
/>
```

### 3. Form Actions Component
```vue
<!-- resources/js/Components/Form/FormActions.vue -->
<template>
  <div class="flex justify-end gap-2 pt-2">
    <slot name="prepend" />
    
    <button
      v-if="showReset"
      type="button"
      @click="$emit('reset')"
      :disabled="processing"
      class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {{ resetText }}
    </button>
    
    <button
      type="submit"
      :disabled="processing || disabled"
      class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <svg
        v-if="processing"
        class="mr-2 h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ processing ? processingText : submitText }}
    </button>
    
    <slot name="append" />
  </div>
</template>

<script setup>
defineProps({
  processing: Boolean,
  disabled: Boolean,
  showReset: { type: Boolean, default: true },
  submitText: { type: String, default: 'Kaydet' },
  processingText: { type: String, default: 'Kaydediliyor...' },
  resetText: { type: String, default: 'Sıfırla' },
});

defineEmits(['reset']);
</script>
```

### 4. Status Radio Group Component
```vue
<!-- resources/js/Components/Form/StatusRadioGroup.vue -->
<template>
  <FormField :label="label" :error="error">
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <label
        v-for="option in options"
        :key="option.value"
        class="relative flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all duration-200"
        :class="{
          'border-primary bg-primary/10 ring-2 ring-primary/20 dark:bg-primary/20': modelValue === option.value,
          'border-border bg-background hover:border-primary/50 hover:bg-accent': modelValue !== option.value,
        }"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
          class="h-5 w-5 cursor-pointer border-2 border-muted-foreground/30 text-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <component v-if="option.icon" :is="option.icon" class="h-5 w-5" :class="option.iconClass" />
            <span class="text-sm font-semibold" :class="modelValue === option.value ? 'text-foreground' : 'text-foreground/80'">
              {{ option.label }}
            </span>
          </div>
          <p class="mt-1 text-xs" :class="modelValue === option.value ? 'text-muted-foreground' : 'text-muted-foreground/70'">
            {{ option.description }}
          </p>
        </div>
      </label>
    </div>
  </FormField>
</template>

<script setup>
import FormField from './FormField.vue';

defineProps({
  modelValue: String,
  label: String,
  error: String,
  options: Array, // [{ value, label, description, icon?, iconClass? }]
});

defineEmits(['update:modelValue']);
</script>
```

### 5. Composable: useFormValidation
```js
// resources/js/composables/useFormValidation.js
import { ref, nextTick } from 'vue';

export function useFormValidation() {
  const errors = ref({});

  const validateField = (fieldName, value, rules) => {
    errors.value[fieldName] = '';

    if (rules.required && (!value || value.trim() === '')) {
      errors.value[fieldName] = rules.requiredMessage || `${fieldName} zorunludur.`;
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.value[fieldName] = `En az ${rules.minLength} karakter olmalıdır.`;
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.value[fieldName] = `En fazla ${rules.maxLength} karakter olmalıdır.`;
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.value[fieldName] = rules.patternMessage || 'Geçersiz format.';
      return false;
    }

    if (rules.custom && !rules.custom(value)) {
      errors.value[fieldName] = rules.customMessage || 'Geçersiz değer.';
      return false;
    }

    return true;
  };

  const validateForm = (formData, validationRules) => {
    let isValid = true;
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = '';
    });

    Object.keys(validationRules).forEach((fieldName) => {
      const value = formData[fieldName];
      const rules = validationRules[fieldName];
      if (!validateField(fieldName, value, rules)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const scrollToError = (fieldRefs) => {
    nextTick(() => {
      for (const [fieldName, error] of Object.entries(errors.value)) {
        if (error && fieldRefs[fieldName]?.value) {
          fieldRefs[fieldName].value.scrollIntoView({ behavior: 'smooth', block: 'center' });
          nextTick(() => {
            const inputElement = fieldRefs[fieldName].value.querySelector('input, select, textarea');
            if (inputElement) {
              inputElement.focus();
            }
          });
          break;
        }
      }
    });
  };

  const clearErrors = () => {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = '';
    });
  };

  return {
    errors,
    validateField,
    validateForm,
    scrollToError,
    clearErrors,
  };
}
```

### 6. Improved Category Create Form (Örnek)
```vue
<template>
  <div class="space-y-4 py-6">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Name -->
        <div class="md:col-span-2">
          <FormInput
            v-model="form.name"
            label="İsim"
            placeholder="Kategori ismi"
            :error="errors.name || form.errors.name"
            required
          />
        </div>

        <!-- Slug -->
        <FormInput
          v-model="form.slug"
          label="Slug"
          placeholder="kategori-slug"
          :error="errors.slug || form.errors.slug"
          required
        />

        <!-- Parent Category -->
        <CategorySelect
          v-model="form.parent_id"
          :categories="categories"
          label="Üst Kategori"
          :error="errors.parent_id || form.errors.parent_id"
        />

        <!-- Status -->
        <FormSelect
          v-model="form.status"
          label="Durum"
          :options="[
            { value: 'public', label: 'Açık' },
            { value: 'hidden', label: 'Gizli' }
          ]"
          :error="errors.status || form.errors.status"
        />
      </div>

      <FormActions
        :processing="form.processing"
        @reset="resetForm"
      />
    </form>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { watch } from 'vue';
import FormInput from '@/Components/Form/FormInput.vue';
import FormSelect from '@/Components/Form/FormSelect.vue';
import FormActions from '@/Components/Form/FormActions.vue';
import CategorySelect from '@/Components/Form/CategorySelect.vue';
import { useFormValidation } from '@/composables/useFormValidation';

const props = defineProps({
  categories: Array,
});

const form = useForm({
  name: '',
  slug: '',
  parent_id: '',
  status: 'public',
});

const { errors, validateForm } = useFormValidation();

// Auto-generate slug
watch(() => form.name, (newName) => {
  if (!newName) return;
  form.slug = newName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
});

const submitForm = () => {
  const isValid = validateForm(form, {
    name: { required: true, requiredMessage: 'İsim zorunludur.' },
    slug: { required: true, requiredMessage: 'Slug zorunludur.' },
  });

  if (isValid) {
    form.post(route('categories.store'));
  }
};

const resetForm = () => {
  form.reset();
  form.status = 'public';
};
</script>
```

## 📊 Öncelik Sırası

1. **Yüksek Öncelik**: Form component'leri (FormInput, FormField, FormActions)
2. **Orta Öncelik**: Validation composable, CategorySelect
3. **Düşük Öncelik**: Diğer özel component'ler

## 🎯 Beklenen Faydalar

- ✅ %40-50 daha az kod tekrarı
- ✅ Daha kolay bakım
- ✅ Tutarlı kullanıcı deneyimi
- ✅ Daha hızlı yeni sayfa geliştirme
- ✅ Merkezi hata yönetimi
- ✅ Daha iyi test edilebilirlik
