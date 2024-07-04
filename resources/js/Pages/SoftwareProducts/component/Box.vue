<template>
  <div class="rounded-md border border-gray-200 p-4 text-gray-500 shadow-sm">
    <div class="mb-1 font-medium text-gray-300">
      <slot name="header"></slot>
    </div>
    <div class="mt-2">
      <slot></slot>
    </div>
  </div>
</template>
