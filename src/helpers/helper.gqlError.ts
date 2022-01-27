import { createError } from 'apollo-errors'
import moment from 'moment'

export const graphqlError = (code: number, msg: string) => {
  const GraphqlError: any = createError('GraphqlError', {
    message: msg,
    time_thrown: moment(new Date()).format('DD-MM-YYYY HH:SS:MM'),
    options: {
      showLocations: true,
      showPath: true
    },
    data: {
      stat_code: code,
      stat_msg: msg
    }
  })

  return new GraphqlError()
}
