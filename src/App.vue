<script setup>
import { ref } from 'vue'

const menuAbierto = ref(false)
</script>

<template>
  <div class="app-container">
    <!-- Menú de navegación -->
    <header class="navbar">
      <a href="/" class="brand">
        <span class="brand-icon">V</span>
        <span>VueShop</span>
      </a>

      <button
        class="menu-toggle"
        @click="menuAbierto = !menuAbierto"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav :class="{ 'nav-open': menuAbierto }">
        <a href="/" class="nav-link active">Inicio</a>
        <a href="/productos" class="nav-link">Productos</a>
        <a href="/carrito" class="nav-link">
          Carrito
          <span class="cart-badge">0</span>
        </a>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main>
      <section class="hero">
        <div class="hero-content">
          <h1>
            Todo lo que buscas,
            <span>en un solo lugar.</span>
          </h1>

          <p>
            Descubre nuestra colección de productos y encuentra
            aquello que necesitas. Una experiencia de compra
            sencilla, rápida y pensada para ti.
          </p>

          <a href="/productos" class="primary-button">
            Explorar productos
            <span>→</span>
          </a>

          <div class="hero-features">
            <div>
              <span class="feature-icon">✓</span>
              <span>Compra sencilla</span>
            </div>

            <div>
              <span class="feature-icon">✓</span>
              <span>Productos variados</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-circle"></div>

          <div class="visual-card">
            <div class="visual-card-top">
              <span class="visual-dot"></span>
              <span class="visual-dot"></span>
              <span class="visual-dot"></span>
            </div>

            <div class="product-illustration">
              <div class="product-box">
                <div class="product-box-face"></div>
              </div>
            </div>

            <div class="visual-card-info">
              <div>
                <span class="visual-label">VUESHOP COLLECTION</span>
                <h3>Tu próxima compra</h3>
              </div>

              <span class="visual-arrow">↗</span>
            </div>
          </div>

          <div class="floating-tag">
            <span class="floating-icon">✦</span>
            <div>
              <strong>Descubre</strong>
              <span>Algo nuevo</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de bienvenida -->
      <section class="welcome-section">
        <div>
          <span class="eyebrow">BIENVENIDO A VUESHOP</span>
          <h2>Una tienda, muchas posibilidades.</h2>
        </div>

        <p>
          Explora nuestro catálogo, administra tus productos
          y prepara tu próxima compra.
        </p>
      </section>
    </main>

    <!-- Pie de página -->
    <footer class="footer">
      <span>VueShop © 2026</span>
    </footer>
  </div>
</template>