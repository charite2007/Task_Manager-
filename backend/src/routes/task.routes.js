import express from "express"
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller.js";

const routes = express.Router()

routes.get("/",getTasks);
routes.get("/:id",getTaskById)
routes.post("/create",createTask)
routes.put("/:id",updateTask)
routes.delete("/:id",deleteTask)

export default routes