import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSessionIdExist } from '../middlewares/check-session-id-exists'

export async function foodsRoutes(app: FastifyInstance) {
  // registrar uma refeição
  app.post('/', { preHandler: checkSessionIdExist }, async (request, reply) => {
    const createFoodsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })
    const { name, description, isDiet } = createFoodsBodySchema.parse(
      request.body,
    )
    const sessionId = request.cookies.sessionId

    await knex('foods').insert({
      id: randomUUID(),
      name,
      description,
      isDiet,
      user_id: sessionId,
    })
    return reply.status(201).send()
  })
  //  editar uma refeição, podendo alterar todos os dados acima
  app.put(
    '/:id',
    { preHandler: checkSessionIdExist },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string(),
      })
      const updateFoodsBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date: z.coerce.date().optional(),
        isDiet: z.boolean().optional(),
      })
      const { id } = paramsSchema.parse(request.params)
      const { name, description, date, isDiet } = updateFoodsBodySchema.parse(
        request.body,
      )
      const sessionId = request.cookies.sessionId

      const foods = await knex('foods')
        .where({ id, user_id: sessionId })
        .first()

      if (!foods) {
        return reply.status(404).send()
      }

      await knex('foods')
        .update({
          name,
          description,
          date,
          isDiet,
        })
        .where({ id, user_id: sessionId })

      return reply.status(204).send()
    },
  )

  // apaga uma refeição
  app.delete(
    '/:id',
    { preHandler: checkSessionIdExist },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string(),
      })
      const { id } = paramsSchema.parse(request.params)
      const sessionId = request.cookies.sessionId
      const getFood = await knex('foods')
        .select('*')
        .where({ id, user_id: sessionId })
        .first()
      if (!getFood) {
        return reply.status(404).send({
          error: 'Food not found',
        })
      }
      await knex('foods').delete('*').where({ id, user_id: sessionId })
    },
  )

  // lista todas as refeições de um usuário
  app.get('/', { preHandler: checkSessionIdExist }, async (request) => {
    const { sessionId } = request.cookies
    const foods = await knex('foods').select('*').where('user_id', sessionId)
    return { foods }
  })
  // visualiza uma única refeição
  app.get(
    '/:id',
    { preHandler: checkSessionIdExist },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string(),
      })
      const { id } = paramsSchema.parse(request.params)
      const sessionId = request.cookies.sessionId
      const food = await knex('foods')
        .select('*')
        .where({ id, user_id: sessionId })
        .first()
      if (!food) {
        return reply.status(404).send({ error: 'food not found' })
      }
      return { food }
    },
  )
  // exibe a quantidade total de refeições registradas
  app.get('/summary', { preHandler: checkSessionIdExist }, async (request) => {
    const { sessionId } = request.cookies
    const summary = await knex('foods')
      .count('id', { as: 'amount' })
      .where({ user_id: sessionId })
    // Quantidade total de refeições dentro da dieta //3
    const summaryDiet = await knex('foods')
      .where({
        isDiet: true,
        user_id: sessionId,
      })
      .count('id', { as: 'amount' })

    // Quantidade total de refeições fora da dieta //2
    const summaryOutDiet = await knex('foods')
      .where({
        isDiet: false,
        user_id: sessionId,
      })
      .count('id', { as: 'amount' })

    // Melhor sequência por dia de refeições dentro da dieta
    const daysSequence = await knex('foods')
      .select('id', 'name', 'isDiet')
      .rowNumber('seqnum', function () {
        this.orderBy('id').partitionBy('isDiet')
      })
      .where({ user_id: sessionId, isDiet: true })

    return { summary, summaryDiet, summaryOutDiet, daysSequence }
  })
}
