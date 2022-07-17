import { UserModel } from "../database/model/User"

export class UserViewModel {
  id: number
  login: string
  password: string
  lastLoginDate: string

  constructor(params: UserModel) {
    this.id = params.id
    this.login = params.login
    this.password = params.password
    this.lastLoginDate = params.last_login_date
  }
}
