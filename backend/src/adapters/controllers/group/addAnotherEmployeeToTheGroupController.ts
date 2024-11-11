import { addAnotherEmployeeToTheGroupUseCase } from "../../../application/usecases/group/addAnotherEmployeeToTheGroupUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { GroupRepo } from "../../../domain/usecases/groupRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, ok } from "../../../http/statusCode"

export class addAnotherEmployeeToTheGroupController{
    employeeRepo: EmployeeRepo
    groupRepo: GroupRepo

    constructor(employeeRepo: EmployeeRepo, groupRepo: GroupRepo){
        this.employeeRepo = employeeRepo
        this.groupRepo = groupRepo
    }

    async addEmployee(httpRequest: httpRequest): Promise<httpResponse>{

        const request = {
            id_employee: (httpRequest.body as {id_employee: string}).id_employee,
            id_group: (httpRequest.body as {id_group: string}).id_group
        }

        if(request.id_employee === undefined){
            return badRequest("Error, id employee is required")
        }

        if(request.id_group === undefined){
            return badRequest("Error, id group is required")
        }
        
        try {

            const addEmployeeToTheGroup = await new addAnotherEmployeeToTheGroupUseCase(this.employeeRepo, this.groupRepo).addEmployee(request.id_employee, request.id_group)

            if(addEmployeeToTheGroup instanceof BadRequestError){
                return badRequest(addEmployeeToTheGroup.message)
            }

            if(addEmployeeToTheGroup instanceof NotFoundError){
                return NotFound(addEmployeeToTheGroup.message)
            }

            return ok(addEmployeeToTheGroup)
            
        } catch (error) {
            return ServerError(error.message)
        }

    }
}