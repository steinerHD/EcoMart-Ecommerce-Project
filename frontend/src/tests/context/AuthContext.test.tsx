import { renderHook, act } from '@testing-library/react'
import { AuthProvider } from '../../context/AuthContext'
import { useAuth } from '../../hooks/useAuth'
import { vi } from 'vitest'

describe('AuthContext', () => {

    const wrapper = ({ children }: any) => (
        <AuthProvider>{children}</AuthProvider>
    )
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn(),
                setItem: vi.fn(),
                removeItem: vi.fn(),
                clear: vi.fn()
            },
            writable: true
        })
    })

    test('login guarda usuario y token', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })

        act(() => {
            result.current.login('token123', {
                id: 1,
                nombre: 'Test',
                apellido: 'User',
                email: 'test@test.com'
            })
        })

        expect(result.current.token).toBe('token123')
        expect(result.current.user).toEqual({
            id: 1,
            nombre: 'Test',
            apellido: 'User',
            email: 'test@test.com'
        })
    })

    test('logout limpia usuario y token', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })

        act(() => {
            result.current.login('token123', {
                id: 1,
                nombre: 'Test',
                apellido: 'User',
                email: 'test@test.com'
            })
        })

        act(() => {
            result.current.logout()
        })

        expect(result.current.user).toBeNull()
        expect(result.current.token).toBeNull()
    })
})