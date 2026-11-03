<template>
  <main>
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">TU TIENDA DIGITAL</span>

        <h1>
          Todo lo que buscas,
          <span>en un solo lugar.</span>
        </h1>

        <p>
          Descubre nuestra colección de productos y encuentra
          aquello que necesitas. Una experiencia de compra
          sencilla, rápida y pensada para ti.
        </p>

        <router-link to="/productos" class="primary-button">
          Explorar productos
          <span>→</span>
        </router-link>

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
</template>