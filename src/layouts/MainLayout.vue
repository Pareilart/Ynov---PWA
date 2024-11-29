<script setup>
import TheHeader from '../components/TheHeader.vue'
import PWABadge from '../components/PWABadge.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    <main class="max-w-7xl mx-auto px-4">
      <slot></slot>
      <PWABadge class="mt-8 text-center" />
    </main>
  </div>
</template> 