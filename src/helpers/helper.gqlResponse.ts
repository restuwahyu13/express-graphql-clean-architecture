import { assert } from 'is-any-type'

export interface IGraphqlResponse {
  stat_code: number
  stat_msg: string
  data?: any
  pagination?: Record<string, any>
}

export const gqlResponse = (code: number, message: string, data?: any, pagination?: Record<string, any>): IGraphqlResponse => {
  if (assert.isNull(data as any)) {
    return {
      stat_code: code,
      stat_msg: message
    }
  } else {
    return {
      stat_code: code,
      stat_msg: message,
      data: data,
      pagination: pagination
    }
  }
}
