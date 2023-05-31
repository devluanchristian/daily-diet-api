// eslint-disable-next-line no-unused-vars
import { Knex } from 'knex'

export type UserTable = {
  id: string
  name: string
  email: string
  password: string
}

export type FoodsTable = {
  id: string
  name: string
  description: string
  date: Date | number
  isDiet: boolean
  user_id: string
}

declare module 'knex/types/tables' {
  export interface Tables {
    users: UserTable
    foods: FoodsTable
  }
}
