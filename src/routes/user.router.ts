import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  //  cria um usuário
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)
    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
    })
    return reply.status(201).send()
  })

  app.get('/', async () => {
    const users = await knex('users').select('*')
    return { users }
  })
}
