import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../../components/auth/LoginForm'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { authService } from '../../services/authService'

// 🔹 mocks seguros
const mockNavigate = vi.fn()
const mockLogin = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

vi.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
        login: mockLogin
    })
}))

vi.mock('../../services/authService', () => ({
    authService: {
        login: vi.fn()
    }
}))

describe('LoginForm', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test('login exitoso navega', async () => {
        ; (authService.login as any).mockResolvedValue({
            token: '123',
            nombre: 'Test',
            apellido: 'User',
            email: 'test@test.com'
        })

        render(<MemoryRouter><LoginForm /></MemoryRouter>)

        await userEvent.type(screen.getByLabelText(/correo/i), 'test@test.com')
        await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')

        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        expect(authService.login).toHaveBeenCalled()
        expect(mockLogin).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/productos')
    })

    test('muestra error backend', async () => {
        ; (authService.login as any).mockRejectedValue({
            response: { data: { mensaje: 'Error backend' } }
        })

        render(<MemoryRouter><LoginForm /></MemoryRouter>)

        await userEvent.type(screen.getByLabelText(/correo/i), 'test@test.com')
        await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')

        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        expect(await screen.findByText(/error backend/i)).toBeInTheDocument()
    })
    test('muestra errores si se envía vacío', async () => {
        render(<MemoryRouter><LoginForm /></MemoryRouter>)

        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        expect(await screen.findByText(/correo es obligatorio/i)).toBeInTheDocument()
        expect(await screen.findByText(/contraseña es obligatoria/i)).toBeInTheDocument()
    })
    test('muestra error si el email es inválido', async () => {
        render(<MemoryRouter><LoginForm /></MemoryRouter>)

        await userEvent.type(screen.getByLabelText(/correo/i), 'correo-malo')
        await userEvent.type(screen.getByLabelText(/contraseña/i), '123456')

        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        expect(await screen.findByText(/formato válido/i)).toBeInTheDocument()
    })
    test('no llama login si la validación falla', async () => {
        const spy = vi.spyOn(authService, 'login')

        render(<MemoryRouter><LoginForm /></MemoryRouter>)

        await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        expect(spy).not.toHaveBeenCalled()
    })
})