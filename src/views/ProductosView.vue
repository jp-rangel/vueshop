<script setup>
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const productosStore = useProductosStore()

function editarProducto(id) {
  router.push(`/productos/${id}`)
}

function eliminarProducto(id) {
  const producto = productosStore.obtenerProducto(id)

  if (!producto) return

  const confirmar = window.confirm(
    `¿Estás seguro de eliminar "${producto.nombre}"?`
  )

  if (confirmar) {
    productosStore.eliminarProducto(id)
  }
}
</script>

<template>
  <main class="catalog-page">

    <!-- Encabezado del catálogo -->
    <section class="catalog-header">
      <div>
        <span class="eyebrow">NUESTRO CATÁLOGO</span>

        <h1>Productos</h1>

        <p>
          Explora los productos disponibles en nuestra tienda.
        </p>
      </div>

      <router-link
        to="/productos/crear"
        class="primary-button"
      >
        + Crear producto
      </router-link>
    </section>

    <!-- Información del catálogo -->
    <div class="catalog-info">
      <span>
        {{ productosStore.totalProductos }}
        productos registrados
      </span>
    </div>

    <!-- Lista de productos -->
    <section class="products-grid" v-if="productosStore.totalProductos > 0">
      <ProductCard
        v-for="producto in productosStore.productos"
        :key="producto.id"
        :producto="producto"
        @editar="editarProducto"
        @eliminar="eliminarProducto"
      />
    </section>

    <!-- Estado vacío -->
    <section
      v-else
      class="empty-state"
    >
      <span class="empty-icon">✦</span>

      <h2>No hay productos registrados</h2>

      <p>
        Comienza agregando tu primer producto al catálogo.
      </p>

      <router-link
        to="/productos/crear"
        class="primary-button"
      >
        Crear primer producto
      </router-link>
    </section>

  </main>
</template>