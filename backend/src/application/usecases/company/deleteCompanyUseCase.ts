import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"


export class deleteCompanyUseCase{

    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async delete(company_CNPJ: string){

        const deleteCompany = await this.companyRepo.deleteCompany<Boolean | BadRequestError >(company_CNPJ)

        return deleteCompany instanceof BadRequestError? new BadRequestError(deleteCompany.message) : deleteCompany
    }
}