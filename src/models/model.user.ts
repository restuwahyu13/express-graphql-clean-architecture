import { Model, QueryBuilder } from 'objection'

import { IUser } from '@interfaces/interface.user'
import { Bcrptjs } from '@libs/lib.bcryptjs'

export class ModelUser extends Model implements IUser {
  id!: number
  email!: string
  password!: string
  role!: string
  created_at?: Date
  updated_at?: Date

  static get tableName(): string {
    return 'users'
  }

  model(): QueryBuilder<ModelUser> {
    return ModelUser.query()
  }

  async $beforeInsert(): Promise<void> {
    const password = await Bcrptjs.hashPassword(this.password)
    this.password = password
  }
}
