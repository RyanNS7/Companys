import { TaskDTO } from "../../../domain/entities/task/taskDTO";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { prisma } from "../prisma";

export async function changeTaskCompletedStatus(id_task: string) {
    
    try {

        const task = await prisma.task.update({where: {id: id_task}, data: {completed: true}})

        return new TaskDTO(task)
        
    } catch (error) {
        return new NotFoundError(error.name)
    }

}