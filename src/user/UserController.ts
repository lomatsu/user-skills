import { Application, Request, Response } from "express";
import { ControllerBase } from "../common/ControllerBase";
import { UserModel } from "../database/model/User";
import { IUserRepository } from "../repositories/UserRepository";
import { UserViewModel } from "../view-model/UserViewModel";
import jwt from 'jsonwebtoken'
import { decrypt } from "../common/crypto"

const secret = process.env.SECRET || ""

export class UserController extends ControllerBase<IUserRepository> {
	public static readonly baseRouter: string = "/api/users"
	constructor(app: Application, repository: IUserRepository) {
		super(app, repository)
	}
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { login, password } = req.body
			if (!login) {
				res.status(400).json({ message: "login is required" })
				return
			}
			if (!password) {
				res.status(400).json({ message: "Password is required" })
				return
			}
			const userExists = await this.repository.getByLogin(login)
			if (!userExists) {
				res.status(400).json({ message: "User doesn't exists" })
				return
			}
			const checkPassword = await decrypt(password, userExists.password)

			if (!checkPassword) {
				res.status(400).json({ message: "Verify login and password" })
				return
			}

			const token = jwt.sign({ id: userExists.id }, secret)
			res.json({ token })
		} catch (error) {
			res.status(500).json({ message: "Error on login" })
		}
	}

	public async getByLogin(req: Request, res: Response): Promise<void> {
		try {
			const login: string = req.params.login as string
			if (!login) {
				res.status(400).json({ message: "login is required" })
				return
			}
			const user = await this.repository.getByLogin(login)
			if (!user) {
				res.status(404).end()
				return
			}
			const response = new UserViewModel(user)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get user by login" })
		}
	}

	public async getAll(req: Request, res: Response): Promise<void> {
		try {
			const users = await this.repository.getAll()
			const response = users.map((user) => new UserViewModel(user))

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get all users" })
		}
	}
	public async getById(req: Request, res: Response): Promise<void> {
		try {
			let id: string | number = req.params.id as string
			if (!id || +id < 1) {
				res.status(404).end()
				return
			}
			id = parseInt(id, 10)
			const user = await this.repository.getById(id)
			if (!user) {
				res.status(404).end()
				return
			}
			const response = await this.repository.getById(id)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on get user by id" })
		}
	}
	public async save(req: Request, res: Response): Promise<void> {
		try {
			const { body } = req
			const data = new UserModel(body)
			const user = await this.repository.create(data)
			const response = new UserViewModel(user)

			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on save user" })
		}
	}
	public async registerRoutes(): Promise<void> {
		this.app.get(UserController.baseRouter, this.getAll.bind(this))
		this.app.post(UserController.baseRouter, this.save.bind(this))
		this.app.get(`${UserController.baseRouter}/:id`, this.getById.bind(this))
		this.app.post(`${UserController.baseRouter}/login`, this.login.bind(this))
	}
}
