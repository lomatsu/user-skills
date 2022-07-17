import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const auth = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization
		if(!authHeader) {
			res.status(401).json({message: "Access denied"})
			return
		}
		const token = authHeader.split(" ")[1]
		const secret = process.env.SECRET || ""

		await jwt.verify(token, secret, (err: any, user: any) => {
			if(err) {
				res.status(403).end()
				return
			}
			req.user = user
			next()
		})
	} catch (error) {
    res.status(400).json({ message: "Invalid token" });
	}
}
