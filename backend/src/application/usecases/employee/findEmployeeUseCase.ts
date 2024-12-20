import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"


export class findEmployeeUseCase{
    
    employeeRepo: EmployeeRepo

    constructor(employeeRepo: EmployeeRepo){
        this.employeeRepo = employeeRepo
    }
    async find(id_employee: string){

        const findEmployee = await this.employeeRepo.findEmployee(id_employee)

        return findEmployee instanceof NotFoundError? new NotFoundError(findEmployee.message) : findEmployee

    }
}