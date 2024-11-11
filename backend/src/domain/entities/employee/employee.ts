import { badRequest, created } from "../../../http/statusCode"
import { BadRequestError } from "../../errors/BadRequestError"

export interface IEmployee{
    name: string
    company_position: string
    company_CNPJ: string
}

export class Employee{

    readonly employee: IEmployee
    
    constructor(employee: IEmployee){
        this.employee = employee
    }

    create(): Employee | BadRequestError{

        if(this.employee.name.length < 3){
            return new BadRequestError("Name does not have enough characters")
        }

        return new Employee(this.employee)

    }

}