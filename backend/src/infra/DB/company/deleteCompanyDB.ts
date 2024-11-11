import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";


export async function deleteCompany(company_cnpj: string): Promise<Boolean | BadRequestError>{

    try {

        const company = await prisma.company.delete({where: {cnpj: parseInt(company_cnpj)}})

        return true
        
    } catch (error) {
        return new BadRequestError(error.meta.cause)
    }

}