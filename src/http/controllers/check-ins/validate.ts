import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = createCheckInParamsSchema.parse(req.params)

  const checkInUseCase = makeValidateCheckInUseCase()

  await checkInUseCase.execute({
    checkInId,
  })

  return res.status(204).send()
}
