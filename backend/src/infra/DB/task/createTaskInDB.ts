import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";
import { TaskDTO } from "../../../domain/entities/task/taskDTO";
import { Task } from "../../../domain/entities/task/task";

export async function createTask(task: Task): Promise<TaskDTO | BadRequestError>{

    try {

        const taskDB = await prisma.task.create({data: {title: task.task.title, completed: false, priority: task.task.priority, description: task.task.description}})
        
        return new TaskDTO(taskDB)

    } catch (error) {
        return new BadRequestError(error.name)
    }

}