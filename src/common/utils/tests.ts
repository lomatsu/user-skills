import { Application } from "express"
import httpMock from "node-mocks-http"
import { agent as supertest, SuperAgentTest } from "supertest"

export const createExpressRequestMock = httpMock.createRequest

export const createExpressResponseMock = httpMock.createResponse

export const TOKEN = "d4dcbbc8391d7e5bd14490d67a1a5215d2f5c60b"

export default (app: Application): SuperAgentTest => {
	const agent = supertest(app)
	agent.auth(TOKEN, { type: "bearer" })
	return agent
}
