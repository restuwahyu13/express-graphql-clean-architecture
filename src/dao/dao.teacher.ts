import { DTOTeacher } from '@dto/dto.teacher'

export interface DAOTeacher {
  createTeacherService(payload: DTOTeacher): Promise<any>
  resultsTeacherService(): Promise<any>
  resultTeacherService(params: number): Promise<any>
  deleteTeacherService(params: number): Promise<any>
  updateTeacherService(params: number, payload: DTOTeacher): Promise<any>
}
