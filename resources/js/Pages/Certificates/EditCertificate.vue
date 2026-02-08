<template>
  <LayoutCertificates>
    <CheckScreen>
      <div class="p-6 pt-12 sm:p-8 sm:pt-16">
        <div class="mx-auto max-w-3xl">
          <h1 class="mb-8 text-2xl font-bold text-foreground">Sertifika Düzenle</h1>

          <form @submit.prevent="submit" class="space-y-6">
            <!-- Title -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Başlık <span class="text-destructive">*</span></label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Sertifika adı"
              />
              <p v-if="form.errors.title" class="mt-1 text-sm text-destructive">{{ form.errors.title }}</p>
            </div>

            <!-- Issuer -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Veren Kurum <span class="text-destructive">*</span></label>
              <input
                v-model="form.issuer"
                type="text"
                required
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Örn: Coursera, Udemy, Microsoft"
              />
              <p v-if="form.errors.issuer" class="mt-1 text-sm text-destructive">{{ form.errors.issuer }}</p>
            </div>

            <!-- Description -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Açıklama</label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Sertifika hakkında detaylar..."
              />
            </div>

            <!-- Image Upload -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Sertifika Görseli</label>
              <div class="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <div v-if="imagePreview" class="mt-4">
                <img :src="imagePreview" alt="Preview" class="h-48 rounded-lg border border-border object-contain" />
              </div>
              <p v-if="form.errors.image" class="mt-1 text-sm text-destructive">{{ form.errors.image }}</p>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">Alınma Tarihi <span class="text-destructive">*</span></label>
                <input
                  v-model="form.issue_date"
                  type="date"
                  required
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p v-if="form.errors.issue_date" class="mt-1 text-sm text-destructive">{{ form.errors.issue_date }}</p>
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">Geçerlilik Sonu</label>
                <input
                  v-model="form.expiry_date"
                  type="date"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <!-- Credential Info -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">Sertifika ID</label>
                <input
                  v-model="form.credential_id"
                  type="text"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="ABC123XYZ"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">Doğrulama URL</label>
                <input
                  v-model="form.credential_url"
                  type="url"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
              </div>
            </div>

            <!-- Skills -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Beceriler</label>
              <div class="space-y-2">
                <div v-for="(skill, index) in form.skills" :key="index" class="flex gap-2">
                  <input
                    v-model="form.skills[index]"
                    type="text"
                    class="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Beceri adı"
                  />
                  <button
                    type="button"
                    @click="removeSkill(index)"
                    class="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addSkill"
                  class="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Beceri Ekle
                </button>
              </div>
            </div>

            <!-- Status -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Durum <span class="text-destructive">*</span></label>
              <select
                v-model="form.status"
                required
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="active">Aktif</option>
                <option value="expired">Süresi Doldu</option>
                <option value="draft">Taslak</option>
              </select>
            </div>

            <!-- Display Order -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Sıralama</label>
              <input
                v-model.number="form.display_order"
                type="number"
                min="0"
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
              <p class="mt-1 text-xs text-muted-foreground">Küçük sayılar önce gösterilir</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 border-t border-border pt-6">
              <button
                type="submit"
                :disabled="form.processing"
                class="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </CheckScreen>
  </LayoutCertificates>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import LayoutCertificates from './_layouts/LayoutCertificates.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  certificate: Object,
  screen: Object,
});

const form = useForm({
  title: props.certificate.title,
  issuer: props.certificate.issuer,
  description: props.certificate.description,
  image: null,
  issue_date: props.certificate.issue_date,
  expiry_date: props.certificate.expiry_date,
  credential_id: props.certificate.credential_id,
  credential_url: props.certificate.credential_url,
  skills: props.certificate.skills || [],
  status: props.certificate.status,
  display_order: props.certificate.display_order,
  _method: 'PUT',
});

const imagePreview = ref(props.certificate.image);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const addSkill = () => {
  form.skills.push('');
};

const removeSkill = (index) => {
  form.skills.splice(index, 1);
};

const submit = () => {
  form.post(route('certificates.update', props.certificate.id));
};
</script>
