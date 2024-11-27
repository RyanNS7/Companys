import { CompanyDTO } from "../../../domain/entities/company/companyDTO";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function findCompany(company_cnpj: string): Promise<CompanyDTO | NotFoundError>{

    try {
        const company = await prisma.company.findUniqueOrThrow({where: {cnpj: parseInt(company_cnpj)}})

        return new CompanyDTO(company.name, company.cnpj)
    } catch (error) {
        return new NotFoundError(error)
    }

}