import status from 'http-status'

import { ModelStudent } from '@models/model.student'
import { DTOStudentCreate, DTOStudentById, DTOStudentUpdate } from '@dto/dto.student'
import { DAOStudent } from '@dao/dao.student'
import { gqlResponse } from '@helpers/helper.gqlResponse'

export class ServiceStudent implements DAOStudent {
  constructor(private model: ModelStudent) {}

  async createStudentService(payload: DTOStudentCreate): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Student for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async resultsStudentService(): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Student for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async resultStudentService(payload: DTOStudentById): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Student for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async deleteStudentService(payload: DTOStudentById): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Student for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async updateStudentService(payload: DTOStudentUpdate): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Student for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }
}
