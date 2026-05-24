import { describe, test, expect, vi, beforeEach } from 'vitest'
import api from '../../services/api'
import { carritoService } from '../../services/carritoService'

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('carritoService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('obtiene carrito', async () => {

    const carrito = {
      id: 1,
      items: [],
      total: 0,
      cantidadItems: 0
    }

    ;(api.get as any).mockResolvedValue({
      data: carrito
    })

    const result = await carritoService.obtenerCarrito()

    expect(api.get).toHaveBeenCalledWith('/carrito')

    expect(result).toEqual(carrito)
  })

  test('agrega item', async () => {

    const response = {
      id: 1,
      items: [],
      total: 1000,
      cantidadItems: 1
    }

    ;(api.post as any).mockResolvedValue({
      data: response
    })

    const result = await carritoService.agregarItem({
      productoId: 1,
      cantidad: 2
    })

    expect(api.post).toHaveBeenCalledWith(
      '/carrito/items',
      {
        productoId: 1,
        cantidad: 2
      }
    )

    expect(result).toEqual(response)
  })

  test('actualiza item', async () => {

    const response = {
      id: 1,
      items: [],
      total: 2000,
      cantidadItems: 2
    }

    ;(api.put as any).mockResolvedValue({
      data: response
    })

    const result = await carritoService.actualizarItem(
      1,
      {
        cantidad: 3
      }
    )

    expect(api.put).toHaveBeenCalledWith(
      '/carrito/items/1',
      {
        cantidad: 3
      }
    )

    expect(result).toEqual(response)
  })

  test('elimina item', async () => {

    const response = {
      id: 1,
      items: [],
      total: 0,
      cantidadItems: 0
    }

    ;(api.delete as any).mockResolvedValue({
      data: response
    })

    const result = await carritoService.eliminarItem(1)

    expect(api.delete).toHaveBeenCalledWith(
      '/carrito/items/1'
    )

    expect(result).toEqual(response)
  })

  test('realiza checkout', async () => {

    const pedido = {
      id: 1,
      total: 5000,
      estado: 'PAGADO',
      createdAt: '2025-01-01',
      items: []
    }

    ;(api.post as any).mockResolvedValue({
      data: pedido
    })

    const result = await carritoService.checkout()

    expect(api.post).toHaveBeenCalledWith(
      '/carrito/checkout'
    )

    expect(result).toEqual(pedido)
  })

})