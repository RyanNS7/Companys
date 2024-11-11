import { prisma } from "../prisma"

export async function checkCompanyPosition(company_cnpj: string, service_position: string): Promise<Boolean> {
    
    try {
        const company_position = await prisma.companyPosition.findFirstOrThrow({where: {servicePosition: service_position, companyCNPJ: parseInt(company_cnpj)}})

        return true
    } catch (error) {
        return false
    }

}