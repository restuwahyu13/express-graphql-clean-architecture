import { DTOTeacherCreate, DTOTeacherById, DTOTeacherUpdate } from '@dto/dto.teacher'

export interface DAOTeacher {
  createTeacherService(payload: DTOTeacherCreate): Promise<any>
  resultsTeacherService(): Promise<any>
  resultTeacherService(payload: DTOTeacherById): Promise<any>
  deleteTeacherService(payload: DTOTeacherById): Promise<any>
  updateTeacherService(payload: DTOTeacherUpdate): Promise<any>
}
