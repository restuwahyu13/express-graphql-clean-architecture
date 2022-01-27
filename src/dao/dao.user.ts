import { DTOUserRegister, DTOUserLogin } from '@dto/dto.user'
import { GraphqlResponse } from '@helpers/helper.gqlResponse'

export interface DAOUsers {
  registerUserService(payload: DTOUserRegister): Promise<GraphqlResponse>
  loginUserService(payload: DTOUserLogin): Promise<GraphqlResponse>
}
