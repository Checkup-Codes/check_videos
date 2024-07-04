<template>
  <div v-if="flashSuccess" class="fixed right-4 top-4 z-50">
    <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
      <strong class="font-bold">Success! </strong>
      <span class="block sm:inline">{{ flashSuccess }}</span>
    </div>
  </div>

  <div class="flex items-center justify-between px-7 py-5">
    <h1 class="text-2xl font-bold">Yazılım Ürünleri</h1>
    <Link :href="route('software-products.create')" class="text-md text-right font-semibold underline">Yeni Ekle</Link>
  </div>

  <div class="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 xl:grid-cols-2">
    <Box v-for="softwareProduct in softwareProducts" :key="softwareProduct.slug" class="relative">
      <div class="flex justify-between">
        <Link :href="route('software-products.show', { software_product: softwareProduct })">
          <SPPrice :price="softwareProduct.price" class="text-2xl font-bold text-gray-700" />
          <SPSpaces :product="softwareProduct" class="text-lg text-gray-700" />
          <SPAddress :product="softwareProduct" class="text-gray-700" />
        </Link>
        <div class="items-center space-y-2 text-center">
          <Link :href="route('software-products.show', { software_product: softwareProduct })" class="btn-primary">
            <div class="rounded-sm border-[1px] px-2 py-1">Show</div>
          </Link>
          <div class="flex space-x-1">
            <Link :href="route('software-products.edit', { software_product: softwareProduct })" class="btn-primary">
              <div class="rounded-sm border-[1px] px-4 py-1">Edit</div>
            </Link>
            <div class="rounded-sm border-[1px] px-2 py-1">
              <button @click="showDeleteModal(softwareProduct)" class="btn-secondary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  </div>

  <ConfirmModal
    v-if="isDeleteModalVisible"
    :title="'Delete Product'"
    :message="'Are you sure you want to delete this product?'"
    :isVisible="isDeleteModalVisible"
    @confirm="deleteProduct"
    @cancel="isDeleteModalVisible = false"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import SPPrice from '@/Pages/SoftwareProducts/component/SPPrice.vue';
import SPSpaces from '@/Pages/SoftwareProducts/component/SPSpaces.vue';
import SPAddress from '@/Pages/SoftwareProducts/component/SPAddress.vue';
import Box from '@/Pages/SoftwareProducts/component/Box.vue';
import ConfirmModal from '@/Pages/SoftwareProducts/component/ConfirmModal.vue';

defineProps({
  softwareProducts: Array,
});

const { props } = usePage();

const isDeleteModalVisible = ref(false);
const productToDelete = ref(null);

const showDeleteModal = (product) => {
  productToDelete.value = product;
  isDeleteModalVisible.value = true;
};

const deleteProduct = () => {
  Inertia.delete(route('software-products.destroy', { software_product: productToDelete.value }), {
    onSuccess: () => {
      softwareProducts.value = softwareProducts.value.filter((product) => product.id !== productToDelete.value.id);
      isDeleteModalVisible.value = false;
    },
  });
};

const flashSuccess = ref(props.flash.success);

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
});
</script>
