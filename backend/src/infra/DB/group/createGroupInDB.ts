import { ServiceGroup } from "../../../application/usecases/group/createGroupUseCase";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";

export async function createGroup(id_task: string): Promise<ServiceGroup | BadRequestError>{

    try {

        const group = await prisma.group.create({data: {task: id_task}})

        return group
        
    } catch (error) {
        return new BadRequestError(error.name)
    }

}