import { EmployeeDTO } from "../../../domain/entities/employee/employeDTO";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function findEmployee(employee_id: string) {
    
    try {

        const employee = await prisma.employee.findUniqueOrThrow({where: {id: employee_id}})
        
        return new EmployeeDTO(employee)
    } catch (error) {
        return new NotFoundError(error.name)
    }

}