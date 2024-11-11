import { createCompanyPositionUseCase, newServicePosition } from "../../../application/usecases/company/createCompanyPositionUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { ServerError, badRequest, created } from "../../../http/statusCode"

export class createCompanyPositionController{
    
    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async createServicePosition(httpRequest: httpRequest): Promise<httpResponse>{

        const request: newServicePosition = {
            company_cnpj: (httpRequest.body as newServicePosition).company_cnpj,
            new_service_position: (httpRequest.body as newServicePosition).new_service_position
        }

        if(request.company_cnpj === undefined){
            return badRequest("Error, company cnpj is required")
        }

        if(request.new_service_position === undefined){
            return badRequest("Error, new service position is required")
        }

        try {

            const createPosition = await new createCompanyPositionUseCase(this.companyRepo).createServicePosition(request.company_cnpj, request.new_service_position)

            return createPosition instanceof BadRequestError? badRequest(createPosition.message) : created(createPosition)

        } catch (error) {
            return ServerError(error.message)
        }

    }
}