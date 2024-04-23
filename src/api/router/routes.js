import express from 'express'
import { authUsers, changePasswordUsers, createUsers, deleteUsers, getUsers, getUsersById, loginUsers, updateUsers } from '../controllers/Users'
import rateLimit from 'express-rate-limit'

const users_routes = express.Router()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 15,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too much pressing the screen please wait a while longer !!",
})

users_routes.post("/users/create", createUsers)
users_routes.post("/users/login", limiter, loginUsers)
users_routes.post("/users/get", getUsers)
users_routes.get("/users/get-byid/:id", getUsersById)
users_routes.put("/users/update", updateUsers)
users_routes.delete("/users/delete/:id", deleteUsers)
users_routes.get("/users/auth", authUsers)
users_routes.put("/users/change-password", changePasswordUsers)

export default users_routes