import { EmployeeDTO } from "../../../domain/entities/employee/employeeDTO";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function findEmployee(employee_id: string) {
    
    try {

        const employee = await prisma.employee.findUniqueOrThrow({where: {id: employee_id}})
        
        return new EmployeeDTO({...employee, companyCNPJ: employee.companyCNPJ.toString()})
    } catch (error) {
        return new NotFoundError(error.name)
    }

}