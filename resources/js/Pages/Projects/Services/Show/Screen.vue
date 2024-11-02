<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 p-6">
    <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow">
      <h1 class="mb-4 text-2xl font-bold text-gray-800">{{ service.name }}</h1>

      <p v-if="service.description" class="mb-4 text-gray-600">{{ service.description }}</p>

      <p class="font-semibold text-gray-800">
        Fiyat:
        <span v-if="service.price">{{ service.price }} USD</span>
        <span v-else class="text-gray-500">Uygun Değil</span>
      </p>

      <div v-if="service.parent_category" class="mt-6">
        <h2 class="text-lg font-semibold text-gray-700">Üst Kategori</h2>
        <p class="font-medium text-gray-800">{{ service.parent_category.name }}</p>
        <p class="text-gray-600">{{ service.parent_category.description }}</p>
        <p class="font-semibold text-gray-800">
          Fiyat:
          <span v-if="service.parent_category.price">{{ service.parent_category.price }} USD</span>
          <span v-else class="text-gray-500">Uygun Değil</span>
        </p>
      </div>

      <div v-if="service.sub_categories && service.sub_categories.length" class="mt-6">
        <h2 class="mb-4 text-lg font-semibold text-blue-600">Alt Kategoriler</h2>
        <ul class="space-y-4">
          <li
            v-for="subCategory in service.sub_categories"
            :key="subCategory.id"
            class="border-l-4 border-gray-200 pl-4"
          >
            <!-- Alt Kategori Başlığı -->
            <p class="font-medium text-gray-700">{{ subCategory.name }}</p>

            <!-- Alt Kategori Açıklaması -->
            <p v-if="subCategory.description" class="text-gray-500">{{ subCategory.description }}</p>

            <!-- Alt Kategori Fiyatı -->
            <p class="font-semibold text-gray-800">
              Fiyat:
              <span v-if="subCategory.price">{{ subCategory.price }} USD</span>
              <span v-else class="text-gray-500">Uygun Değil</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const service = props.service;
</script>
