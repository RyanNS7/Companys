import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"

export class deleteEmployeeUseCase {

    employeeRepo: EmployeeRepo

    constructor(employeeRepo: EmployeeRepo){
        this.employeeRepo = employeeRepo
    }

    async delete(id_employee: string){

        const deleteEmployee = await this.employeeRepo.deleteEmployee<Boolean | BadRequestError>(id_employee)

        return deleteEmployee instanceof BadRequestError? new BadRequestError(deleteEmployee.message) : deleteEmployee

    }
}