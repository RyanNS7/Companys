import { EmployeeDTO } from "../entities/employee/employeDTO"
import { IEmployee } from "../entities/employee/employee"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"

export interface EmployeeRepo {

    createEmployee(employee: IEmployee): Promise<EmployeeDTO | BadRequestError>
    deleteEmployee(id_employee: string): Promise<true | BadRequestError>
    findEmployee(id_employee: string): Promise<EmployeeDTO | NotFoundError>

}