<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const carritoStore = useCarritoStore()

const pedidoConfirmado = ref(false)

function formatoPrecio(precio) {
  return precio.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })
}

function confirmarPedido() {
  if (carritoStore.productos.length === 0) return

  carritoStore.vaciarCarrito()
  pedidoConfirmado.value = true
}

function rutaImagen(ruta) {
  return ruta
    ? `${import.meta.env.BASE_URL}${ruta.replace(/^\/+/, '')}`
    : ''
}
</script>

<template>
  <main class="order-page">
    <section v-if="pedidoConfirmado" class="order-success">
      <span class="success-icon">✓</span>
      <h1>¡Pedido confirmado!</h1>
      <p>
        Tu compra se ha registrado correctamente.
        Gracias por comprar en VueShop.
      </p>

      <router-link to="/productos" class="primary-button">
        Seguir comprando
      </router-link>
    </section>

    <section v-else-if="carritoStore.productos.length > 0">
      <header class="order-header">
        <span class="eyebrow">ÚLTIMO PASO</span>
        <h1>Resumen del pedido</h1>
        <p>Revisa los detalles de tu compra antes de confirmarla.</p>
      </header>

      <div class="order-container">
        <section class="order-products">
          <h2>Productos de tu pedido</h2>

          <article
            v-for="producto in carritoStore.productos"
            :key="producto.id"
            class="order-item"
          >
            <div class="order-item-image">
              <img
                v-if="producto.imagen"
                :src="rutaImagen(producto.imagen)"
                :alt="producto.nombre"
              />
              <span v-else>✦</span>
            </div>

            <div class="order-item-info">
              <h3>{{ producto.nombre }}</h3>
              <p>Cantidad: {{ producto.cantidad }}</p>
              <span>{{ formatoPrecio(producto.precio) }} c/u</span>
            </div>

            <strong>
              {{ formatoPrecio(producto.precio * producto.cantidad) }}
            </strong>
          </article>
        </section>

        <aside class="order-summary">
          <h2>Detalles de compra</h2>

          <div class="order-summary-row">
            <span>Productos</span>
            <span>{{ carritoStore.cantidadProductos }}</span>
          </div>

          <div class="order-summary-row">
            <span>Subtotal</span>
            <strong>{{ formatoPrecio(carritoStore.totalCarrito) }}</strong>
          </div>

          <div class="order-summary-total">
            <span>Total a pagar</span>
            <strong>{{ formatoPrecio(carritoStore.totalCarrito) }}</strong>
          </div>

          <button
            class="primary-button confirm-button"
            @click="confirmarPedido"
          >
            Confirmar pedido
          </button>

          <router-link to="/carrito" class="back-to-cart">
            Volver al carrito
          </router-link>
        </aside>
      </div>
    </section>

    <section v-else class="empty-state">
      <span class="empty-icon">🛒</span>
      <h2>No hay ningún pedido pendiente</h2>
      <p>Agrega productos al carrito para realizar una compra.</p>

      <router-link to="/productos" class="primary-button">
        Explorar productos
      </router-link>
    </section>
  </main>
</template>