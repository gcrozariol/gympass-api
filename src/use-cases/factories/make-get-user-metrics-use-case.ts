import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMatricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMatricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMatricsUseCase
}
