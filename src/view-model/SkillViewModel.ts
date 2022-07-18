import { SkillModel } from "../database/model/Skill";

export class SkillViewModel {
	id: number
	name: string
	version: string
	description: string
	imageURL: string

	constructor(params: SkillModel) {
		this.id = params.id
		this.name = params.name
		this.version = params.version
		this.description = params.description
		this.imageURL = params.image_url
	}
}
