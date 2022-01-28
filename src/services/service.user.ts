import status from 'http-status'
import { assert } from 'is-any-type'

import { ModelUser } from '@models/model.user'
import { DTOUserRegister, DTOUserLogin } from '@dto/dto.user'
import { gqlResponse, GraphqlResponse } from '@helpers/helper.gqlResponse'
import { DAOUsers } from '@dao/dao.user'
import { Bcrptjs, IPassword } from '@libs/lib.bcryptjs'
import { IToken, JsonWebToken } from '@libs/lib.jwt'

export class ServiceUser extends ModelUser implements DAOUsers {
  async registerUserService(body: DTOUserRegister): Promise<GraphqlResponse> {
    try {
      const checkUserEmail: ModelUser = await super.model().where('email', body.email).first()
      if (checkUserEmail) throw gqlResponse(status.BAD_REQUEST, 'Your are already registered')

      const createNewUser: ModelUser = await super.model().insertAndFetch(body).first()
      if (!createNewUser) throw gqlResponse(status.BAD_REQUEST, 'Create new user failed')

      return Promise.resolve(gqlResponse(status.OK, 'Create new user success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async loginUserService(body: DTOUserLogin): Promise<GraphqlResponse> {
    try {
      const checkUserEmail: ModelUser = await super.model().where('email', body.email).first()
      if (!checkUserEmail) throw gqlResponse(status.BAD_REQUEST, 'Your are not never registered')

      const comparePassword: IPassword = await Bcrptjs.comparePassword(body.password, checkUserEmail.password)
      if (!comparePassword.success) throw gqlResponse(status.BAD_REQUEST, 'Password is not match')

      const tokenPayload: Record<string, any> = { id: checkUserEmail.id, role: checkUserEmail.role }
      const generateToken: IToken | string | Promise<Error> = JsonWebToken.sign(tokenPayload, { expiredAt: 1, type: 'days' })
      if (assert.isPromise(generateToken as any)) throw gqlResponse(status.BAD_REQUEST, 'Generate activation token failed')

      return Promise.resolve(gqlResponse(status.OK, 'Login success', generateToken))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }
}
