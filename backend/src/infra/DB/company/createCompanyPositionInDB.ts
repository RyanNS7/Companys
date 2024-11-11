import { newServicePosition } from "../../../application/usecases/company/createCompanyPositionUseCase";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";

export async function createCompanyPosition(company_cnpj: string, service_position: string): Promise<newServicePosition | BadRequestError>{

    try {
        
        const company_position = await prisma.companyPosition.create({data: {servicePosition: service_position, companyCNPJ: parseInt(company_cnpj)}})

        return {company_cnpj: company_position.companyCNPJ, new_service_position: company_position.servicePosition}

    } catch (error) {
        return new BadRequestError("Error adding new service position to database")
    }


}