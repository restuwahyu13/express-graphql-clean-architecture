import { DTOTeacher, DTOTeacherPagination } from '@dto/dto.teacher'
import { GraphqlResponse as Response } from '@helpers/helper.gqlResponse'

export interface DAOTeacher {
  createTeacherService(body: DTOTeacher): Promise<Response>
  resultsTeacherService(query: DTOTeacherPagination): Promise<Response>
  resultTeacherService(params: number): Promise<Response>
  deleteTeacherService(params: number): Promise<Response>
  updateTeacherService(params: number, body: DTOTeacher): Promise<Response>
}
