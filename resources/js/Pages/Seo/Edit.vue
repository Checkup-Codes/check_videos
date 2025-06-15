<template>
  <Head title="SEO Ayarları" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">SEO Ayarları</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-3xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <form @submit.prevent="submit" class="space-y-6">
              <div class="card bg-base-100">
                <div class="card-body">
                  <!-- Temel SEO -->
                  <div class="space-y-4">
                    <h3 class="text-lg font-medium">Temel SEO</h3>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Sayfa Başlığı</span>
                      </label>
                      <input type="text" v-model="form.title" class="input-bordered input" required />
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Meta Açıklama</span>
                      </label>
                      <textarea v-model="form.description" class="textarea-bordered textarea h-24" required></textarea>
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Anahtar Kelimeler</span>
                      </label>
                      <input
                        type="text"
                        v-model="form.keywords"
                        class="input-bordered input"
                        placeholder="Virgülle ayırarak yazın"
                      />
                    </div>
                  </div>

                  <div class="divider"></div>

                  <!-- Open Graph -->
                  <div class="space-y-4">
                    <h3 class="text-lg font-medium">Sosyal Medya</h3>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Paylaşım Başlığı</span>
                      </label>
                      <input type="text" v-model="form.og_title" class="input-bordered input" />
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Paylaşım Açıklaması</span>
                      </label>
                      <textarea v-model="form.og_description" class="textarea-bordered textarea h-24"></textarea>
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Paylaşım Görseli</span>
                      </label>
                      <input type="text" v-model="form.og_image" class="input-bordered input" />
                    </div>
                  </div>

                  <div class="divider"></div>

                  <!-- Gelişmiş -->
                  <div class="space-y-4">
                    <h3 class="text-lg font-medium">Gelişmiş</h3>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Canonical URL</span>
                      </label>
                      <input type="text" v-model="form.canonical_url" class="input-bordered input" />
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Robots</span>
                      </label>
                      <select v-model="form.robots" class="select-bordered select">
                        <option value="index, follow">index, follow</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Schema.org JSON</span>
                      </label>
                      <textarea
                        v-model="form.schema_org"
                        class="textarea-bordered textarea h-32 font-mono"
                        placeholder='{"@context": "https://schema.org", ...}'
                      ></textarea>
                    </div>
                  </div>

                  <div class="card-actions mt-6 justify-end">
                    <button type="submit" class="btn btn-primary">Kaydet</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const props = defineProps({
  seo: {
    type: Object,
    required: true,
  },
});

const form = useForm({
  title: props.seo.title,
  description: props.seo.description,
  keywords: props.seo.keywords,
  og_title: props.seo.og_title,
  og_description: props.seo.og_description,
  og_image: props.seo.og_image,
  canonical_url: props.seo.canonical_url,
  robots: props.seo.robots,
  schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : '',
});

const submit = () => {
  form.put(route('seo.update', props.seo.id));
};
</script>
