import { DTOStudent, DTOStudentPagination } from '@dto/dto.student'
import { GraphqlResponse as Response } from '@helpers/helper.gqlResponse'

export interface DAOStudent {
  createStudentService(body: DTOStudent): Promise<Response>
  resultsStudentService(query: DTOStudentPagination): Promise<Response>
  resultStudentService(params: number): Promise<Response>
  deleteStudentService(params: number): Promise<Response>
  updateStudentService(params: number, body: DTOStudent): Promise<Response>
}
