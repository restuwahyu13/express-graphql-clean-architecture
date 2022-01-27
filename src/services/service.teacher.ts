import status from 'http-status'

import { ModelTeacher } from '@models/model.teacher'
import { DTOTeacherCreate, DTOTeacherById, DTOTeacherUpdate } from '@dto/dto.teacher'
import { DAOTeacher } from '@dao/dao.teacher'
import { gqlResponse } from '@helpers/helper.gqlResponse'

export class ServiceTeacher extends ModelTeacher implements DAOTeacher {
  async createTeacherService(payload: DTOTeacherCreate): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Teacher for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async resultsTeacherService(): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Teacher for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async resultTeacherService(payload: DTOTeacherById): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Teacher for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async deleteTeacherService(payload: DTOTeacherById): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Teacher for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }

  async updateTeacherService(payload: DTOTeacherUpdate): Promise<any> {
    try {
      return Promise.resolve(gqlResponse(status.OK, 'Create new Teacher for mitra or customer success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code, e.stat_message || e.message))
    }
  }
}
