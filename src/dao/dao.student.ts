import { DTOStudent } from '@dto/dto.student'

export interface DAOStudent {
  createStudentService(payload: DTOStudent): Promise<any>
  resultsStudentService(): Promise<any>
  resultStudentService(params: number): Promise<any>
  deleteStudentService(params: number): Promise<any>
  updateStudentService(params: number, payload: DTOStudent): Promise<any>
}
