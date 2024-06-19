<template>
  <div class="grid grid-cols-2 p-5">
    <div>
      <div>Oluşturulma Tarihi : 19 Haziran 2024</div>
      <div>Hazırlayan : Yakup Sarı</div>
      <h1 class="py-5 text-2xl">Youtube büyütme sayfası</h1>

      <div class="py-5">
        <div class="flex">
          <h2 class="text-md">Abone Sayısı</h2>
          <p>: 1000</p>
        </div>
        <div class="flex">
          <h2 class="text-md">İzlenme Sayısı</h2>
          <p>: 1000</p>
        </div>
        <div class="flex">
          <h2 class="text-md">Beğeni Sayısı</h2>
          <p>: 1000</p>
        </div>
      </div>

      <h2 class="py-5">
        Bu sayfada izlenmelerin takip edilmesi sağlanacaktır.
      </h2>

      <div class="py-5">
        <h2 class="text-xl">İstatistiklerin</h2>
        <div class="flex">Youtube / Facebook / Instagram / Tiktok</div>
      </div>

      <div class="py-5">
        <h2 class="text-lg">Youtube</h2>
        <div class="flex">
          Burada youtube kanalına özel istatistiklerin sıralanacaktır.
        </div>
      </div>

      <div class="py-5">
        <h2 class="text-lg">Facebook</h2>
        <div class="flex">
          Burada facebook kanalına özel istatistiklerin sıralanacaktır.
        </div>
      </div>

      <div class="py-5">
        <h2 class="text-lg">Instagram</h2>
        <div class="flex">
          Burada instagram kanalına özel istatistiklerin sıralanacaktır.
        </div>
      </div>

      <div class="py-5">
        <h2 class="text-lg">Tiktok</h2>
        <div class="flex">
          Burada tiktok kanalına özel istatistiklerin sıralanacaktır.
        </div>
      </div>
    </div>
    <div class="">
      <h2 class="py-5">Chart Bolgesi</h2>
      <div class="space-y-5">
        <div class="h-56 w-full rounded bg-gray-100 text-center">1</div>
        <div class="h-56 w-full rounded bg-gray-100 text-center">2</div>
        <div class="h-56 w-full rounded bg-gray-100 text-center">3</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ message: String });
</script>
