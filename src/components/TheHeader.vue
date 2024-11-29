<script setup>
const currentDate = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <header class="bg-white shadow-sm py-6 mb-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-serif font-bold text-gray-900">Le Journal</h1>
      <p class="text-gray-600 mt-2">{{ currentDate }}</p>
    </div>
  </header>
</template> 