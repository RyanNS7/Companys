import { createEmployeeController } from "../../adapters/controllers/employee/createEmployeeController";
import { deleteEmployeeController } from "../../adapters/controllers/employee/deleteEmployeeController";
import { findEmployeeController } from "../../adapters/controllers/employee/findEmployeeController";
import { CompanyRepository } from "../../infra/implementations/companyRepository";
import { EmployeeRepository } from "../../infra/implementations/employeeRepository";
import Express, { Request, Response } from "express";

const employeeRouter = Express.Router()

employeeRouter.post("/create", async (req: Request, res: Response) => {
    const employee = await new createEmployeeController(new EmployeeRepository, new CompanyRepository).create(req)

    res.status(employee.statusCode).json(employee.body)
})

employeeRouter.delete("/delete", async (req: Request, res: Response) => {
    const employee = await new deleteEmployeeController(new EmployeeRepository).delete(req)

    res.status(employee.statusCode).json(employee.body)
})

employeeRouter.get("/find", async (req: Request, res: Response) => {
    const employee = await new findEmployeeController(new EmployeeRepository).find(req)

    res.status(employee.statusCode).json(employee.body)
})

export { employeeRouter }