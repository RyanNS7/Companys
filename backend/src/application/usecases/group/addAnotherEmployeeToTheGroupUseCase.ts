import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { GroupRepo } from "../../../domain/usecases/groupRepo"
import { ServiceGroup } from "./createGroupUseCase"


export class addAnotherEmployeeToTheGroupUseCase{

    employeeRepo: EmployeeRepo
    groupRepo: GroupRepo

    constructor(employeeRepo: EmployeeRepo, groupRepo: GroupRepo){
        this.employeeRepo = employeeRepo
        this.groupRepo = groupRepo
    }

    async addEmployee(id_employee: string, id_group: string){

        const findGroup = await this.groupRepo.findGroup<ServiceGroup | NotFoundError>(id_group)

        if(findGroup instanceof NotFoundError){
            return new NotFoundError(findGroup.message)
        }

        const addEmployeeToTheGroup = await this.groupRepo.addAnotherEmployeeToTheGroup<ServiceGroup | BadRequestError>(id_employee, id_group)

        return addEmployeeToTheGroup instanceof BadRequestError? new BadRequestError(addEmployeeToTheGroup.message) : addEmployeeToTheGroup
    }
    
}