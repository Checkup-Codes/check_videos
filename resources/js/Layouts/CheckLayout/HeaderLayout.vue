<template>
  <header class="flex h-12 items-center justify-between border-b-2 border-gray-300 bg-sidebar px-5">
    <div></div>
    <button @click="$emit('toggle-sidebar')" class="lg:hidden">
      <svg
        class="h-6 w-6 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </header>
</template>
