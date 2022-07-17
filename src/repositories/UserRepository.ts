import { Knex } from "knex";
import { tableName } from "../database/helps";
import { UserModel } from "../database/model/User";
import { IRepository } from "./Repository";

export interface IUserRepository extends IRepository<UserModel> {
	getByLogin(email: string): Promise<UserModel>
}

export class UserRepository implements IUserRepository {
	constructor(private db: Knex) { }
	getByLogin(login: string): Promise<UserModel> {
		return this.db.select("*").from(tableName.USER).where({ login }).then((d) => d[0])
	}
	getAll(): Promise<UserModel[]> {
		return this.db.select("*").from(tableName.USER)
	}
	getById(id: number): Promise<UserModel> {
		return this.db.select("*").from(tableName.USER).where({ id }).then((d) => d[0])
	}
	create(data: UserModel): Promise<UserModel> {
		return this.db.insert(data, "*").into(tableName.USER).then((d) => d[0])
	}
	async update(data: Partial<UserModel>): Promise<UserModel> {
		const model = await this.getById(data.id!)
		if (!model) {
			throw new Error("User not found")
		}

		Object.keys(data).forEach((key: string) => {
			if ((data as any)[key]) {
				; (model as any)[key] = (data as any)[key]
			}
		})
		return this.db.update(data, "*").where({ id: data.id }).into(tableName.USER).then((d) => d[0])
	}
	async delete(id: number): Promise<boolean> {
		const model = await this.getById(id)
		if (!model) {
			throw new Error("User not found")
		}
		return this.db.where(id).from(tableName.USER).del()
	}
}
