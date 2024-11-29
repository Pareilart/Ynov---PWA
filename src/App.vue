<script setup>
import { onMounted, ref, computed } from 'vue'
import PWABadge from './components/PWABadge.vue'
import OfflineAlert from './components/OfflineAlert.vue'
import { useArticles } from './composables/useArticles.js'
import ArticleList from './components/ArticleList.vue'

const { articles, fetchNews, refreshNews, lastUpdate } = useArticles()
const searchQuery = ref('')

// Filtrer les articles
const filteredArticles = computed(() => {
  return articles.value.filter(article => 
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Ajout du computed pour formater la date de dernière mise à jour
const formattedLastUpdate = computed(() => {
  if (!lastUpdate.value) return ''
  return new Date(lastUpdate.value).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

onMounted(() => {
  fetchNews()
})

const currentDate = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const isRefreshing = ref(false)

const handleRefresh = async () => {
  isRefreshing.value = true
  await refreshNews()
  isRefreshing.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm py-6 mb-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-serif font-bold text-gray-900">Le Journal</h1>
        <p class="text-gray-600 mt-2">{{ currentDate }}</p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4">
      <OfflineAlert />
      
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="border-b border-gray-200 p-6">
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

          <!-- Barre de recherche -->
          <div class="mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un article..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <h2 class="text-xl font-semibold text-gray-800 mb-4">Actualités du jour</h2>
          <ArticleList :articles="filteredArticles" />

        </div>
      </div>

      <PWABadge class="mt-8 text-center" />
    </main>
  </div>
</template>
