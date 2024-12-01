import { addAnotherEmployeeToTheGroupController } from "../../adapters/controllers/group/addAnotherEmployeeToTheGroupController";
import { createGroupController } from "../../adapters/controllers/group/createGroupController";
import { EmployeeRepository } from "../../infra/implementations/employeeRepository";
import { GroupRepository } from "../../infra/implementations/groupRepository";
import { taskRepository } from "../../infra/implementations/taskRepository";
import Express, { Request, Response } from "express";

const groupRouter = Express.Router()

groupRouter.post("/create", async (req: Request, res: Response) => {
    const group = await new createGroupController(new taskRepository, new GroupRepository).create(req)

    res.status(group.statusCode).json(group.body)
})

groupRouter.post("/newEmployee", async (req: Request, res: Response) => {
    const addNewEmployee = await new addAnotherEmployeeToTheGroupController(new EmployeeRepository, new GroupRepository).addEmployee(req)

    res.status(addNewEmployee.statusCode).json(addNewEmployee.body)
})

export { groupRouter }