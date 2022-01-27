import bcryptjs from 'bcryptjs'

export interface IPassword {
  success: boolean
  error: InstanceType<typeof Error>
}

export class Bcrptjs {
  static hashPassword = async (password: string): Promise<string> => {
    const res: string = await bcryptjs.hash(password, bcryptjs.genSaltSync(10))
    return res
  }

  static comparePassword = (password: string, hashPassword: string): Promise<IPassword> => {
    return new Promise(async (resolve, reject) => {
      await bcryptjs.compare(password, hashPassword, (error, success) => resolve({ error, success }))
    })
  }
}
