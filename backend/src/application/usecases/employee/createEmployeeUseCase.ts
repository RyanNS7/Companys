import { IEmployee } from "../../../domain/entities/employee/employee"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"
import { EmployeeRepo } from "../../../domain/usecases/employeeRepo"

export class createEmployeeUseCase{

    employeeRepo: EmployeeRepo
    companyRepo: CompanyRepo

    constructor(employeeRepo: EmployeeRepo, companyRepo: CompanyRepo){
        this.employeeRepo = employeeRepo
        this.companyRepo = companyRepo
    }

    async create(employee: IEmployee){

        const findCompany = await this.companyRepo.findCompany(employee.company_CNPJ)

        if(findCompany instanceof NotFoundError){
            return new NotFoundError(findCompany.message)
        }
    
        const createEmployee = await this.employeeRepo.createEmployee(employee)
    
        return createEmployee instanceof BadRequestError? new BadRequestError(createEmployee.message) : createEmployee
    }


}