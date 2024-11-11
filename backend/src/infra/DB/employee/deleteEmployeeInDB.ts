import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { prisma } from "../prisma"


export async function deleteEmployee(employee_id: string) {

    try {

        const employe = await prisma.employee.delete({where: {id: employee_id}})
        
        return true
    } catch (error) {
        return new BadRequestError(error.name)

    }
}