import { findEmployeeUseCase } from "../../../application/usecases/employee/findEmployeeUseCase"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, ok } from "../../../http/statusCode"

export class findEmployeeController{
    employeeRepo: EmployeeRepo

    constructor(employeeRepo: EmployeeRepo){
        this.employeeRepo = employeeRepo
    }

    async find(httpRequest: httpRequest): Promise<httpResponse>{

        if((httpRequest.body as {id_employee: string}).id_employee === undefined){
            return badRequest("Error, id employee is required")
        }

        try {

            const findEmployee = await new findEmployeeUseCase(this.employeeRepo).find((httpRequest.body as {id_employee: string}).id_employee)
        
            return findEmployee instanceof NotFoundError? NotFound(findEmployee.message) : ok(findEmployee)

        } catch (error) {
            return ServerError(error.message)
        }
    }
}