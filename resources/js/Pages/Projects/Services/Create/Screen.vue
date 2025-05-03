<template>
  <CheckScreen>
    <GoBackButton url="/services" />
    <TopScreen title="Yeni Servis Oluştur" />

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
              <span class="label-text">Servis Kısa Adı</span>
            </label>
            <input
              v-model="form.slug"
              type="text"
              class="input-bordered input w-full"
              placeholder="Servis kısa adı"
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
              required
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
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                class="input-bordered input w-full"
                placeholder="Üst kategori arayın ve seçin"
                @focus="showDropdown = true"
                @blur="hideDropdownWithDelay"
              />
              <ul
                v-if="showDropdown && filteredCategories.length"
                class="menu absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow"
              >
                <li v-for="parent in filteredCategories" :key="parent.id">
                  <a @click.prevent="selectParent(parent)">{{ parent.name }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="divider"></div>

          <div class="flex justify-end gap-2">
            <Link href="/services" class="btn btn-ghost">İptal</Link>
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
              Servisi Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const parentOptions = computed(() => props.services || []);

const form = useForm({
  name: '',
  slug: '',
  description: '',
  price: null,
  parent_id: null,
});

const searchQuery = ref('');
const showDropdown = ref(false);

const filteredCategories = computed(() => {
  if (!searchQuery.value) return parentOptions.value;
  return parentOptions.value.filter((parent) => parent.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const selectParent = (parent) => {
  form.parent_id = parent.id;
  searchQuery.value = parent.name;
  showDropdown.value = false;
};

const hideDropdownWithDelay = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const handleSubmit = () => {
  form.post('/services');
};
</script>
