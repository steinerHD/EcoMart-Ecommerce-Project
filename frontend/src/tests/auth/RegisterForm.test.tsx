import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '../../components/auth/RegisterForm'
import { MemoryRouter } from 'react-router-dom'

describe('RegisterForm', () => {

  test('valida campos vacíos', async () => {
    render(<MemoryRouter><RegisterForm /></MemoryRouter>)

    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))

    expect(await screen.findByText(/nombre es obligatorio/i)).toBeInTheDocument()
    expect(await screen.findByText(/apellido es obligatorio/i)).toBeInTheDocument()
  })

  test('valida email inválido', async () => {
    render(<MemoryRouter><RegisterForm /></MemoryRouter>)

    await userEvent.type(screen.getByLabelText(/correo/i), 'correo-malo')
    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))

    expect(await screen.findByText(/formato válido/i)).toBeInTheDocument()
  })

  test('valida contraseña corta', async () => {
    render(<MemoryRouter><RegisterForm /></MemoryRouter>)

    await userEvent.type(screen.getByLabelText(/contraseña/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))

    expect(await screen.findByText(/mínimo 8 caracteres/i)).toBeInTheDocument()
  })
  
})