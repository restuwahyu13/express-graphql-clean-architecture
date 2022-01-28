import { DTOTeacher, DTOTeacherPagination } from '@dto/dto.teacher'
import { GraphqlResponse } from '@helpers/helper.gqlResponse'

export interface DAOTeacher {
  createTeacherService(body: DTOTeacher): Promise<GraphqlResponse>
  resultsTeacherService(query: DTOTeacherPagination): Promise<GraphqlResponse>
  resultTeacherService(params: number): Promise<GraphqlResponse>
  deleteTeacherService(params: number): Promise<GraphqlResponse>
  updateTeacherService(params: number, body: DTOTeacher): Promise<GraphqlResponse>
}
