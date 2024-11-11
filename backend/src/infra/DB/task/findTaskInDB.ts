import { TaskDTO } from "../../../domain/entities/task/taskDTO";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function findTask(id_task: string) {
    
    try {

        const task = await prisma.task.findUniqueOrThrow({where: {id: id_task}})

        return new TaskDTO(task)
        
    } catch (error) {
        return new NotFoundError(error.name)
    }

}