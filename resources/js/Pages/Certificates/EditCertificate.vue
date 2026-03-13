<template>
  <LayoutCertificates>
    <template #screen>
      <CheckScreen>
        <div class="space-y-4 py-6">
          <h1 class="text-2xl font-bold text-foreground">Sertifika Düzenle</h1>

          <form @submit.prevent="submit" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Başlık <span class="text-destructive">*</span></label>
              <input
                v-model="form.title"
                type="text"
                required
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.title }"
                placeholder="Sertifika adı"
              />
              <p v-if="form.errors.title" class="mt-1 text-xs text-destructive">{{ form.errors.title }}</p>
            </div>

            <!-- Issuer -->
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Veren Kurum <span class="text-destructive">*</span></label>
              <input
                v-model="form.issuer"
                type="text"
                required
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.issuer }"
                placeholder="Örn: Coursera, Udemy, Microsoft"
              />
              <p v-if="form.errors.issuer" class="mt-1 text-xs text-destructive">{{ form.errors.issuer }}</p>
            </div>

            <!-- Description -->
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label>
              <textarea
                v-model="form.description"
                rows="4"
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.description }"
                placeholder="Sertifika hakkında detaylar..."
              />
              <p v-if="form.errors.description" class="mt-1 text-xs text-destructive">{{ form.errors.description }}</p>
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
            <div class="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <svg
                  v-if="form.processing"
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
                {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
              </button>
            </div>
          </form>
        </div>
    </CheckScreen>
    </template>
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
