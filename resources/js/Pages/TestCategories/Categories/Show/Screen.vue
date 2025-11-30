<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl space-y-6 p-6">
      <div class="space-y-4">
        <h1 class="text-3xl font-bold text-foreground">{{ category.name }}</h1>
        <p v-if="category.description" class="text-muted-foreground">{{ category.description }}</p>
      </div>

      <div v-if="tests && tests.length > 0" class="space-y-4">
        <h2 class="text-xl font-semibold text-foreground">Testler ({{ tests.length }})</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <Link
            v-for="test in tests"
            :key="test.id"
            :href="`/tests/${test.slug}`"
            class="rounded-lg border border-border bg-card p-4 hover:bg-accent"
          >
            <h3 class="font-semibold text-foreground">{{ test.title }}</h3>
            <p v-if="test.description" class="mt-2 text-sm text-muted-foreground line-clamp-2">
              {{ test.description }}
            </p>
            <div class="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{{ test.total_questions }} soru</span>
              <span v-if="test.total_points">{{ test.total_points }} puan</span>
            </div>
          </Link>
        </div>
      </div>
      <div v-else class="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Bu kategoride henüz test bulunmuyor.
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const category = props.category || {};
const tests = props.tests || [];
</script>

