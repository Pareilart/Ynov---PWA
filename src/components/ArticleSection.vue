<script setup>
import { ref, computed, watch } from 'vue'
import OfflineAlert from './OfflineAlert.vue'
import ControlBar from './ControlBar.vue'
import TabNavigation from './TabNavigation.vue'
import ArticleList from './ArticleList.vue'
import { useArticles } from '../composables/useArticles.js'

const { 
  articles, 
  savedArticles, 
  error, 
  isLoading, 
  saveArticle, 
  removeArticle,
} = useArticles()

const searchQuery = ref('')
const activeTab = ref('all')

const filteredArticles = computed(() => {
  let articlesToFilter = activeTab.value === 'saved' ? savedArticles.value : articles.value
  if (!Array.isArray(articlesToFilter)) return []
  return articlesToFilter.filter(article => 
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Ajout du watch pour observer les changements de savedArticles
watch(savedArticles, (newValue) => {
  // Le composant sera automatiquement mis à jour grâce à la réactivité de Vue
  console.log('Articles sauvegardés mis à jour:', newValue)
}, { deep: true })

</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="border-b border-gray-200 p-6">
      <OfflineAlert />
      <div v-if="error" class="text-red-500 mb-4">
        Une erreur est survenue lors du chargement des articles.
      </div>
      
      <div v-if="isLoading" class="text-gray-500 mb-4">
        Chargement des articles...
      </div>

      <ControlBar v-model="searchQuery" />
      
      <TabNavigation 
        v-model="activeTab"
        :saved-count="savedArticles.length"
      />

      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        {{ activeTab === 'saved' ? 'Articles sauvegardés' : 'Tous les articles' }}
      </h2>
      
      <ArticleList 
        :articles="filteredArticles" 
        :save-article="saveArticle" 
        :remove-article="removeArticle"
        :get-saved-article="getSavedArticle"
      />
    </div>
  </div>
</template> 