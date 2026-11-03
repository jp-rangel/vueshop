<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />

    <router-view />

    <footer class="footer">
      <span>VueShop © 2026</span>
    </footer>
  </div>
</template>