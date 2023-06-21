import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify()

  console.log(req.user.sub)

  res.status(200).send()
}
