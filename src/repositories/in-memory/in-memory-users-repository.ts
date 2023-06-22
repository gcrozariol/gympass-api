import { randomUUID } from 'node:crypto'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      role: data.role ?? 'MEMBER',
    }

    this.items.push(user)

    return user
  }
}
