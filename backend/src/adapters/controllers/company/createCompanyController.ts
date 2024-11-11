import { CreateCompanyUseCase } from "../../../application/usecases/company/createCompanyUseCase";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { CompanyRepo } from "../../../domain/usecases/companyRepo";
import { httpRequest, httpResponse } from "../../../http/http";
import { ServerError, badRequest, created } from "../../../http/statusCode";

interface companyRequest{
    name_company: string
    cnpj: string        
}

export class createCompanyController{

    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async create(httpRequest: httpRequest): Promise<httpResponse>{

        const request: companyRequest = {
            name_company: (httpRequest.body as companyRequest).name_company,
            cnpj: (httpRequest.body as companyRequest).cnpj
        }

        if(request.name_company === undefined){
            return badRequest("Error, company name is required")
        }

        if(request.cnpj === undefined){
            return badRequest("Error, company cnpj is required")
        }

        try {

            const company = await new CreateCompanyUseCase(this.companyRepo).create(request.name_company, request.cnpj)

            return company instanceof BadRequestError? badRequest(company.message) : created(company)

        } catch (error) {

            return ServerError(error.message)
        }
    }
}