import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let checkInsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(checkInsRepository)
  })

  it('should be able to search for gyms', async () => {
    await checkInsRepository.create({
      title: 'JavaScript Gym',
      description: 'Crazy gym.',
      phone: '+1 647-675-3313',
      latitude: 22.8922548,
      longitude: 47.1502935,
    })

    await checkInsRepository.create({
      title: 'TypeScript Gym',
      description: 'Crazier gym.',
      phone: '+1 647-675-3313',
      latitude: 22.8922548,
      longitude: 47.1502935,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'Crazy gym.',
        phone: '+1 647-675-3313',
        latitude: 22.8922548,
        longitude: 47.1502935,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
