import { BadRequestError } from "../../errors/BadRequestError"

export class Company {

    readonly nameCompany: string
    readonly CNPJ: string

    constructor(nameCompany: string, CNPJ: string){
        this.nameCompany = nameCompany
        this.CNPJ = CNPJ
    }

    create(): Company | BadRequestError {

        if( this.nameCompany.length <= 6){
            return new BadRequestError("Company name should not be too few characters long")
        }

        if(Number.isNaN(Number(this.CNPJ))){
            return new BadRequestError("CNPJ can only have numbers")
        }

        if( this.CNPJ.length !== 14){
            return new BadRequestError("Invalid CNPJ")
        }

        return new Company(this.nameCompany, this.CNPJ)

    }

}