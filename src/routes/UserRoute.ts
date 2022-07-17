import { Application } from "express"
import { UserController } from "../user/UserController"

import { IUserRepository } from "../repositories"

export const registerUserRoute = (
	app: Application,
	repository: IUserRepository,
): void => {
	const controller = new UserController(
		app,
		repository,
	)
	controller.registerRoutes()
}
