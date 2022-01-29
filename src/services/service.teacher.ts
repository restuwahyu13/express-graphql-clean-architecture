import status from 'http-status'

import { ModelTeacher } from '@models/model.teacher'
import { DTOTeacher, DTOTeacherPagination } from '@dto/dto.teacher'
import { DAOTeacher } from '@dao/dao.teacher'
import { gqlResponse, GraphqlResponse as Response } from '@helpers/helper.gqlResponse'

export class ServiceTeacher extends ModelTeacher implements DAOTeacher {
  async createTeacherService(body: DTOTeacher): Promise<Response> {
    try {
      const checkDosenName: ModelTeacher = await super.model().where('name', body.name).first()
      if (checkDosenName) throw gqlResponse(status.BAD_REQUEST, 'Your are already registered')

      const createNewTeacher: ModelTeacher = await super.model().insertAndFetch(body).first()
      if (!createNewTeacher) throw gqlResponse(status.BAD_REQUEST, 'Create new teacher failed')

      return gqlResponse(status.OK, 'Create new teacher success')
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }

  async resultsTeacherService(query: DTOTeacherPagination): Promise<Response> {
    try {
      const getAllTeachers: ModelTeacher[] = await super
        .model()
        .select(
          'teachers.name as teacher_name',
          'teachers.field_of_study as teacher_study',
          'class.room_name as teacher_class',
          'students.name as student_name'
        )
        .leftJoin('class', 'teachers.id', '=', 'class.teacher_id')
        .leftJoin('students', 'class.student_id', '=', 'students.id')
        .limit(query.limit)
        .offset(query.offset)

      return gqlResponse(status.OK, 'Teacher Ok', getAllTeachers)
    } catch (e: any) {
      throw gqlResponse(status.INTERNAL_SERVER_ERROR, e.message)
    }
  }

  async resultTeacherService(params: number): Promise<Response> {
    try {
      const getTeacher: ModelTeacher = await super.model().where('id', params).first()
      if (!getTeacher) throw gqlResponse(status.BAD_REQUEST, `TeacherID for this id ${params}, is not exist`)

      return gqlResponse(status.OK, 'Teacher Ok', getTeacher)
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }

  async deleteTeacherService(params: number): Promise<Response> {
    try {
      const checkTeacherId: ModelTeacher = await super.model().where('npm', params).first()
      if (!checkTeacherId) throw gqlResponse(status.BAD_REQUEST, `TeacherID for this id ${params}, is not exist`)

      const deleteTeacher: number = await super.model().where('id', params).delete()
      if (!deleteTeacher) throw gqlResponse(status.BAD_REQUEST, 'Delete teacher failed')

      return gqlResponse(status.OK, 'Delete teacher success')
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }

  async updateTeacherService(params: number, body: DTOTeacher): Promise<Response> {
    try {
      const checkTeacherId: ModelTeacher = await super.model().where('id', params).first()
      if (!checkTeacherId) throw gqlResponse(status.BAD_REQUEST, `TeacherID for this id ${params}, is not exist`)

      const updateStudent: number = await super.model().where('id', params).update({ name: body.name, field_of_study: body.field_of_study })
      if (!updateStudent) throw gqlResponse(status.BAD_REQUEST, 'Update teacher failed')

      return gqlResponse(status.OK, 'Update teacher success')
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }
}
