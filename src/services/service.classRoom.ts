import status from 'http-status'

import { ModelClassRoom } from '@models/model.classRoom'
import { DAOClassRoom } from '@dao/dao.classRoom'
import { DTOClassRoom, DTOClassRoomPagination as DTOPagination } from '@dto/dto.classRoom'
import { gqlResponse, GraphqlResponse as Response } from '@helpers/helper.gqlResponse'

export class ServiceClassRoom extends ModelClassRoom implements DAOClassRoom {
  async createClassRoomService(body: DTOClassRoom): Promise<Response> {
    try {
      const createNewClassroom: ModelClassRoom = await super.model().insertAndFetch(body).first()
      if (!createNewClassroom) throw gqlResponse(status.BAD_REQUEST, 'Create new Class failed')

      return gqlResponse(status.OK, 'Create new Class success')
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }

  async resultsClassRoomService(query: DTOPagination): Promise<Response> {
    try {
      const getAllClasssRoom: ModelClassRoom[] = await super
        .model()
        .select('class.*', 'students.name as student_name', 'teachers.name as teacher_name')
        .leftJoin('students', 'class.student_id', 'students.id')
        .leftJoin('teachers', 'class.teacher_id', 'teachers.id')
        .limit(query.limit)
        .offset(query.offset)

      return gqlResponse(status.OK, 'Class Room Ok', getAllClasssRoom)
    } catch (e: any) {
      throw gqlResponse(status.INTERNAL_SERVER_ERROR, e.message)
    }
  }

  async resultClassRoomService(params: number): Promise<Response> {
    try {
      const getClassRoom: ModelClassRoom = await super.model().where('id', params).first()
      if (!getClassRoom) throw gqlResponse(status.BAD_REQUEST, `ClassRoomID for this id ${params}, is not exist`)

      return gqlResponse(status.OK, 'Class Room Ok', getClassRoom)
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }

  async deleteClassRoomService(params: number): Promise<Response> {
    try {
      const checkClassRoomId: ModelClassRoom = await super.model().where('npm', params).first()
      if (!checkClassRoomId) throw gqlResponse(status.BAD_REQUEST, `ClassRoomID for this id ${params}, is not exist`)

      const deleteClassRoom: number = await super.model().where('id', params).delete()
      if (!deleteClassRoom) throw gqlResponse(status.BAD_REQUEST, 'Delete Class room failed')

      return gqlResponse(status.OK, 'Delete Class room success')
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }

  async updateClassRoomService(params: number, body: DTOClassRoom): Promise<Response> {
    try {
      const checkClassRoomId: ModelClassRoom = await super.model().where('id', params).first()
      if (!checkClassRoomId) throw gqlResponse(status.BAD_REQUEST, `ClassRoomID for this id ${params}, is not exist`)

      const updateClassRoom: number = await super
        .model()
        .where('id', params)
        .update({ room_name: body.room_name, student_id: body.student_id, teacher_id: body.teacher_id })
      if (!updateClassRoom) throw gqlResponse(status.BAD_REQUEST, 'Update Class Room failed')

      return gqlResponse(status.OK, 'Update Class Room success')
    } catch (e: any) {
      throw gqlResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_msg || e.message)
    }
  }
}
