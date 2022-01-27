import status from 'http-status'

import { ModelStudent } from '@models/model.student'
import { DTOStudentCreate, DTOStudentById, DTOStudentUpdate } from '@dto/dto.student'
import { DAOStudent } from '@dao/dao.student'
import { gqlResponse } from '@helpers/helper.gqlResponse'

export class ServiceStudent extends ModelStudent implements DAOStudent {
  async createStudentService(payload: DTOStudentCreate): Promise<any> {
    try {
      const checStudentNpm: ModelStudent = await super.model().where('npm', payload.npm).orWhere('name', payload.name).first()
      if (checStudentNpm) throw gqlResponse(status.BAD_REQUEST, 'Your are already registered')

      const createNewStudent: ModelStudent = await super.model().insertAndFetch(payload).first()
      if (!createNewStudent) throw gqlResponse(status.BAD_REQUEST, 'Create new student failed')

      return Promise.resolve(gqlResponse(status.OK, 'Create new student success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async resultsStudentService(): Promise<any> {
    try {
      const getAllStudents: ModelStudent[] = await super.model().select()

      return Promise.resolve(gqlResponse(status.OK, 'Student Ok', getAllStudents, {}))
    } catch (e: any) {
      return Promise.reject(gqlResponse(status.INTERNAL_SERVER_ERROR, e.message))
    }
  }

  async resultStudentService(payload: DTOStudentById): Promise<any> {
    try {
      const getStudent: ModelStudent = await super.model().where('id', payload.id).first()
      if (!getStudent) throw gqlResponse(status.BAD_REQUEST, `StudentID for this id ${payload.id}, is not exist`)

      return Promise.resolve(gqlResponse(status.OK, 'Student Ok', getStudent, {}))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async deleteStudentService(payload: DTOStudentById): Promise<any> {
    try {
      const checkStudentId: ModelStudent = await super.model().where('npm', payload.id).first()
      if (!checkStudentId) throw gqlResponse(status.BAD_REQUEST, `StudentID for this id ${payload.id}, is not exist`)

      const deleteStudent: number = await super.model().where('id', payload.id).delete()
      if (!deleteStudent) throw gqlResponse(status.BAD_REQUEST, 'Delete student failed')

      return Promise.resolve(gqlResponse(status.OK, 'Delete student success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }

  async updateStudentService(payload: DTOStudentUpdate): Promise<any> {
    try {
      const checkStudentId: ModelStudent = await super.model().where('npm', payload.npm).first()
      if (!checkStudentId) throw gqlResponse(status.BAD_REQUEST, `StudentID for this id ${payload.id}, is not exist`)

      const updateStudent: number = await super
        .model()
        .where('id', payload.id)
        .update({ name: payload.name, npm: payload.npm, fakultas: payload.fakultas, kejuruan: payload.kejuruan })
      if (!updateStudent) throw gqlResponse(status.BAD_REQUEST, 'Update student failed')

      return Promise.resolve(gqlResponse(status.OK, 'Update student success'))
    } catch (e: any) {
      return Promise.reject(gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message))
    }
  }
}
