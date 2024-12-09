import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { GroupRepo } from "../../../domain/usecases/groupRepo"

export interface EmployeeGroup{
    id: string;
    group: string;
    employee: string;
}

export class addAnotherEmployeeToTheGroupUseCase{

    employeeRepo: EmployeeRepo
    groupRepo: GroupRepo

    constructor(employeeRepo: EmployeeRepo, groupRepo: GroupRepo){
        this.employeeRepo = employeeRepo
        this.groupRepo = groupRepo
    }

    async addEmployee(id_employee: string, id_group: string){

        const findGroup = await this.groupRepo.findGroup(id_group)

        if(findGroup instanceof NotFoundError){
            return new NotFoundError(findGroup.message)
        }

        const findEmployee = await this.employeeRepo.findEmployee(id_employee)

        if(findEmployee instanceof NotFoundError){
            return new NotFoundError(findEmployee.message)
        }

        const addEmployeeToTheGroup = await this.groupRepo.addAnotherEmployeeToTheGroup(findEmployee.employee.id, findGroup.id)

        return addEmployeeToTheGroup instanceof BadRequestError? new BadRequestError(addEmployeeToTheGroup.message) : addEmployeeToTheGroup
    }
    
}