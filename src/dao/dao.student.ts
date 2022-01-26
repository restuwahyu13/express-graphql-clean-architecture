import { DTOStudentById, DTOStudentCreate, DTOStudentUpdate } from '@dto/dto.student'

export interface DAOStudent {
  createStudentService(payload: DTOStudentCreate): Promise<any>
  resultsStudentService(): Promise<any>
  resultStudentService(payload: DTOStudentById): Promise<any>
  deleteStudentService(payload: DTOStudentById): Promise<any>
  updateStudentService(payload: DTOStudentUpdate): Promise<any>
}
