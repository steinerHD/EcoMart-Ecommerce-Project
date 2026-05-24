import { describe, test, expect, vi, beforeEach } from 'vitest'
import api from '../../services/api'
import { productoService } from '../../services/productoService'

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn()
  }
}))

describe('productoService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('lista productos', async () => {

    const productos = [
      {
        id: 1,
        nombre: 'Producto',
        descripcion: 'Descripción',
        precio: 1000,
        stock: 5,
        imagenUrl: '',
        categoriaNombre: 'Categoría',
        activo: true
      }
    ]

    ;(api.get as any).mockResolvedValue({
      data: productos
    })

    const result = await productoService.listarProductos()

    expect(api.get).toHaveBeenCalledWith('/productos')

    expect(result).toEqual(productos)
  })

})