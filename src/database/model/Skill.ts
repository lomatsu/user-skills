import { SkillViewModel } from "../../view-model/SkillViewModel"
import { ModelBase } from "./Base"

export class SkillModel extends ModelBase {
	name: string
	version: string
	description: string
	image_url: string

	constructor(params: SkillViewModel) {
		super(params);
		this.name = params.name
		this.version = params.version
		this.description = params.description
		this.image_url = params.imageURL
	}
}
