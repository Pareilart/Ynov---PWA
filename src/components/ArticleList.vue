<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useArticles } from '../composables/useArticles.js'

// Définir la props pour recevoir les articles du parent
const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
})

const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})

const { saveArticle, savedArticles, removeArticle } = useArticles()

const isArticleSaved = (article) => {
  return savedArticles.value.some(
    savedArticle => savedArticle.url === article.url
  )
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="text-xl text-gray-600">
        Chargement des articles...
      </div>
    </div>    
    <div v-else-if="articles?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">     
        <div v-for="article in articles" 
           :key="article.url" 
           class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div class="relative">
          <img 
            v-if="article.urlToImage" 
            :src="article.urlToImage" 
            :alt="article.title"
            @error="$event.target.style.display = 'none'"
            class="w-full h-56 object-cover"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24"></div>
        </div>
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-800 line-clamp-2 mb-3">{{ article.title }}</h2>
          <p class="text-gray-600 line-clamp-3 mb-4">{{ article.description }}</p>
          <div class="flex gap-3 mt-auto">
            <a v-if="isOnline" 
               :href="article.url" 
               target="_blank" 
               class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
              <i class="fas fa-external-link-alt h-5 w-5"></i>
              Lire plus
            </a>
            <button v-if="!isArticleSaved(article)"
                    @click="saveArticle(article)"
                    class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
              <i class="fas fa-bookmark h-5 w-5"></i>
              Sauvegarder
            </button>
            <button v-else
                    @click="removeArticle(article)"
                    class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg">
              <i class="fas fa-trash-alt h-5 w-5"></i>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="flex items-center justify-center h-64">
      <div class="text-xl text-gray-600">
        Aucun article trouvé
      </div>
    </div>
  </div>
</template> 