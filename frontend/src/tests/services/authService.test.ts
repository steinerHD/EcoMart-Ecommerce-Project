import { authService } from '../../services/authService'
import api from '../../services/api'
import { vi } from 'vitest'

vi.mock('../../services/api', () => ({
  default: {
    post: vi.fn()
  }
}))

describe('authService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('login llama api correctamente', async () => {
    (api.post as any).mockResolvedValue({
      data: {
        token: '123',
        nombre: 'Test',
        apellido: 'User',
        email: 'test@test.com'
      }
    })

    const data = {
      email: 'test@test.com',
      password: '123456'
    }

    const response = await authService.login(data)

    expect(api.post).toHaveBeenCalledWith('/auth/login', data)
    expect(response.token).toBe('123')
  })
})