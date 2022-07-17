export class ModelBase {
	id: number
	created_at?: Date | string
	updated_at?: Date | string

	constructor(params: ModelBase) {
		this.id = params.id
		this.created_at = params.created_at
		this.updated_at = params.updated_at
	}
}