import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exaxmple.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@exaxmple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('johndoe@exaxmple.com')
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(
      async () =>
        await sut.execute({
          email: 'johndoe@exaxmple.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exaxmple.com',
      passwordHash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          email: 'johndoe@exaxmple.com',
          password: '123123',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
