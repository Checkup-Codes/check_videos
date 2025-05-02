<template>
  <CheckScreen>
    <Card elevated>
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-bold">{{ write.title }}</h1>
          <Badge variant="secondary" v-if="write.category">{{ write.category.name }}</Badge>
        </div>

        <div class="flex gap-2">
          <Button @click="toggleContent" :variant="showDraw ? 'primary' : 'ghost'" size="sm">
            {{ showDraw ? 'Metni Göster' : 'Çizim Göster' }}
          </Button>

          <div v-if="props.auth.user" class="dropdown dropdown-end">
            <Button variant="ghost" size="sm" class="dropdown-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </Button>
            <ul class="dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow">
              <li><a :href="route('writes.edit', write.id)">Düzenle</a></li>
              <li><a href="#" class="text-error" @click.prevent="deleteWrite(write.id)">Sil</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="divider my-2"></div>

      <div v-if="showDraw" class="min-h-[500px]">
        <ExcalidrawComponent :write="write" />
      </div>
      <div v-else class="prose-sm md:prose-base lg:prose-lg prose max-w-none">
        <div v-if="write.summary" class="alert alert-info mb-6">
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
          <span>{{ write.summary }}</span>
        </div>

        <div v-html="write.content"></div>
      </div>

      <div class="text-base-content/70 mt-6 flex items-center justify-between text-sm">
        <div>Oluşturma: {{ formatDate(write.created_at) }}</div>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {{ write.views_count }} görüntüleme
          </span>
          <span v-if="write.updated_at !== write.created_at"> Son güncelleme: {{ formatDate(write.updated_at) }} </span>
        </div>
      </div>
    </Card>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import { Card, Badge, Button } from '@/Pages/WritesCategories/_components';

const { props } = usePage();
const write = ref(props.write);
const auth = props.auth;

const showDraw = ref(false);

onMounted(() => {
  if (window.location.pathname.includes('categories')) {
    showDraw.value = true;
  } else {
    showDraw.value = props.showDraw || false;
  }
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');
});

const toggleContent = () => {
  showDraw.value = !showDraw.value;
  const url = new URL(window.location.href);

  if (showDraw.value) {
    url.searchParams.set('draw', '1');
  } else {
    url.searchParams.delete('draw');
  }

  window.history.pushState({}, '', url);
};

const deleteWrite = (id) => {
  if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
    router.delete(route('writes.destroy', id));
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};
</script>
