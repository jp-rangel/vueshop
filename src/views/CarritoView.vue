<script setup>
import { useCarritoStore } from '../stores/carrito'

const carritoStore = useCarritoStore()

function formatoPrecio(precio) {
  return precio.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })
}
</script>

<template>
  <main class="cart-page">
    <section class="cart-header">
      <span class="eyebrow">TU COMPRA</span>
      <h1>Carrito de compras</h1>
      <p>Revisa los productos que deseas comprar.</p>
    </section>

    <section v-if="carritoStore.productos.length > 0" class="cart-layout">
      <div class="cart-products">
        <article
          v-for="producto in carritoStore.productos"
          :key="producto.id"
          class="cart-item"
        >
          <div class="cart-item-image">
            <img
              v-if="producto.imagen"
              :src="producto.imagen"
              :alt="producto.nombre"
            />
            <span v-else>✦</span>
          </div>

          <div class="cart-item-info">
            <h3>{{ producto.nombre }}</h3>
            <p>{{ formatoPrecio(producto.precio) }}</p>

            <div class="quantity-controls">
              <button
                @click="carritoStore.disminuirCantidad(producto.id)"
                aria-label="Disminuir cantidad"
              >
                −
              </button>

              <span>{{ producto.cantidad }}</span>

              <button
                @click="carritoStore.aumentarCantidad(producto.id)"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          <div class="cart-item-total">
            <strong>
              {{ formatoPrecio(producto.precio * producto.cantidad) }}
            </strong>

            <button
              class="remove-button"
              @click="carritoStore.quitarDelCarrito(producto.id)"
            >
              Eliminar
            </button>
          </div>
        </article>

        <button
          class="clear-cart-button"
          @click="carritoStore.vaciarCarrito()"
        >
          Vaciar carrito
        </button>
      </div>

      <aside class="cart-summary">
        <h2>Resumen de compra</h2>

        <div class="summary-row">
          <span>Productos</span>
          <span>{{ carritoStore.cantidadProductos }}</span>
        </div>

        <div class="summary-row">
          <span>Subtotal</span>
          <strong>{{ formatoPrecio(carritoStore.totalCarrito) }}</strong>
        </div>

        <div class="summary-total">
          <span>Total</span>
          <strong>{{ formatoPrecio(carritoStore.totalCarrito) }}</strong>
        </div>

        <router-link to="/pedido" class="primary-button checkout-button">
          Continuar con el pedido
        </router-link>
      </aside>
    </section>

    <section v-else class="empty-state">
      <span class="empty-icon">🛒</span>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega algunos productos para comenzar tu compra.</p>

      <router-link to="/productos" class="primary-button">
        Explorar productos
      </router-link>
    </section>
  </main>
</template>