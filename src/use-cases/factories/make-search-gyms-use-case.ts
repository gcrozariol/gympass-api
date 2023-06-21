import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const searchGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCse = new SearchGymsUseCase(searchGymsRepository)

  return searchGymsUseCse
}
