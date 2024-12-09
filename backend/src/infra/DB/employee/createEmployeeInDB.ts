import { EmployeeDTO} from "../../../domain/entities/employee/employeeDTO";
import { IEmployee } from "../../../domain/entities/employee/employee";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function createEmployee(employee: IEmployee): Promise<EmployeeDTO | BadRequestError | NotFoundError> {
    
    try {

        try {

            const id_servicePosition = await prisma.companyPosition.findFirstOrThrow({where: {companyCNPJ: BigInt(employee.company_CNPJ), servicePosition: employee.company_position}})
            
            const employeeDB = await prisma.employee.create({data: {name: employee.name, position: id_servicePosition.id, companyCNPJ: BigInt(employee.company_CNPJ)}})

            return new EmployeeDTO({...employeeDB,companyCNPJ: employeeDB.companyCNPJ.toString(), position: employee.company_position})
        } catch (error) {
            return new NotFoundError("Service Position Not Found")
        }

    } catch (error) {
        return new BadRequestError(error.name)
    }

}