import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"

export class findCompanyUseCase{

    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async find(company_CNPJ: string){

        const findCompany = await this.companyRepo.findCompany(company_CNPJ)

        return findCompany instanceof NotFoundError ? new NotFoundError(findCompany.message, {cause: findCompany}) : findCompany
    }
}