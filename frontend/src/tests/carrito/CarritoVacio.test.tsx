import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CarritoVacio from '../../components/carrito/CarritoVacio'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

test('navega a productos', async () => {
  render(<MemoryRouter><CarritoVacio /></MemoryRouter>)

  await userEvent.click(screen.getByText(/ver productos/i))
  expect(mockNavigate).toHaveBeenCalledWith('/productos')
})