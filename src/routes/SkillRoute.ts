import { Application } from "express"
import { SkillController } from "../skill/SkillController"
import { ISkillRepository } from "../repositories/SkillsRepository"
import { IUserSkillRepository } from "../repositories/UserSkillRepository"


export const registerSkillRoute = (
	app: Application,
	repository: ISkillRepository,
	userSkillRepository: IUserSkillRepository
): void => {
	const controller = new SkillController(
		app,
		repository,
		userSkillRepository
	)
	controller.registerRoutes()
}
