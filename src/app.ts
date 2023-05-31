import fastify from 'fastify'
import { usersRoutes } from './routes/user.router'
import { foodsRoutes } from './routes/foods.router'
import cookie from '@fastify/cookie'
import { authRoutes } from './routes/auth.router'

export const app = fastify()

app.register(authRoutes, {
  prefix: '/auth',
})
app.register(usersRoutes, {
  prefix: 'users',
})

app.register(foodsRoutes, {
  prefix: 'foods',
})
app.register(cookie)
