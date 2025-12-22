<template>
  <CheckScreen>
    <GoBackButton url="/customers" />
    <TopScreen title="Yeni Müşteri Oluştur" />

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div ref="firstNameRef">
              <label class="mb-1 block text-sm font-medium text-foreground">İlk İsmi</label>
              <input
                v-model="form.first_name"
                type="text"
                placeholder="İlk ismi girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.first_name || form.errors.first_name }"
                required
              />
              <p v-if="errors.first_name || form.errors.first_name" class="mt-1 text-xs text-destructive">
                {{ errors.first_name || form.errors.first_name }}
              </p>
            </div>

            <div ref="lastNameRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Soy Adı</label>
              <input
                v-model="form.last_name"
                type="text"
                placeholder="Soy adı girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.last_name || form.errors.last_name }"
                required
              />
              <p v-if="errors.last_name || form.errors.last_name" class="mt-1 text-xs text-destructive">
                {{ errors.last_name || form.errors.last_name }}
              </p>
            </div>

            <div ref="emailRef">
              <label class="mb-1 block text-sm font-medium text-foreground">E-posta</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="E-posta adresi girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.email || form.errors.email }"
                required
              />
              <p v-if="errors.email || form.errors.email" class="mt-1 text-xs text-destructive">
                {{ errors.email || form.errors.email }}
              </p>
            </div>

            <div ref="phoneRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Telefon</label>
              <input
                v-model="form.phone"
                type="text"
                placeholder="Telefon numarası girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.phone || form.errors.phone }"
              />
              <p v-if="errors.phone || form.errors.phone" class="mt-1 text-xs text-destructive">
                {{ errors.phone || form.errors.phone }}
              </p>
            </div>

            <div class="md:col-span-2" ref="addressRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Adres</label>
              <input
                v-model="form.address"
                type="text"
                placeholder="Adres girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.address || form.errors.address }"
              />
              <p v-if="errors.address || form.errors.address" class="mt-1 text-xs text-destructive">
                {{ errors.address || form.errors.address }}
              </p>
            </div>

            <div ref="cityRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Şehir</label>
              <input
                v-model="form.city"
                type="text"
                placeholder="Şehir girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.city || form.errors.city }"
              />
              <p v-if="errors.city || form.errors.city" class="mt-1 text-xs text-destructive">
                {{ errors.city || form.errors.city }}
              </p>
            </div>

            <div ref="stateRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Bölge</label>
              <input
                v-model="form.state"
                type="text"
                placeholder="Bölge girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.state || form.errors.state }"
              />
              <p v-if="errors.state || form.errors.state" class="mt-1 text-xs text-destructive">
                {{ errors.state || form.errors.state }}
              </p>
            </div>

            <div ref="postalCodeRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Posta Kodu</label>
              <input
                v-model="form.postal_code"
                type="text"
                placeholder="Posta kodu girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.postal_code || form.errors.postal_code }"
              />
              <p v-if="errors.postal_code || form.errors.postal_code" class="mt-1 text-xs text-destructive">
                {{ errors.postal_code || form.errors.postal_code }}
              </p>
            </div>

            <div ref="countryRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Ülke</label>
              <input
                v-model="form.country"
                type="text"
                placeholder="Ülke girin"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.country || form.errors.country }"
              />
              <p v-if="errors.country || form.errors.country" class="mt-1 text-xs text-destructive">
                {{ errors.country || form.errors.country }}
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-2 border-t border-border pt-4">
            <Link
              href="/customers"
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
              {{ form.processing ? 'Kaydediliyor...' : 'Müşteriyi Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

// Field refs for scroll to error
const firstNameRef = ref(null);
const lastNameRef = ref(null);
const emailRef = ref(null);
const phoneRef = ref(null);
const addressRef = ref(null);
const cityRef = ref(null);
const stateRef = ref(null);
const postalCodeRef = ref(null);
const countryRef = ref(null);

// Frontend validation errors
const errors = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
});

const form = useForm({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
});

form.processing = false;

const handleSubmit = () => {
  form.post('/customers', {
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
</script>
