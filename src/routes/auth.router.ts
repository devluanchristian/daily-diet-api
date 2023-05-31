import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

// logando o usuario para obter o cookie
export async function authRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createAuthUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })
    const { email, password } = createAuthUserBodySchema.parse(request.body)
    const user = await knex('users').select('*').where({ email }).first()

    if (!user) {
      return reply.status(404).send({
        error: 'User not found',
      })
    }
    if (user.password !== password) {
      return reply.status(401).send({
        error: 'Invalid password',
      })
    }
    const sessionId = user.id
    const sevenDaysInMilliseconds = 1000 * 60 * 60 * 24 * 7 // 7 dias
    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: sevenDaysInMilliseconds,
      httpOnly: true,
    })
  })
}
