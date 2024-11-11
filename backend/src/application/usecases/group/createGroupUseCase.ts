import { EmployeeDTO } from "../../../domain/entities/employee/employeDTO"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { GroupRepo } from "../../../domain/usecases/groupRepo"

export interface ServiceGroup{
    id_group: string
    id_employees: string[]
    tasks?: string[]
}

export class createGroupUseCase{

    employeeRepo: EmployeeRepo
    groupRepo: GroupRepo

    constructor(employeeRepo: EmployeeRepo, groupRepo: GroupRepo){
        this.employeeRepo = employeeRepo
        this.groupRepo = groupRepo
    }

    async create(id_manager: string, id_employees: string[]){

        const findManger = await this.employeeRepo.findEmployee<EmployeeDTO | NotFoundError>(id_manager)

        if(findManger instanceof NotFoundError){
            return new NotFoundError(findManger.message)
        }

        if(findManger.employee.position !== "manager" && findManger.employee.position !== "geral manager"){
            return new BadRequestError("It is not allowed to create a group with this role")
        }

        const createGroup = await this.groupRepo.createGroup<ServiceGroup | BadRequestError>(id_manager, id_employees)

        return createGroup instanceof BadRequestError? new BadRequestError(createGroup.message) : createGroup

    }

}