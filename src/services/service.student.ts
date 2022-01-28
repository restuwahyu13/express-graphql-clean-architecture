import status from 'http-status'

import { ModelStudent } from '@models/model.student'
import { DTOStudent } from '@dto/dto.student'
import { DAOStudent } from '@dao/dao.student'
import { gqlResponse, GraphqlResponse } from '@helpers/helper.gqlResponse'

export class ServiceStudent extends ModelStudent implements DAOStudent {
  async createStudentService(body: DTOStudent): Promise<GraphqlResponse> {
    try {
      const checStudentNpm: ModelStudent = await super.model().where('npm', body.npm).orWhere('name', body.name).first()
      if (checStudentNpm) throw gqlResponse(status.BAD_REQUEST, 'Your are already registered')

      const createNewStudent: ModelStudent = await super.model().insertAndFetch(body).first()
      if (!createNewStudent) throw gqlResponse(status.BAD_REQUEST, 'Create new student failed')

      return Promise.resolve(gqlResponse(status.OK, 'Create new student success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async resultsStudentService(): Promise<GraphqlResponse> {
    try {
      const getAllStudents: ModelStudent[] = await super.model().select()

      return Promise.resolve(gqlResponse(status.OK, 'Student Ok', getAllStudents, {}))
    } catch (e: any) {
      return Promise.reject(gqlResponse(status.INTERNAL_SERVER_ERROR, e.message))
    }
  }

  async resultStudentService(params: number): Promise<GraphqlResponse> {
    try {
      const getStudent: ModelStudent = await super.model().where('id', params).first()
      if (!getStudent) throw gqlResponse(status.BAD_REQUEST, `StudentID for this id ${params}, is not exist`)

      return Promise.resolve(gqlResponse(status.OK, 'Student Ok', getStudent, {}))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async deleteStudentService(params: number): Promise<GraphqlResponse> {
    try {
      const checkStudentId: ModelStudent = await super.model().where('npm', params).first()
      if (!checkStudentId) throw gqlResponse(status.BAD_REQUEST, `StudentID for this id ${params}, is not exist`)

      const deleteStudent: number = await super.model().where('id', params).delete()
      if (!deleteStudent) throw gqlResponse(status.BAD_REQUEST, 'Delete student failed')

      return Promise.resolve(gqlResponse(status.OK, 'Delete student success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async updateStudentService(params: number, body: DTOStudent): Promise<GraphqlResponse> {
    try {
      const checkStudentId: ModelStudent = await super.model().where('id', params).first()
      if (!checkStudentId) throw gqlResponse(status.BAD_REQUEST, `StudentID for this id ${params}, is not exist`)

      const updateStudent: number = await super
        .model()
        .where('id', params)
        .update({ name: body.name, npm: body.npm, fakultas: body.fakultas, kejuruan: body.kejuruan })
      if (!updateStudent) throw gqlResponse(status.BAD_REQUEST, 'Update student failed')

      return Promise.resolve(gqlResponse(status.OK, 'Update student success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }
}
