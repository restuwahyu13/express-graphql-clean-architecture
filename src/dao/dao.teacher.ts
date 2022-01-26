import { DTOTeacher } from '@dto/dto.teacher'

export interface DAOServiceTeacher {
  // createStudentService(payload: DTOStudentCreate): Promise<any>
  // resultsStudentService(): Promise<any>
  // resultStudentService(payload: DTOStudentById): Promise<any>
  // deleteStudentService(payload: DTOStudentById): Promise<any>
  // updateStudentService(payload: DTOStudentUpdate): Promise<any>
}

export interface DAOControllerTeacher {
  teacher(root?: any, arg?: any, ctx?: any): Promise<any>
}
