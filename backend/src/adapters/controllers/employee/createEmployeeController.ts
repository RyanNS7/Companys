import { createEmployeeUseCase } from "../../../application/usecases/employee/createEmployeeUseCase"
import { IEmployee } from "../../../domain/entities/employee/employee"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, created } from "../../../http/statusCode"

export class createEmployeeController{
    employeeRepo: EmployeeRepo
    companyRepo: CompanyRepo

    constructor(employeeRepo: EmployeeRepo, companyRepo: CompanyRepo){
        this.employeeRepo = employeeRepo
        this.companyRepo = companyRepo
    }

    async create(httpRequest: httpRequest): Promise<httpResponse>{

        if((httpRequest.body as IEmployee).name === undefined){
            return badRequest("Error, name is required")
        }

        if((httpRequest.body as IEmployee).company_CNPJ === undefined){
            return badRequest("Error, company CNPJ is required")
        }

        if((httpRequest.body as IEmployee).company_position === undefined){
            return badRequest("Error, company position is required")
        }

        const employeeData: IEmployee = {
            name: (httpRequest.body as IEmployee).name,
            company_CNPJ: (httpRequest.body as IEmployee).company_CNPJ,
            company_position: (httpRequest.body as IEmployee).company_position
        }

        try {

            const employee = await new createEmployeeUseCase(this.employeeRepo, this.companyRepo).create(employeeData)

            if(employee instanceof BadRequestError){
                return badRequest(employee.message)
            }

            if(employee instanceof NotFoundError){
                return NotFound(employee.message)
            }

            return created(employee)
            
        } catch (error) {
            return ServerError(error.message)
        }
    }
    
}