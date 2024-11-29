<script setup>
import { ref, computed } from 'vue'
import { useArticles } from '../composables/useArticles.js'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const { refreshNews, lastUpdate } = useArticles()
const isRefreshing = ref(false)

const formattedLastUpdate = computed(() => {
  if (!lastUpdate.value) return ''
  return new Date(lastUpdate.value).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const handleRefresh = async () => {
  isRefreshing.value = true
  await refreshNews()
  isRefreshing.value = false
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <p v-if="formattedLastUpdate" class="text-sm text-gray-500">
        Dernière mise à jour : {{ formattedLastUpdate }}
      </p>
      <button 
        @click="handleRefresh"
        :disabled="isRefreshing"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {{ isRefreshing ? 'Actualisation...' : 'Actualiser' }}
      </button>
    </div>

    <div class="mb-6">
      <input
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        type="text"
        placeholder="Rechercher un article..."
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
    </div>
  </div>
</template> 