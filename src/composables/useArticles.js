import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

export function useArticles() {
  const CACHE_KEY = 'news-articles';
  const CACHE_DURATION = 60 * 60 * 1000; // 1 heure en millisecondes
  const lastUpdate = ref(null);
  const savedArticles = ref(JSON.parse(localStorage.getItem('savedArticles') || '[]'));

  const getCachedData = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const isValid = Date.now() - timestamp < CACHE_DURATION;
      if (isValid) {
        lastUpdate.value = new Date(timestamp);
        return data;
      }
    }
    fetchTopHeadlinesNewsArticles();
    return null;
  };

  const fetchTopHeadlinesNewsArticles = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );
    const data = await response.json();
    const timestamp = Date.now();
    lastUpdate.value = new Date(timestamp);
    
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: data.articles,
      timestamp
    }));
    
    return data.articles;
  };

  const { data: articles, isLoading, error, refetch } = useQuery({
    queryKey: [CACHE_KEY],
    queryFn: fetchTopHeadlinesNewsArticles,
    staleTime: CACHE_DURATION,
    cacheTime: CACHE_DURATION,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: getCachedData,
    initialDataUpdatedAt: () => {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached).timestamp : 0;
    },
  });

  const saveArticle = (article) => {
    const articles = [...savedArticles.value, article]
    localStorage.setItem('savedArticles', JSON.stringify(articles))
    savedArticles.value = articles
  };

  const removeArticle = (article) => {
    const articles = savedArticles.value.filter(a => a.url !== article.url)
    localStorage.setItem('savedArticles', JSON.stringify(articles))
    savedArticles.value = articles
  };

  const getSavedArticle = () => {
    return savedArticles.value;
  };

  return {
    articles,
    isLoading,
    error,
    refreshNews: refetch,
    savedArticles,
    saveArticle,
    removeArticle,
    lastUpdate,
    getSavedArticle,
  };
}
