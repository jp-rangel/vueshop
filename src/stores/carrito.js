import { defineStore } from 'pinia'

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('vueshop-carrito')

  if (carritoGuardado !== null) {
    try {
      const carrito = JSON.parse(carritoGuardado)

      if (Array.isArray(carrito)) {
        return carrito
      }
    } catch {
      console.error('Error al recuperar el carrito almacenado.')
    }
  }

  return []
}

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    productos: cargarCarrito()
  }),

  getters: {
    cantidadProductos: (state) =>
      state.productos.reduce(
        (total, producto) => total + producto.cantidad,
        0
      ),

    totalCarrito: (state) =>
      state.productos.reduce(
        (total, producto) =>
          total + producto.precio * producto.cantidad,
        0
      )
  },

  actions: {
    guardarCarrito() {
      localStorage.setItem(
        'vueshop-carrito',
        JSON.stringify(this.productos)
      )
    },

    agregarAlCarrito(producto) {
      const existente = this.productos.find(
        item => String(item.id) === String(producto.id)
      )

      if (existente) {
        existente.cantidad++
      } else {
        this.productos.push({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: Number(producto.precio),
          imagen: producto.imagen ?? '',
          cantidad: 1
        })
      }

      this.guardarCarrito()
    },

    aumentarCantidad(id) {
      const producto = this.productos.find(
        item => String(item.id) === String(id)
      )

      if (!producto) return

      producto.cantidad++
      this.guardarCarrito()
    },

    disminuirCantidad(id) {
      const producto = this.productos.find(
        item => String(item.id) === String(id)
      )

      if (!producto) return

      if (producto.cantidad > 1) {
        producto.cantidad--
      } else {
        this.quitarDelCarrito(id)
        return
      }

      this.guardarCarrito()
    },

    quitarDelCarrito(id) {
      this.productos = this.productos.filter(
        item => String(item.id) !== String(id)
      )

      this.guardarCarrito()
    },

    vaciarCarrito() {
      this.productos = []
      this.guardarCarrito()
    }
  }
})