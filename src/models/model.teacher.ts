import { Model, QueryBuilder, RelationMappings, RelationMappingsThunk } from 'objection'

import { ITeacher } from '@interfaces/interface.teacher'
import { ModelStudent } from '@models/model.student'

export class ModelTeacher extends Model implements ITeacher {
  id!: number
  student_id!: number
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
