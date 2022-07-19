#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app"
import knex from "../database/connection"
import http from "http"
import { Request, Response } from "express"
import Debug from "../common/debug"
import { AddressInfo } from "net"
import { tableName } from "../database/helps"
import { registerUserRoute, registerSkillRoute } from "../routes"
import { SkillRepository, UserRepository, UserSkillRepository } from "../repositories"
const debug = Debug()

app.use("/api/health-check", (_: Request, res: Response) => {
	res.json({ message: "System OK", env: process.env.NODE_ENV })
})

app.use("/api/health-check-database", (_: Request, res: Response) => {
	knex
		.select("*")
		.from(tableName.USER)
		.first()
		.then(() => {
			res.json({ message: "Database OK" })
		})
		.catch((err) => {
			debug("Error on connect database", err.message)
			if (err.message === 'database does not exist') {
				res.json({ msg: "Database OK" })
			} else {
				res.json({ error: "Error Database" })
			}
		})
})

// register routes

registerUserRoute(
	app,
	new UserRepository(knex)
)
registerSkillRoute(
	app,
	new SkillRepository(knex),
	new UserSkillRepository(knex)
)

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3333")
app.set("port", port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)
debug("Environment =>", process.env.NODE_ENV)

if (process.env.NODE_ENV !== "test") {
	/**
	 * Listen on provided port, on all network interfaces.
	 */

	server.listen(port)
	server.on("error", onError)
	server.on("listening", onListening)
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
	if (error.syscall !== "listen") {
		throw error
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges")
			process.exit(1)
			break
		case "EADDRINUSE":
			console.error(bind + " is already in use")
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr: string | AddressInfo | null = server.address()
	const bind =
		typeof addr === "string" ? "pipe " + addr : "port " + (addr || {}).port
	debug("Listening on " + bind)
}

export default app
