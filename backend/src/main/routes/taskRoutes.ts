import { changeTaskCompletedStatusController } from "../../adapters/controllers/task/changeTaskCompletedStatusController";
import { createTaskController } from "../../adapters/controllers/task/createTaskController";
import { taskRepository } from "../../infra/implementations/taskRepository";
import Express, { Request, Response } from "express";

const taskRouter = Express.Router()

taskRouter.post("/create", async (req: Request, res: Response) => {
    const task = await new createTaskController(new taskRepository).create(req)

    res.json(task.body).status(task.statusCode)
})

taskRouter.put("/changeStatus", async (req: Request, res: Response) => {
    const task = await new changeTaskCompletedStatusController(new taskRepository).changeStatus(req)

    res.json(task.body).status(task.statusCode)
})

export { taskRouter }