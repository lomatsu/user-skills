import dotenv from 'dotenv'
dotenv.config()

import express, { Request } from "express"
import logger from "morgan"
import cors from "cors"

const app = express()

const corsOptionsDelegate = function (
	req: Request,
	callback: (error: Error | null, options: any) => void
) {
	if (process.env.NODE_ENV !== "production") {
		return callback(null, { origin: true })
	}
	let corsOptions = { origin: false }
	callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

export default app
