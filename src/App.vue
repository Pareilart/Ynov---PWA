<script setup>
import HelloWorld from './components/HelloWorld.vue'
import PWABadge from './components/PWABadge.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/favicon.svg" class="logo" alt="rd-pwa logo" />dghdgf
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="rd-pwa" />
    <PWABadge />
  </div>
</template>

<style>
@import './style.css';

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
