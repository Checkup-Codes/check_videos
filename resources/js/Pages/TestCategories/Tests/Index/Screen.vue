<template>
  <CheckScreen>
    <IntroScreen title="Testler" />
    <div class="mt-6 space-y-4">
      <div v-for="test in tests" :key="test.id" class="rounded-lg border border-border bg-card p-4">
        <Link :href="`/tests/${test.slug}`" class="block">
          <h3 class="text-lg font-semibold text-foreground">{{ test.title }}</h3>
          <p v-if="test.description" class="mt-2 text-sm text-muted-foreground">{{ test.description }}</p>
          <div class="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{{ test.total_questions }} soru</span>
            <span v-if="test.total_points">{{ test.total_points }} puan</span>
          </div>
        </Link>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import IntroScreen from '@/Components/CekapUI/Typography/IntroScreen.vue';

const { props } = usePage();
const tests = props.tests || [];
</script>

