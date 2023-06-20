import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let checkInsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(checkInsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await checkInsRepository.create({
      title: 'Far Gym',
      description: 'Crazy gym.',
      phone: '+1 647-675-3313',
      latitude: 21.8922548,
      longitude: 46.1502935,
    })

    await checkInsRepository.create({
      title: 'Near Gym',
      description: 'Crazier gym.',
      phone: '+1 647-675-3313',
      latitude: 22.8922548,
      longitude: 47.1502935,
    })

    const { gyms } = await sut.execute({
      userLatitude: 22.8922548,
      userLongitude: 47.1502935,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
