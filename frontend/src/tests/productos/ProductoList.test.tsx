import { render, screen } from '@testing-library/react'
import ProductoList from '../../components/productos/ProductoList'
import { vi } from 'vitest'
import type { ProductoResponse } from '../../services/productoService'

const producto: ProductoResponse = {
        id: 1,
        nombre: 'Producto',
        precio: 1000,
        stock: 5,
        imagenUrl: '',
        descripcion: 'Descripción',
        categoriaNombre: 'Categoría',
        activo: true
}

test('muestra mensaje si no hay productos', () => {
  render(<ProductoList productos={[]} onAgregar={vi.fn()} />)

  expect(screen.getByText(/no hay productos/i)).toBeInTheDocument()
})
test('renderiza lista de productos', () => {
  const productos = [producto]

  render(<ProductoList productos={productos} onAgregar={vi.fn()} />)

  expect(screen.getByText(/producto/i)).toBeInTheDocument()
})