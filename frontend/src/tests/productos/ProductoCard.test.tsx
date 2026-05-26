import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductoCard from '../../components/productos/ProductoCard'
import type { ProductoResponse } from '../../services/productoService'
import { vi } from 'vitest'

describe('ProductoCard', () => {

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

    test('renderiza producto', () => {
        render(<ProductoCard producto={producto} onAgregar={vi.fn()} />)

        expect(screen.getByText(/producto/i)).toBeInTheDocument()
    })

    test('agrega producto', async () => {
        const mockAgregar = vi.fn()

        render(<ProductoCard producto={producto} onAgregar={mockAgregar} />)

        await userEvent.click(screen.getByRole('button', { name: /agregar/i }))

        expect(mockAgregar).toHaveBeenCalledWith(1, 1)
    })

    test('deshabilita botón si no hay stock', () => {
        const sinStock = { ...producto, stock: 0 }

        render(<ProductoCard producto={sinStock} onAgregar={vi.fn()} />)

        expect(
            screen.getByRole('button', { name: /agregar/i })
        ).toBeDisabled()
    })
    it('muestra botón agregar', () => {
        render(<ProductoCard producto={producto} onAgregar={vi.fn()} />)

        expect(screen.getByText('Agregar')).toBeInTheDocument()
    })

})