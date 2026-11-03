<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const menuAbierto = ref(false)
const carritoStore = useCarritoStore()
</script>

<template>
  <header class="navbar">
    <router-link to="/" class="brand" @click="menuAbierto = false">
      <span class="brand-icon">V</span>
      <span>VueShop</span>
    </router-link>

    <button
      class="menu-toggle"
      @click="menuAbierto = !menuAbierto"
      aria-label="Abrir menú"
    >
      ☰
    </button>

    <nav :class="{ 'nav-open': menuAbierto }">
      <router-link
        to="/"
        class="nav-link"
        @click="menuAbierto = false"
      >
        Inicio
      </router-link>

      <router-link
        to="/productos"
        class="nav-link"
        @click="menuAbierto = false"
      >
        Productos
      </router-link>

      <router-link
        to="/carrito"
        class="nav-link"
        @click="menuAbierto = false"
      >
        Carrito
        <span class="cart-badge">
        {{ carritoStore.cantidadProductos }}
        </span>
      </router-link>
    </nav>
  </header>
</template>