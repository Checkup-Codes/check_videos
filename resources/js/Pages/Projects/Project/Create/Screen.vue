<template>
  <CheckScreen>
    <GoBackButton url="/projects" />
    <TopScreen title="Yeni Proje Oluştur" />

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-foreground">Proje Bilgileri</h3>

            <div ref="projectNameRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Proje Adı</label>
              <input
                v-model="form.project_name"
                type="text"
                placeholder="Proje adını girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.project_name || form.errors.project_name }"
                required
              />
              <p v-if="errors.project_name || form.errors.project_name" class="mt-1 text-xs text-destructive">
                {{ errors.project_name || form.errors.project_name }}
              </p>
            </div>

            <div ref="customerIdRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Müşteri Seçin</label>
              <select
                v-model="form.customer_id"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.customer_id || form.errors.customer_id }"
                required
              >
                <option disabled value="">Bir müşteri seçin</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer.first_name }} {{ customer.last_name }}
                </option>
              </select>
              <p v-if="errors.customer_id || form.errors.customer_id" class="mt-1 text-xs text-destructive">
                {{ errors.customer_id || form.errors.customer_id }}
              </p>
            </div>

            <div ref="categoryIdRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Kategori/Yazı Bağlantısı (Opsiyonel)</label>
              <select
                v-model="form.category_id"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.category_id || form.errors.category_id }"
              >
                <option value="">Kategori seçin (opsiyonel)</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <p v-if="errors.category_id || form.errors.category_id" class="mt-1 text-xs text-destructive">
                {{ errors.category_id || form.errors.category_id }}
              </p>
              <p class="mt-1 text-xs text-muted-foreground">
                Bu projeye ait yazıların bulunduğu kategoriyi seçin. Bu kategori altındaki tüm yazılar bu projeyle ilişkilendirilir.
              </p>
            </div>
          </div>

          <div class="space-y-4 border-t border-border pt-6">
            <h3 class="text-sm font-semibold text-foreground">Servisler</h3>

            <div v-if="!services || services.length === 0" class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-5 w-5 shrink-0"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Henüz servis bulunmamaktadır.</span>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="service in services"
                :key="service.id"
                class="rounded-md border border-input bg-card p-4"
              >
                <label class="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    :value="service.id"
                    v-model="selectedServices"
                    @change="handleServiceToggle(service.id)"
                    class="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <div class="flex-1">
                    <span class="text-sm font-medium text-foreground">{{ service.name }}</span>
                    <p v-if="service.description" class="mt-1 text-xs text-muted-foreground">
                      {{ service.description }}
                    </p>
                  </div>
                </label>

                <div v-if="selectedServices.includes(service.id)" class="mt-4 space-y-3 border-t border-border pt-4 pl-7">
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-xs font-medium text-foreground">Projeye Özel Fiyat (₺)</label>
                      <input
                        v-model.number="getServiceData(service.id).price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Fiyat girin"
                        class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>

                    <div>
                      <label class="mb-1 block text-xs font-medium text-foreground">Durum</label>
                      <select
                        v-model="getServiceData(service.id).status"
                        class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="pending">Beklemede</option>
                        <option value="active">Aktif</option>
                        <option value="completed">Tamamlandı</option>
                        <option value="cancelled">İptal Edildi</option>
                      </select>
                    </div>

                    <div>
                      <label class="mb-1 block text-xs font-medium text-foreground">Ödeme Durumu</label>
                      <select
                        v-model="getServiceData(service.id).payment_status"
                        class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="unpaid">Ödenmedi</option>
                        <option value="partial">Kısmi Ödendi</option>
                        <option value="paid">Ödendi</option>
                      </select>
                    </div>

                    <div>
                      <label class="mb-1 block text-xs font-medium text-foreground">Hizmet Başlangıç Tarihi</label>
                      <input
                        v-model="getServiceData(service.id).service_start_date"
                        type="date"
                        class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>

                    <div>
                      <label class="mb-1 block text-xs font-medium text-foreground">Hizmet Bitiş Tarihi</label>
                      <input
                        v-model="getServiceData(service.id).service_end_date"
                        type="date"
                        class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="mb-1 block text-xs font-medium text-foreground">Notlar</label>
                    <textarea
                      v-model="getServiceData(service.id).notes"
                      rows="3"
                      placeholder="Bu servis hakkında notlar..."
                      class="flex w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    ></textarea>
                  </div>

                  <div class="space-y-3 border-t border-border pt-4">
                    <div class="flex items-center justify-between">
                      <label class="block text-xs font-medium text-foreground">TO-DO'lar</label>
                      <span class="text-xs text-muted-foreground">
                        Tamamlanma: {{ getCompletionPercentage(service.id) }}%
                      </span>
                    </div>
                    
                    <div class="space-y-2">
                      <div
                        v-for="(todo, index) in getServiceTodos(service.id)"
                        :key="todo.id || index"
                        class="flex items-center gap-2 rounded-md border border-input bg-background p-2"
                      >
                        <input
                          type="checkbox"
                          :checked="todo.is_completed"
                          @change="toggleTodo(service.id, index)"
                          class="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                        <input
                          v-model="todo.title"
                          type="text"
                          placeholder="Todo başlığı..."
                          class="flex-1 border-none bg-transparent px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-0"
                          @blur="updateTodoTitle(service.id, index)"
                        />
                        <button
                          type="button"
                          @click="removeTodo(service.id, index)"
                          class="text-destructive hover:text-destructive/80"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      @click="addTodo(service.id)"
                      class="inline-flex h-7 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Yeni TO-DO Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="errors.services || form.errors.services" class="text-xs text-destructive">
              {{ errors.services || form.errors.services }}
            </p>
          </div>

          <div class="flex justify-end gap-2 border-t border-border pt-4">
            <Link
              href="/projects"
              class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              İptal
            </Link>
            <button
              type="submit"
              class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              :disabled="form.processing"
            >
              <svg
                v-if="form.processing"
                class="h-4 w-4 animate-spin"
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
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ form.processing ? 'Kaydediliyor...' : 'Projeyi Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useForm, usePage, Link, router } from '@inertiajs/vue3';
import axios from 'axios';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const services = computed(() => props.services || []);
const customers = computed(() => props.customers || []);
const categories = computed(() => props.categories || []);

