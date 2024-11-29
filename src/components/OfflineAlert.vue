<template>
  <div v-if="!isOnline" class="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">
    Vous êtes en mode hors ligne
  </div>
    <div v-if="showReconnectedMessage" class="fixed bottom-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
      Vous êtes maintenant connecté à internet
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(navigator.onLine)
const showReconnectedMessage = ref(false)

const updateOnlineStatus = () => {
  const wasOffline = !isOnline.value
  isOnline.value = navigator.onLine
  
  if (wasOffline && isOnline.value) {
    showReconnectedMessage.value = true
    setTimeout(() => {
      showReconnectedMessage.value = false
    }, 5000)
  }
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script> 