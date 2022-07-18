import { Knex } from "knex"
import { tableName } from "../database/helps"
import { IRepository } from "./Repository"

export interface IUserSkillRepository extends IRepository<any> {
	getByUserId(userId: number): Promise<any>
}

export class UserSkillRepository implements IUserSkillRepository {
	constructor(private db: Knex) { }
	getByUserId(userId: number): Promise<any> {
		return this.db.select("*").from(tableName.USER_SKILL).where({ user_id: userId })
	}
	getAll(): Promise<any[]> {
		return this.db.select("*").from(tableName.USER_SKILL)
	}
	getById(id: number): Promise<any> {
		return this.db.select("*").from(tableName.USER_SKILL).where({ id }).then((d) => d[0])
	}
	create(data: any): Promise<any> {
		return this.db.insert(data, "*").into(tableName.USER_SKILL).then((d) => d[0])
	}
	async update(data: Partial<any>): Promise<any> {
		const model = await this.getById(data.id!)
		if (!model) {
			throw new Error("User Skill not found")
		}

		Object.keys(data).forEach((key: string) => {
			if ((data as any)[key]) {
				; (model as any)[key] = (data as any)[key]
			}
		})

		return this.db.update(data, "*").where({ id: data.id }).into(tableName.USER_SKILL).then((d) => d[0])
	}
	async delete(id: number): Promise<boolean> {
		const model = await this.getById(id)

		if (!model) {
			throw new Error("User Skill not found")
		}
		return this.db.where({ id }).from(tableName.USER_SKILL).del()
	}
}
