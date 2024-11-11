import { EmployeeDTO} from "../../../domain/entities/employee/employeDTO";
import { IEmployee } from "../../../domain/entities/employee/employee";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";

export async function createEmployee(employee: IEmployee): Promise<EmployeeDTO | BadRequestError> {
    
    try {

        const id_servicePosition = await prisma.companyPosition.findFirst({where: {companyCNPJ: parseInt(employee.company_CNPJ), servicePosition: employee.company_position}})
        
        const employeeDB = await prisma.employee.create({data: {name: employee.name, position: id_servicePosition.id, companyCNPJ: parseInt(employee.company_CNPJ)}})

        return new EmployeeDTO({...employeeDB, position: employee.company_position})
    } catch (error) {
        return new BadRequestError(error.name)
    }

}