<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="articles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <a :href="article.url" 
             target="_blank" 
             class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Lire plus
          </a>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-64">
      <div class="text-xl text-gray-600">
        Chargement des articles...
      </div>
    </div>
  </div>
</template> 