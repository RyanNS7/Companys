import { EmployeeDTO } from "../../domain/entities/employee/employeDTO";
import { IEmployee } from "../../domain/entities/employee/employee";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { EmployeeRepo } from "../../domain/usecases/employeeRepo";
import { createEmployee } from "../DB/employee/createEmployeeInDB";
import { deleteEmployee } from "../DB/employee/deleteEmployeeInDB";
import { findEmployee } from "../DB/employee/findEmployeeInDB";

export class EmployeeRepository implements EmployeeRepo{
    async createEmployee(employee: IEmployee): Promise<EmployeeDTO | BadRequestError> {
        return await createEmployee(employee)
    }

    async deleteEmployee(id_employee: string): Promise<true | BadRequestError> {
        return await deleteEmployee(id_employee)
    }

    async findEmployee(id_employee: string): Promise<EmployeeDTO | NotFoundError> {
        return await findEmployee(id_employee)
    }
}