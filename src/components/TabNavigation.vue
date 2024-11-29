<script setup>
defineProps({
  modelValue: String,
  savedCount: Number
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex space-x-4 mb-6 border-b">
    <button 
      @click="emit('update:modelValue', 'all')"
      :class="['px-4 py-2', modelValue === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500']"
    >
      Tous les articles
    </button>
    <button 
      @click="emit('update:modelValue', 'saved')"
      :class="['px-4 py-2', modelValue === 'saved' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500']"
    >
      Articles sauvegardés ({{ savedCount }})
    </button>
  </div>
</template> 