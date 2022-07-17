import Debug from "debug"

export default (suffix = "server"): Debug.Debugger =>
	Debug(`k12-back-end:${suffix}`)
