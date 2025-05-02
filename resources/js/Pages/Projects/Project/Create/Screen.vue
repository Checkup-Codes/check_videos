<template>
  <CheckScreen>
    <GoBackButton url="/projects" />
    <TopScreen title="Yeni Proje Oluştur" />

    <Card elevated>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="divider">Proje Bilgileri</div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Proje Adı</span>
          </label>
          <input v-model="form.project_name" type="text" class="input input-bordered w-full" required />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Müşteri Seçin</span>
          </label>
          <select v-model="form.customer_id" class="select select-bordered w-full" required>
            <option disabled value="">Bir müşteri seçin</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.first_name }} {{ customer.last_name }}
            </option>
          </select>
        </div>

        <div class="divider">Servisler</div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Servis Seçin</span>
          </label>

          <div v-if="!services || services.length === 0" class="alert alert-info">
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
            <span>Henüz servis bulunmamaktadır.</span>
          </div>

          <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            <div v-for="service in services" :key="service.id" class="form-control">
              <label class="label cursor-pointer justify-start gap-2">
                <input type="checkbox" :value="service.id" v-model="form.services" class="checkbox checkbox-primary" />
                <span class="label-text">{{ service.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex justify-end gap-2">
          <Link href="/projects" class="btn btn-ghost">İptal</Link>
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
            Projeyi Kaydet
          </button>
        </div>
      </form>
    </Card>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import Card from '@/Pages/WritesCategories/_components/Card.vue';

const { props } = usePage();
const services = computed(() => props.services || []);
const customers = computed(() => props.customers || []);

const form = useForm({
  project_name: '',
  customer_id: '',
  services: [],
});

const handleSubmit = () => {
  form.post('/projects');
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #3b82f6;
}

.checkbox {
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
