import { DTOClassRoom, DTOClassRoomPagination } from '@dto/dto.classRoom'
import { GraphqlResponse as Response } from '@helpers/helper.gqlResponse'

export interface DAOClassRoom {
  createClassRoomService(body: DTOClassRoom): Promise<Response>
  resultsClassRoomService(query: DTOClassRoomPagination): Promise<Response>
  resultClassRoomService(params: number): Promise<Response>
  deleteClassRoomService(params: number): Promise<Response>
  updateClassRoomService(params: number, body: DTOClassRoom): Promise<Response>
}
