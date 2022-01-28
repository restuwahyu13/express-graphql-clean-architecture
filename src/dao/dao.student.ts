import { DTOStudent } from '@dto/dto.student'
import { GraphqlResponse } from '@helpers/helper.gqlResponse'

export interface DAOStudent {
  createStudentService(body: DTOStudent): Promise<GraphqlResponse>
  resultsStudentService(): Promise<GraphqlResponse>
  resultStudentService(params: number): Promise<GraphqlResponse>
  deleteStudentService(params: number): Promise<GraphqlResponse>
  updateStudentService(params: number, body: DTOStudent): Promise<GraphqlResponse>
}
