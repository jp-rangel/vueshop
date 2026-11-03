<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="page-content">
    <span class="eyebrow">ADMINISTRACIÓN</span>
    <h1>Editar producto</h1>

    <p>
      Aquí estará el formulario para editar el producto
      con ID: {{ route.params.id }}
    </p>
  </main>
</template>