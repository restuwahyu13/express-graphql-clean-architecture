import winston from 'winston'
import moment from 'moment'

export class Winston {
  static logger(name: string, data: Record<string, any>): void {
    const winstonLogger: winston.Logger = winston.createLogger({
      level: 'error',
      format: winston.format.json(),
      transports: [new winston.transports.Console({ level: 'error' })]
    })
    winstonLogger.log('error', data['stat_msg'], {
      name: name,
      method: 'POST',
      code: data['stat_code'],
      timestamp: moment(new Date()).format('DD-MM-YYYY HH:SS:MM')
    })
  }
}
