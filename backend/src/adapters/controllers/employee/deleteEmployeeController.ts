import { deleteEmployeeUseCase } from "../../../application/usecases/employee/deleteEmployeeUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { ServerError, badRequest, ok } from "../../../http/statusCode"

export class deleteEmployeeController{
    employeeRepo: EmployeeRepo

    constructor(employeeRepo: EmployeeRepo){
        this.employeeRepo = employeeRepo
    }

    async delete(httpRequest: httpRequest): Promise<httpResponse>{

        if((httpRequest.body as {id_employee: string}).id_employee === undefined){
            return badRequest("Error, id employee is required")
        }

        try {

            const deleteEmployee = await new deleteEmployeeUseCase(this.employeeRepo).delete((httpRequest.body as {id_employee: string}).id_employee)
            
            return deleteEmployee instanceof BadRequestError? badRequest(deleteEmployee.message) : ok(deleteEmployee)

        } catch (error) {
            return ServerError(error.message)
        }

    }
}