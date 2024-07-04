<template>
  <div>
    <div class="flex flex-col-reverse gap-4 p-5 md:grid md:grid-cols-12">
      <Box class="flex w-full items-center md:col-span-7">
        <div class="w-full text-center font-medium text-gray-500">Resim yok</div>
      </Box>
      <div class="flex flex-col gap-4 md:col-span-5">
        <div>
          <label class="label">Faiz oranı ({{ interestRate }}%)</label>
          <input
            v-model.number="interestRate"
            type="range"
            min="0.1"
            max="30"
            step="0.1"
            class="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-100"
          />

          <label class="label">Süre ({{ duration }} yıl)</label>
          <input
            v-model.number="duration"
            type="range"
            min="3"
            max="35"
            step="1"
            class="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-100"
          />

          <div class="mt-2 text-gray-600 dark:text-gray-300">
            <div class="text-gray-400">Aylık ödemeniz</div>
            <SPPrice :price="monthlyPayment" class="text-3xl" />
          </div>
          <div class="mt-2 text-gray-500">
            <div class="flex justify-between">
              <div>Toplam ödeme</div>
              <div>
                <SPPrice :price="totalPaid" class="font-medium" />
              </div>
            </div>
            <div class="flex justify-between">
              <div>Ödenen anapara</div>
              <div>
                <SPPrice :price="softwareProduct.price" class="font-medium" />
              </div>
            </div>
            <div class="flex justify-between">
              <div>Ödenen faiz</div>
              <div>
                <SPPrice :price="totalInterest" class="font-medium" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import SPPrice from '@/Pages/SoftwareProducts/component/SPPrice.vue';
import Box from '@/Pages/SoftwareProducts/component/Box.vue';
import { useMonthlyPayment } from '@/Pages/SoftwareProducts/utils/useMonthlyPayment';

const props = defineProps({
  softwareProduct: Object,
});
const interestRate = ref(2.5);
const duration = ref(25);
const { monthlyPayment, totalPaid, totalInterest } = useMonthlyPayment(
  props.softwareProduct.price,
  interestRate,
  duration
);
</script>
