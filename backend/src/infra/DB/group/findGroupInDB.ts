import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function findGroup(id_group: string){

    try {

        const group = await prisma.group.findUniqueOrThrow({where: {id: id_group}})
        
        return group
    } catch (error) {
        return new NotFoundError(error.name)
    }

}