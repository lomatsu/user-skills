import { Application, Request, Response } from "express";
import { ControllerBase } from "../common/ControllerBase";
import { SkillModel } from "../database/model/Skill";
import { ISkillRepository } from "../repositories/SkillsRepository";
import { IUserSkillRepository } from "../repositories/UserSkillRepository";
import { SkillViewModel } from "../view-model/SkillViewModel";

export class SkillController extends ControllerBase<ISkillRepository> {
	public static readonly baseRouter: string = "/api/skills"
	public static readonly baseRouterUserSkills: string = "/api/user-skills"
	constructor(
		app: Application,
		repository: ISkillRepository,
		private userSkillRepository: IUserSkillRepository
	) {
		super(app, repository);
	}

	public async saveUserSkill(req: Request, res: Response): Promise<void> {
		try {
			const { body } = req
			if (!body) {
				res.status(400).json({ message: "Body is required" })
				return
			}
			const response = await this.userSkillRepository.create(body)
			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on save user skill" })
		}
	}
	public async updateUserSkill(req: Request, res: Response): Promise<void> {
		try {
			let userSkillId: string | number = req.params.userSkillId as string
			if (!userSkillId || +userSkillId < 1) {
				res.status(400).json({message: "User Skill Id is required"})
				return
			}
			userSkillId = parseInt(userSkillId, 10)
			if (isNaN(userSkillId)) {
				res.status(400).json({message: "User Skill Id should be a number"})
				return
			}
			const body = req.body
			if (!body || !Object.keys(body).length) {
				res.status(400).json({ message: "Body is required for this request" })
				return
			}
			let { skill_id, knowledge_level } = body

			const userSkillFounded = await this.userSkillRepository.getById(userSkillId)

			if (!userSkillFounded) {
				res.status(404).json({ message: "Not found" })
				return
			}
			const response = await this.userSkillRepository.update({ id: userSkillId, skill_id, knowledge_level })
			res.json(response)
		} catch (error) {
			res.status(500).json({ message: "Error on update user skill" })
		}
	}

	public async deleteUserSkill(req: Request, res: Response): Promise<void> {
		let userSkillId: string | number = req.params.userSkillId as string
		if (!userSkillId || +userSkillId < 1) {
			res.status(400).json({ message: "User Skill id is required" })
			return
		}
		userSkillId = parseInt(userSkillId, 10)
		if (isNaN(userSkillId)) {
			res.status(400).json({ message: "User Skill id should be number" })
			return
		}
		await this.userSkillRepository.delete(userSkillId)
		res.json({ message: "User Skill removed with success!" })
	}

	public async getByUserId(req: Request, res: Response): Promise<void> {
		try {
			let userId: string | number = req.params.userId as string
			if (!userId) {
				res.status(400).json({ message: "User id is required" })
				return
			}
			userId = parseInt(userId, 10)
			const userSkills = await this.userSkillRepository.getByUserId(userId)
			const skillsIds = userSkills.map((x: any) => x.skill_id)
			const skills = await this.repository.getByIds(skillsIds)
			const skillsViewModel = skills.map((x: SkillModel) => new SkillViewModel(x))
			res.json(skillsViewModel)
		} catch (error) {
			res.status(500).json({ message: "Error on get user skill by id" })
		}
	}

	public async getAll(req: Request, res: Response): Promise<void> {
		try {
			const skills = await this.repository.getAll()
			const response = skills.map((u) => new SkillViewModel(u))
			res.json(response)
		} catch (error: any) {
			res.status(500).json({ message: "Error on get all skills " })
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
			const skill = await this.repository.getById(id)
			if (!skill) {
				res.status(404).end()
				return
			}
			const response = new SkillViewModel(skill)
			res.json(response)
		} catch (error: any) {
			res.status(500).json({ message: "Error on get skill by id" })
		}
	}
	public async save(req: Request, res: Response): Promise<void> {
		try {
			const body = req.body
			const data = new SkillModel(body)
			const skill = await this.repository.create(data)
			const response = new SkillViewModel(skill)
			res.json(response)
		} catch (error: any) {
			res.status(500).json({ message: "Error on save skill" })
		}
	}
	public registerRoutes(): void {
		this.app.get(SkillController.baseRouter, this.getAll.bind(this))
		this.app.get(`${SkillController.baseRouter}/:id`, this.getById.bind(this))
		this.app.post(SkillController.baseRouter, this.save.bind(this))
		this.app.get(`${SkillController.baseRouterUserSkills}/by-user-id/:userId`, this.getByUserId.bind(this))
		this.app.post(SkillController.baseRouterUserSkills, this.saveUserSkill.bind(this))
		this.app.put(`${SkillController.baseRouterUserSkills}/:userSkillId`, this.updateUserSkill.bind(this))
		this.app.delete(`${SkillController.baseRouterUserSkills}/:userSkillId`, this.deleteUserSkill.bind(this))
	}
}
