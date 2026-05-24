import { describe, test, expect, vi, beforeEach } from 'vitest'
import api from '../../services/api'
import { pedidoService } from '../../services/pedidoService'

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn()
  }
}))

describe('pedidoService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('lista pedidos', async () => {

    const pedidos = [
      {
        id: 1,
        total: 1000,
        estado: 'PAGADO',
        createdAt: '2025-01-01',
        items: []
      }
    ]

    ;(api.get as any).mockResolvedValue({
      data: pedidos
    })

    const result = await pedidoService.listarPedidos()

    expect(api.get).toHaveBeenCalledWith('/pedidos')

    expect(result).toEqual(pedidos)
  })

})