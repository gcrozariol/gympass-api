import { compare } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@exaxmple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('johndoe@exaxmple.com')
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@exaxmple.com',
      password: '123456',
    })

    const isPasswordCorrectlyHasheded = await compare(
      '123456',
      user.passwordHash,
    )

    expect(isPasswordCorrectlyHasheded).toBe(true)
  })

  it('should not be able to register a user with existing email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@exaxmple.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
