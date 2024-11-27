import { newServicePosition } from "../../application/usecases/company/createCompanyPositionUseCase"
import { Company } from "../entities/company/company"
import { CompanyDTO } from "../entities/company/companyDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"

export interface CompanyRepo {
 
    createCompany(company: Company): Promise<CompanyDTO | BadRequestError>
    deleteCompany(company_CNPJ: string): Promise<Boolean | BadRequestError>
    findCompany(company_CNPJ: string): Promise<CompanyDTO | NotFoundError>
    createCompanyPosition(company_CNPJ: number, service_position: string): Promise<newServicePosition | BadRequestError>
    checkCompanyPosition(company_CNPJ: string, service_position: string): Promise<Boolean>
    
}