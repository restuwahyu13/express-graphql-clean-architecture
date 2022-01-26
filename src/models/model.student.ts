import { Model, QueryBuilder, RelationMappings, RelationMappingsThunk } from 'objection'

import { IStudent } from '@interfaces/interface.student'
import { ModelTeacher } from '@models/model.teacher'

export class ModelStudent extends Model implements IStudent {
  id!: number
  name!: string
  npm!: number
  fakultas!: string
  kejuruan!: string
  password!: string
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
        modelClass: ModelStudent,
        join: {
          from: `${this.tableName}.id`,
          to: `${ModelTeacher}.student_id`
        }
      }
    }
  }
}
