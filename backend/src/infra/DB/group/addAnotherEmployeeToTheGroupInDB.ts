import { EmployeeGroup } from "../../../application/usecases/group/addAnotherEmployeeToTheGroupUseCase";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";

export async function addAnotherEmployeeToTheGroup(id_group: string, id_employee: string): Promise<EmployeeGroup | BadRequestError>{

    try {
        
        const addEmployee = await prisma.employeeGroup.create({data: {employee: id_employee, group: id_group}})

        return addEmployee

    } catch (error) {
        return new BadRequestError(error.name)
    }

}