import status from 'http-status'

import { ModelTeacher } from '@models/model.teacher'
import { DTOTeacher } from '@dto/dto.teacher'
import { DAOTeacher } from '@dao/dao.teacher'
import { gqlResponse, GraphqlResponse } from '@helpers/helper.gqlResponse'

export class ServiceTeacher extends ModelTeacher implements DAOTeacher {
  async createTeacherService(payload: DTOTeacher): Promise<GraphqlResponse> {
    try {
      const checkDosenName: ModelTeacher = await super
        .model()
        .where('student_id', payload.student_id)
        .andWhere('name', payload.name)
        .first()
      if (checkDosenName) throw gqlResponse(status.BAD_REQUEST, 'Your are already registered')

      const createNewTeacher: ModelTeacher = await super.model().insertAndFetch(payload).first()
      if (!createNewTeacher) throw gqlResponse(status.BAD_REQUEST, 'Create new teacher failed')

      return Promise.resolve(gqlResponse(status.OK, 'Create new teacher success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async resultsTeacherService(): Promise<GraphqlResponse> {
    try {
      const getAllTeachers: ModelTeacher[] = await super.model().select()

      return Promise.resolve(gqlResponse(status.OK, 'Teacher Ok', getAllTeachers, {}))
    } catch (e: any) {
      return Promise.reject(gqlResponse(status.INTERNAL_SERVER_ERROR, e.message))
    }
  }

  async resultTeacherService(params: number): Promise<GraphqlResponse> {
    try {
      const getTeacher: ModelTeacher = await super.model().where('id', params).first()
      if (!getTeacher) throw gqlResponse(status.BAD_REQUEST, `TeacherID for this id ${params}, is not exist`)

      return Promise.resolve(gqlResponse(status.OK, 'Teacher Ok', getTeacher, {}))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async deleteTeacherService(params: number): Promise<GraphqlResponse> {
    try {
      const checkTeacherId: ModelTeacher = await super.model().where('npm', params).first()
      if (!checkTeacherId) throw gqlResponse(status.BAD_REQUEST, `TeacherID for this id ${params}, is not exist`)

      const deleteTeacher: number = await super.model().where('id', params).delete()
      if (!deleteTeacher) throw gqlResponse(status.BAD_REQUEST, 'Delete teacher failed')

      return Promise.resolve(gqlResponse(status.OK, 'Delete teacher success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async updateTeacherService(params: number, payload: DTOTeacher): Promise<GraphqlResponse> {
    try {
      const checkTeacherId: ModelTeacher = await super.model().where('id', params).first()
      if (!checkTeacherId) throw gqlResponse(status.BAD_REQUEST, `TeacherID for this id ${params}, is not exist`)

      const updateStudent: number = await super
        .model()
        .where('id', params)
        .update({ name: payload.name, student_id: payload.student_id, field_of_study: payload.field_of_study })
      if (!updateStudent) throw gqlResponse(status.BAD_REQUEST, 'Update teacher failed')

      return Promise.resolve(gqlResponse(status.OK, 'Update teacher success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }
}
