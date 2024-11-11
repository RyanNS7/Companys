import { findCompanyUseCase } from "../../../application/usecases/company/findCompanyUseCase";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { CompanyRepo } from "../../../domain/usecases/companyRepo";
import { httpRequest } from "../../../http/http";
import { NotFound, ServerError, badRequest, ok } from "../../../http/statusCode";

interface CNPJCompanyRequest{
    company_cnpj: string
}

export class findCompanyController{

    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async find(httpRequest: httpRequest){

        if((httpRequest.body as CNPJCompanyRequest).company_cnpj === undefined){
            return badRequest("Error, company CNPJ is required")
        }

        try {

            const company = await new findCompanyUseCase(this.companyRepo).find((httpRequest.body as CNPJCompanyRequest).company_cnpj)
            
            return company instanceof NotFoundError? NotFound(company.message) : ok(company)
        } catch (error) {
            return ServerError(error.message)
        }

    }
}