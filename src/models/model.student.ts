import { Model, QueryBuilder, RelationMappings, RelationMappingsThunk } from 'objection'

import { IStudent } from '@interfaces/interface.student'
import { ModelClassRoom } from '@models/model.classRoom'

export class ModelStudent extends Model implements IStudent {
  id!: number
  name!: string
  npm!: number
  fakultas!: string
  kejuruan!: string
  created_at?: Date
  updated_at?: Date

  static get tableName(): string {
    return 'students'
  }

  model(): QueryBuilder<ModelStudent> {
    return ModelStudent.query()
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      teachers: {
        relation: Model.ManyToManyRelation,
        modelClass: ModelClassRoom,
        join: {
          from: `${this.tableName}.id`,
          to: `${ModelClassRoom}.student_id`
        }
      }
    }
  }
}
