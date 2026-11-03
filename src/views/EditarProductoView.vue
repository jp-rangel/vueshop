<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'

const route = useRoute()
const router = useRouter()
const productosStore = useProductosStore()

const id = route.params.id
const producto = productosStore.obtenerProducto(id)

const formulario = ref({
  nombre: producto?.nombre ?? '',
  descripcion: producto?.descripcion ?? '',
  precio: producto?.precio ?? ''
})

const error = ref('')

function guardarCambios() {
  error.value = ''

  if (!formulario.value.nombre.trim()) {
    error.value = 'El nombre del producto es obligatorio.'
    return
  }

  if (
    formulario.value.precio === '' ||
    !Number.isFinite(Number(formulario.value.precio)) ||
    Number(formulario.value.precio) <= 0
  ) {
    error.value = 'Ingresa un precio válido mayor que cero.'
    return
  }

  const actualizado = productosStore.editarProducto(id, formulario.value)

  if (actualizado) {
    router.push('/productos')
  } else {
    error.value = 'No fue posible actualizar el producto.'
  }
}
</script>

<template>
  <main class="form-page">
    <section v-if="producto" class="form-container">
      <span class="eyebrow">ADMINISTRACIÓN</span>
      <h1>Editar producto</h1>
      <p class="form-description">
        Modifica la información del producto seleccionado.
      </p>

      <form @submit.prevent="guardarCambios" class="product-form">
        <div class="form-group">
          <label for="nombre">Nombre del producto</label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            placeholder="Nombre del producto"
          />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="formulario.descripcion"
            placeholder="Descripción del producto"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="precio">Precio (MXN)</label>
          <input
            id="precio"
            v-model="formulario.precio"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Precio del producto"
          />
        </div>

        <p v-if="error" class="form-error">
          {{ error }}
        </p>

        <div class="form-actions">
          <router-link to="/productos" class="secondary-button">
            Cancelar
          </router-link>

          <button type="submit" class="primary-button">
            Guardar cambios
          </button>
        </div>
      </form>
    </section>

    <section v-else class="empty-state">
      <span class="empty-icon">!</span>
      <h2>Producto no encontrado</h2>
      <p>El producto que intentas editar no existe en el catálogo.</p>
      <router-link to="/productos" class="primary-button">
        Volver al catálogo
      </router-link>
    </section>
  </main>
</template>