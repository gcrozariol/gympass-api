import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  try {
    const checkInUseCase = makeCheckInUseCase()
    await checkInUseCase.execute({
      gymId,
      userId: req.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return res.status(201).send()
  } catch (e) {
    if (e instanceof MaxDistanceError) {
      return res.status(111).send({
        message: e.message,
      })
    }

    if (e instanceof MaxNumberOfCheckInsError) {
      return res.status(111).send({
        message: e.message,
      })
    }
  }
}