// Field refs for scroll to error
const projectNameRef = ref(null);
const customerIdRef = ref(null);
const categoryIdRef = ref(null);

// Frontend validation errors
const errors = ref({
  project_name: '',
  customer_id: '',
  category_id: '',
  services: '',
});

// Service data storage
const servicesData = ref({});
const selectedServices = ref([]);
const servicesTodos = ref({});

const form = useForm({
  project_name: '',
  customer_id: '',
  category_id: '',
  services: [],
});

form.processing = false;

const getServiceData = (serviceId) => {
  if (!servicesData.value[serviceId]) {
    servicesData.value[serviceId] = {
      id: serviceId,
      price: null,
      status: 'pending',
      payment_status: 'unpaid',
      notes: '',
      service_start_date: null,
      service_end_date: null,
    };
  }
  return servicesData.value[serviceId];
};

const getServiceTodos = (serviceId) => {
  if (!servicesTodos.value[serviceId]) {
    servicesTodos.value[serviceId] = [];
  }
  return servicesTodos.value[serviceId];
};

const addTodo = (serviceId) => {
  if (!servicesTodos.value[serviceId]) {
    servicesTodos.value[serviceId] = [];
  }
  servicesTodos.value[serviceId].push({
    id: null,
    title: '',
    is_completed: false,
    completed_at: null,
  });
};

const removeTodo = (serviceId, index) => {
  servicesTodos.value[serviceId].splice(index, 1);
};

const toggleTodo = (serviceId, index) => {
  const todo = servicesTodos.value[serviceId][index];
  todo.is_completed = !todo.is_completed;
  todo.completed_at = todo.is_completed ? new Date().toISOString() : null;
};

const updateTodoTitle = (serviceId, index) => {
  // Title is already updated via v-model
};

const getCompletionPercentage = (serviceId) => {
  const todos = getServiceTodos(serviceId);
  if (todos.length === 0) return 0;
  const completed = todos.filter((t) => t.is_completed).length;
  return Math.round((completed / todos.length) * 100);
};

const handleServiceToggle = (serviceId) => {
  if (!selectedServices.value.includes(serviceId)) {
    // Service removed, clean up data
    delete servicesData.value[serviceId];
  }
};

const handleSubmit = () => {
  // Build services array with data
  form.services = selectedServices.value.map((serviceId) => getServiceData(serviceId));

  form.post('/projects', {
    onSuccess: (page) => {
      // Get project ID from the response
      const projectId = page.props.project?.id || page.url.split('/').pop();
      if (projectId) {
        createTodos(projectId);
      }
    },
    onError: (serverErrors) => {
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          if (errors.value.hasOwnProperty(key)) {
            errors.value[key] = serverErrors[key];
          }
        });
      }
    },
  });
};

const createTodos = async (projectId) => {
  const todoPromises = [];
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  
  selectedServices.value.forEach((serviceId) => {
    const todos = getServiceTodos(serviceId);
    todos.forEach((todo) => {
      if (todo.title && todo.title.trim()) {
        todoPromises.push(
          axios.post('/project-service-todos', {
            project_id: projectId,
            service_id: serviceId,
            title: todo.title,
            is_completed: todo.is_completed || false,
          }, {
            headers: {
              'X-CSRF-TOKEN': csrfToken,
            },
          }).catch((error) => {
            console.error('Todo oluşturulurken hata oluştu:', error);
          })
        );
      }
    });
  });
  
  await Promise.all(todoPromises);
};
</script>
