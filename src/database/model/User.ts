import { UserViewModel } from "../../view-model/UserViewModel"
import { ModelBase } from "./Base"

export class UserModel extends ModelBase {
	login: string
	password: string
	last_login_date: string

	constructor(params: UserViewModel) {
		super(params)
		this.login = params.login
		this.password = params.password
		this.last_login_date = params.lastLoginDate
	}
}
