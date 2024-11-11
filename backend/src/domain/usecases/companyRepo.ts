import { Company } from "../entities/company/company"

export interface CompanyRepo {
 
    createCompany<T>(company: Company): Promise<T>
    deleteCompany<T>(company_CNPJ: string): Promise<T>
    findCompany<T>(company_CNPJ: string): Promise<T>
    createCompanyPosition<T>(company_CNPJ: number, service_position: string): Promise<T>
    checkCompanyPosition(company_CNPJ: string, service_position: string): Promise<Boolean>
    
}