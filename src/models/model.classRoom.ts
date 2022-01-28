import { Model, QueryBuilder, RelationMappings, RelationMappingsThunk } from 'objection'

import { IClassRoom } from '@interfaces/interface.classRoom'
import { ModelTeacher } from '@models/model.teacher'
import { ModelStudent } from '@models/model.student'

export class ModelClassRoom extends Model implements IClassRoom {
  id!: number
  student_id!: number
  teacher_id!: number
  room_name!: string
  created_at?: Date
  updated_at?: Date

  static get tableName(): string {
    return 'class'
  }

  model(): QueryBuilder<ModelClassRoom> {
    return ModelClassRoom.query()
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      teachers: {
        relation: Model.ManyToManyRelation,
        modelClass: ModelTeacher,
        join: {
          from: `${this.tableName}.teacher_id`,
          to: `${ModelTeacher}.id`
        }
      },
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: ModelStudent,
        join: {
          from: `${this.tableName}.student_id`,
          to: `${ModelStudent}.id`
        }
      }
    }
  }
}
