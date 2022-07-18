import { Knex } from "knex"
import { tableName } from "../database/helps"
import { SkillModel } from "../database/model/Skill"
import { IRepository } from "./Repository"

export interface ISkillRepository extends IRepository<SkillModel> {
	getByIds(ids: number[]): Promise<any>
}

export class SkillRepository implements ISkillRepository {
	constructor(private db: Knex) {}
	getByIds(ids: number[]): Promise<any[]> {
		return this.db.select("*").from(tableName.SKILL).whereIn("id", ids)
	}
	getAll(): Promise<SkillModel[]> {
		return this.db.select("*").from(tableName.SKILL)
	}
	getById(id: number): Promise<SkillModel> {
		return this.db.select("*").from(tableName.SKILL).where({ id }).then((d) => d[0])
	}
	create(data: SkillModel): Promise<SkillModel> {
		return this.db.insert(data, "*").into(tableName.SKILL).then((d) => d[0])
	}
	async update(data: Partial<SkillModel>): Promise<SkillModel> {
		const model = await this.getById(data.id!)
		if (!model) {
			throw new Error("Skill not found")
		}

		Object.keys(data).forEach((key: string) => {
			if ((data as any)[key]) {
				; (model as any)[key] = (data as any)[key]
			}
		})
		return this.db.update(data, "*").where({ id: data.id }).into(tableName.SKILL).then((d) => d[0])
	}
	async delete(id: number): Promise<boolean> {
		const model = await this.getById(id)
		if (!model) {
			throw new Error("Skill not found")
		}
		return this.db.where(id).from(tableName.SKILL).del()
	}
}
