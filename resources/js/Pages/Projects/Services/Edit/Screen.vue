<template>
  <CheckScreen>
    <GoBackButton :url="`/services/${form.id}`" />
    <TopScreen title="Servisi Düzenle" />

    <!-- Card component directly implemented -->
    <div
      class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
    >
      <div class="card-body p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="divider">Servis Bilgileri</div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Servis Adı</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="input-bordered input w-full"
              placeholder="Servis adı"
              required
            />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Servis Açıklaması</span>
            </label>
            <textarea
              v-model="form.description"
              class="textarea-bordered textarea min-h-[120px] w-full"
              placeholder="Servis açıklaması"
            ></textarea>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Fiyat</span>
            </label>
            <div class="input-group">
              <input v-model="form.price" type="number" class="input-bordered input w-full" placeholder="Fiyat" />
              <span class="bg-primary text-primary-content">USD</span>
            </div>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Üst Kategori</span>
            </label>
            <select v-model="form.parent_id" class="select-bordered select w-full">
              <option :value="null">Yok</option>
              <option v-for="parent in parentOptions" :key="parent.id" :value="parent.id">
                {{ parent.name }}
              </option>
            </select>
          </div>

          <div class="divider">Alt Kategoriler</div>

          <div v-if="form.subCategories.length === 0" class="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Henüz alt kategori bulunmamaktadır. "Alt Kategori Ekle" butonuyla ekleyebilirsiniz.</span>
          </div>

          <div
            v-for="(subCategory, index) in form.subCategories"
            :key="index"
            class="rounded-r-lg border-l-4 border-primary bg-base-100 p-4 shadow-sm"
          >
            <div class="form-control mb-2 w-full">
              <label class="label">
                <span class="label-text">Alt Kategori Adı</span>
              </label>
              <input
                v-model="subCategory.name"
                type="text"
                class="input-bordered input w-full"
                placeholder="Alt kategori adı"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Fiyat</span>
              </label>
              <div class="input-group">
                <input
                  v-model="subCategory.price"
                  type="number"
                  class="input-bordered input w-full"
                  placeholder="Fiyat"
                />
                <span class="bg-primary text-primary-content">USD</span>
              </div>
            </div>

            <div class="mt-4 flex justify-end">
              <button @click.prevent="removeSubCategory(index)" class="btn btn-error btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Kaldır
              </button>
            </div>
          </div>

          <button @click.prevent="addSubCategory" class="btn btn-primary btn-outline w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Alt Kategori Ekle
          </button>

          <div class="divider"></div>

          <div class="flex items-center justify-between">
            <button @click.prevent="deleteService" class="btn btn-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Servisi Sil
            </button>
            <div class="flex gap-2">
              <Link :href="`/services/${form.id}`" class="btn btn-ghost">İptal</Link>
              <button type="submit" class="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, useForm, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const service = computed(() => props.service || {});

const form = useForm({
  id: service.value.id,
  name: service.value.name || '',
  description: service.value.description || '',
  price: service.value.price || '',
  parent_id: service.value.parent_id || null,
  subCategories: service.value.subCategories || [],
});

const parentOptions = computed(() => {
  return (props.services || []).filter((s) => s.id !== form.id);
});

const addSubCategory = () => {
  form.subCategories.push({ name: '', price: '' });
};

const removeSubCategory = (index) => {
  form.subCategories.splice(index, 1);
};

const handleSubmit = () => {
  form.put(`/services/${form.id}`);
};

const deleteService = () => {
  if (confirm('Bu servisi silmek istediğinize emin misiniz?')) {
    form.delete(`/services/${form.id}`);
  }
};
</script>
