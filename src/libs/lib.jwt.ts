import jwt from 'jsonwebtoken'

import { convertTime } from '@helpers/helper.convertTime'

const secretKey: string = process.env.JWT_SECRET_KEY || ''
const typeTime: Record<string, string> = {
  days: 'd',
  minute: 'm',
  second: 's'
}

export interface IToken {
  accessToken: string
  accessTokenExpired: string
}

interface Options {
  expiredAt: number
  type: string
}

export class JsonWebToken {
  static sign = (data: Record<string, any>, options: Options): IToken | string => {
    const accessToken: string = jwt.sign({ ...data }, secretKey, {
      expiresIn: `${options.expiredAt}${typeTime[options.type]}`,
      audience: 'graphql'
    })
    const token: IToken = {
      accessToken: accessToken,
      accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`
    }
    return token
  }

  static verify = (accessToken: string): jwt.JwtPayload | string => {
    const decodedToken: string | jwt.JwtPayload = jwt.verify(accessToken, secretKey, { audience: 'graphql' })
    return decodedToken
  }
}
