import express from "express"
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller.js";

const routes = express.Router()

routes.get("/",getTasks);
routes.get("/:id",getTaskById)
routes.put("/:id",updateTask)
routes.delete("/:id",deleteTask)
routes.post("/createTask",createTask)

export default routes