import { deleteCompanyUseCase } from "../../../application/usecases/company/deleteCompanyUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, ok } from "../../../http/statusCode"

interface CNPJCompanyRequest{
    company_cnpj: string
}

export class deleteCompanyController{
    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async delete(httpRequest: httpRequest): Promise<httpResponse>{

        if((httpRequest.body as CNPJCompanyRequest).company_cnpj === undefined){
            return badRequest("Error, company CNPJ is required")
        }

        try {

            const deleteCompany = await new deleteCompanyUseCase(this.companyRepo).delete((httpRequest.body as CNPJCompanyRequest).company_cnpj)
            
            return deleteCompany instanceof BadRequestError? badRequest(deleteCompany.message) : ok(deleteCompany)

        } catch (error) {
            return ServerError(error.message)
        }

    }
}