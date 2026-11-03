<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'

const router = useRouter()
const productosStore = useProductosStore()

const formulario = ref({
  nombre: '',
  descripcion: '',
  precio: ''
})

const error = ref('')

function guardarProducto() {
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

  productosStore.agregarProducto(formulario.value)

  router.push('/productos')
}
</script>

<template>
  <main class="form-page">
    <section class="form-container">
      <span class="eyebrow">ADMINISTRACIÓN</span>
      <h1>Crear producto</h1>
      <p class="form-description">
        Completa los datos para agregar un nuevo producto al catálogo.
      </p>

      <form @submit.prevent="guardarProducto" class="product-form">
        <div class="form-group">
          <label for="nombre">Nombre del producto</label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            placeholder="Ej. Audífonos inalámbricos"
          />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="formulario.descripcion"
            placeholder="Describe las características del producto"
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
            placeholder="Ej. 599.99"
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
            Guardar producto
          </button>
        </div>
      </form>
    </section>
  </main>
</template>