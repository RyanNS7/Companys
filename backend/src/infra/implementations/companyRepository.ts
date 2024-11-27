import { newServicePosition } from "../../application/usecases/company/createCompanyPositionUseCase";
import { Company } from "../../domain/entities/company/company";
import { CompanyDTO } from "../../domain/entities/company/companyDTO";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { CompanyRepo } from "../../domain/usecases/companyRepo";
import { checkCompanyPosition } from "../DB/company/checkCompanyPositionInDB";
import { createCompany } from "../DB/company/createCompanyInDB";
import { createCompanyPosition } from "../DB/company/createCompanyPositionInDB";
import { deleteCompany } from "../DB/company/deleteCompanyDB";
import { findCompany } from "../DB/company/findCompanyInDB";

export class CompanyRepository implements CompanyRepo{

    async createCompany(company: Company): Promise<CompanyDTO | BadRequestError> {
        return await createCompany(company)
    }

    async checkCompanyPosition(company_CNPJ: string, service_position: string): Promise<Boolean> {
        return await checkCompanyPosition(company_CNPJ, service_position)
    }

    async createCompanyPosition(company_CNPJ: number, service_position: string): Promise<newServicePosition | BadRequestError> {
        return await createCompanyPosition(String(company_CNPJ), service_position)
    }

    async deleteCompany(company_CNPJ: string): Promise<Boolean | BadRequestError> {
        return await deleteCompany(company_CNPJ)
    }

    async findCompany(company_CNPJ: string): Promise<CompanyDTO | NotFoundError> {
        return await findCompany(company_CNPJ)
    }

}