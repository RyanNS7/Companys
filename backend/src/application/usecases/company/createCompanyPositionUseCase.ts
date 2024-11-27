import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { CompanyRepo } from "../../../domain/usecases/companyRepo"

export interface newServicePosition{
    company_cnpj: bigint
    new_service_position: string
}

export class createCompanyPositionUseCase {
    
    companyRepo: CompanyRepo

    constructor(companyRepo: CompanyRepo){
        this.companyRepo = companyRepo
    }

    async createServicePosition(company_cnpj: bigint, service_position: string){

        const setNewServicePosition = await this.companyRepo.createCompanyPosition(company_cnpj, service_position)
    
        return setNewServicePosition instanceof BadRequestError? new BadRequestError(setNewServicePosition.message) : setNewServicePosition

    }

}