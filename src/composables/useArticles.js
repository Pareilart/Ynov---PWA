import { ref } from "vue";

export function useArticles() {
  const articles = ref([]);
  const lastUpdate = ref(null);
  const CACHE_KEY = "news-articles";
  const CACHE_DURATION = 60 * 60 * 1000; // 5 minutes en millisecondes

  const fetchNews = async () => {
    // Vérifier le cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isValid = Date.now() - timestamp < CACHE_DURATION;

      if (isValid) {
        articles.value = data;
        lastUpdate.value = timestamp;
        return;
      }
    }

    // Si pas de cache valide, faire l'appel API
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      const data = await response.json();
      articles.value = data.articles;

      // Mettre en cache
      lastUpdate.value = Date.now();
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: data.articles,
          timestamp: lastUpdate.value,
        })
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  const refreshNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      const data = await response.json();
      articles.value = data.articles;

      // Mettre à jour le cache
      lastUpdate.value = Date.now();
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: data.articles,
          timestamp: lastUpdate.value,
        })
      );
    } catch (error) {
      console.error("Erreur lors de la rafraîchissement des articles:", error);
    }
  };

  return {
    articles,
    fetchNews,
    refreshNews,
    lastUpdate,
  };
}
