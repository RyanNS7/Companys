import { createGroupUseCase } from "../../../application/usecases/group/createGroupUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { GroupRepo } from "../../../domain/usecases/groupRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, created } from "../../../http/statusCode"

export class createGroupController{
    employeeRepo: EmployeeRepo
    groupRepo: GroupRepo

    constructor(employeeRepo: EmployeeRepo, groupRepo: GroupRepo){
        this.employeeRepo = employeeRepo
        this.groupRepo = groupRepo
    }

    async create(httpRequest: httpRequest): Promise<httpResponse>{

        const request = {
            id_manager: (httpRequest.body as {id_manager: string}).id_manager,
            id_employees: (httpRequest.body as {id_employees: string[]}).id_employees
        }

        if(request.id_manager === undefined){
            return badRequest("Error, id manager is required")
        }

        if(request.id_employees === undefined){
            return badRequest("Error, id employees is required")
        }

        try {

            const createGroup = await new createGroupUseCase(this.employeeRepo, this.groupRepo).create(request.id_manager, request.id_employees)

            if(createGroup instanceof BadRequestError){
                return badRequest(createGroup.message)
            }

            if(createGroup instanceof NotFoundError){
                return NotFound(createGroup.message)
            }

            return created(createGroup)
            
        } catch (error) {
            return ServerError(error.message)
        }

    }
}