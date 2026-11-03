<script setup>
import { useCarritoStore } from '../stores/carrito'

defineProps({
  producto: {
    type: Object,
    required: true
  }
})

defineEmits(['editar', 'eliminar'])

const carritoStore = useCarritoStore()

function rutaImagen(ruta) {
  return ruta
    ? `${import.meta.env.BASE_URL}${ruta.replace(/^\/+/, '')}`
    : ''
}
</script>

<template>
  <article class="product-card">
    <div class="product-card-image">
      <img
        v-if="producto.imagen"
        :src="rutaImagen(producto.imagen)"
        :alt="producto.nombre"
      />

      <span v-else class="product-placeholder">✦</span>
    </div>

    <div class="product-card-content">
      <span class="product-category">VUESHOP PRODUCT</span>

      <h3>{{ producto.nombre }}</h3>

      <p>{{ producto.descripcion }}</p>

      <div class="product-card-footer">
        <strong>
          {{
            producto.precio.toLocaleString('es-MX', {
              style: 'currency',
              currency: 'MXN'
            })
          }}
        </strong>
      </div>

      <button
        class="add-cart-button"
        @click="carritoStore.agregarAlCarrito(producto)"
      >
        Añadir al carrito
      </button>

      <div class="product-card-actions">
        <button
          class="edit-button"
          @click="$emit('editar', producto.id)"
        >
          Editar
        </button>

        <button
          class="delete-button"
          @click="$emit('eliminar', producto.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
  </article>
</template>