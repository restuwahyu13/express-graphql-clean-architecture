import { DTOUserRegister, DTOUserLogin } from '@dto/dto.user'
import { GraphqlResponse as Response } from '@helpers/helper.gqlResponse'

export interface DAOUsers {
  registerUserService(payload: DTOUserRegister): Promise<Response>
  loginUserService(payload: DTOUserLogin): Promise<Response>
}
