import { Company } from "../../../domain/entities/company/company";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { CompanyRepo } from "../../../domain/usecases/companyRepo";

export class CreateCompanyUseCase{

    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async create(name_company: string, CNPJ: string){

        const company = new Company(name_company, CNPJ).create()

        if(company instanceof BadRequestError){
            return new BadRequestError(company.message)
        }

        return this.companyRepo.createCompany<Company>(company)
        
    }

}