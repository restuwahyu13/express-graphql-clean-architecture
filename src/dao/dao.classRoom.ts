import { DTOClassRoom, DTOClassRoomPagination } from '@dto/dto.classRoom'
import { GraphqlResponse } from '@helpers/helper.gqlResponse'

export interface DAOClassRoom {
  createClassRoomService(body: DTOClassRoom): Promise<GraphqlResponse>
  resultsClassRoomService(query: DTOClassRoomPagination): Promise<GraphqlResponse>
  resultClassRoomService(params: number): Promise<GraphqlResponse>
  deleteClassRoomService(params: number): Promise<GraphqlResponse>
  updateClassRoomService(params: number, body: DTOClassRoom): Promise<GraphqlResponse>
}
