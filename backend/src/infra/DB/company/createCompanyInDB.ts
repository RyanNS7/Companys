import { Company } from "../../../domain/entities/company/company";
import { CompanyDTO } from "../../../domain/entities/company/companyDTO";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";

export async function createCompany(company: Company): Promise<CompanyDTO | BadRequestError>{

    try {

        const companyDB = await prisma.company.create({data: {name: company.nameCompany, cnpj: parseInt(company.CNPJ)}})

        return new CompanyDTO(companyDB.name, companyDB.cnpj)
        
    } catch (error) {
        return new BadRequestError(error)
    }

}