import { defineStore } from 'pinia'

// Productos iniciales de VueShop
const productosIniciales = [
  {
    id: 1,
    nombre: 'Audífonos inalámbricos',
    descripcion: 'Audífonos Bluetooth con cancelación de ruido.',
    precio: 599.99,
    imagen: '/productos/audifonos.jpg'
  },
  {
    id: 2,
    nombre: 'Teclado mecánico',
    descripcion: 'Teclado mecánico con iluminación RGB.',
    precio: 899.00,
    imagen: '/productos/teclado-mecanico.jpg'
  },
  {
    id: 3,
    nombre: 'Mouse gamer',
    descripcion: 'Mouse ergonómico con sensor de alta precisión.',
    precio: 449.50,
    imagen: '/productos/mouse-gamer.jpg'
  },
  {
    id: 4,
    nombre: 'Monitor Full HD',
    descripcion: 'Monitor de 24 pulgadas con resolución Full HD.',
    precio: 2499.00,
    imagen: '/productos/monitor.jpg'
  }
]

// Recuperar productos almacenados
function cargarProductos() {
  const productosGuardados = localStorage.getItem('vueshop-productos')

  if (productosGuardados !== null) {
    try {
      const productos = JSON.parse(productosGuardados)

      if (Array.isArray(productos)) {
        return productos
      }
    } catch {
      console.error('Error al recuperar los productos almacenados.')
    }
  }

  return [...productosIniciales]
}

export const useProductosStore = defineStore('productos', {
  state: () => ({
    productos: cargarProductos()
  }),

  getters: {
    totalProductos: (state) => state.productos.length
  },

  actions: {
    guardarProductos() {
      localStorage.setItem(
        'vueshop-productos',
        JSON.stringify(this.productos)
      )
    },

    agregarProducto(datos) {
      const nuevoId = this.productos.length > 0
        ? Math.max(...this.productos.map(p => Number(p.id))) + 1
        : 1

      const nuevoProducto = {
        id: nuevoId,
        nombre: datos.nombre.trim(),
        descripcion: (datos.descripcion ?? '').trim(),
        precio: Number(datos.precio)
      }

      this.productos.push(nuevoProducto)
      this.guardarProductos()

      return nuevoProducto
    },

    obtenerProducto(id) {
      return this.productos.find(
        producto => String(producto.id) === String(id)
      ) ?? null
    },

    editarProducto(id, datos) {
      const indice = this.productos.findIndex(
        producto => String(producto.id) === String(id)
      )

      if (indice === -1) {
        return false
      }

      this.productos[indice] = {
        ...this.productos[indice],
        nombre: datos.nombre.trim(),
        descripcion: (datos.descripcion ?? '').trim(),
        precio: Number(datos.precio)
      }

      this.guardarProductos()

      return true
    },

    eliminarProducto(id) {
      const cantidadAnterior = this.productos.length

      this.productos = this.productos.filter(
        producto => String(producto.id) !== String(id)
      )

      if (this.productos.length === cantidadAnterior) {
        return false
      }

      this.guardarProductos()

      return true
    }
  }
})