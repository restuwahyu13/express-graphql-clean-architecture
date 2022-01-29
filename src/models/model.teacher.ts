import { Model, QueryBuilder, RelationMappings, RelationMappingsThunk } from 'objection'

import { ITeacher } from '@interfaces/interface.teacher'
import { ModelClassRoom } from '@models/model.classRoom'

export class ModelTeacher extends Model implements ITeacher {
  id!: number
  name!: string
  field_of_study!: string
  created_at?: Date
  updated_at?: Date

  static get tableName(): string {
    return 'teachers'
  }

  model(): QueryBuilder<ModelTeacher> {
    return ModelTeacher.query()
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      classRoom: {
        relation: Model.ManyToManyRelation,
        modelClass: ModelClassRoom,
        join: {
          from: `${this.tableName}.id`,
          to: `${ModelClassRoom}.teacher_id`
        }
      }
    }
  }
}
