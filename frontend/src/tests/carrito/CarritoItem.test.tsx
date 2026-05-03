import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CarritoItem from '../../components/carrito/CarritoItem'
import { vi } from 'vitest'

describe('CarritoItem', () => {

  const item = {
    id: 1,
    productoId: 10,
    nombreProducto: 'Producto',
    imagenUrl: '',
    precioUnitario: 1000,
    cantidad: 1,
    subtotal: 1000
  }

  test('incrementa cantidad', async () => {
    render(
      <CarritoItem
        item={item}
        onEliminar={vi.fn()}
        onActualizar={vi.fn()}
      />
    )

    await userEvent.click(screen.getByText('+'))
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('llama eliminar', async () => {
    const mockEliminar = vi.fn()

    render(
      <CarritoItem
        item={item}
        onEliminar={mockEliminar}
        onActualizar={vi.fn()}
      />
    )

    await userEvent.click(screen.getByText(/eliminar/i))
    expect(mockEliminar).toHaveBeenCalled()
  })
})