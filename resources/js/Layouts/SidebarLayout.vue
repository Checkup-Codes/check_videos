<template>
  <div class="grid h-screen grid-cols-6">
    <div class="">
      <div class="h-full bg-gray-100">
        <Link href="/" class="block p-4 text-black"> Ana Sayfa </Link>
        <Link href="/factory" class="block p-4 text-black"> Fabrika </Link>
        <hr />
        <Link href="/typescript-tutorial" class="block p-4 text-black">
          Typescript Tutorial
        </Link>
      </div>
    </div>
    <div class="col-span-5">
      <header class="h-12 bg-gray-100">
        <div class="py-3">Şuandaki güncel youtube abone sayınız : 2.969</div>
      </header>
      <slot>Default Content</slot>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
