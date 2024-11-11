import { Task } from "@prisma/client";
import { BadRequestError } from "../../../domain/errors/BadRequestError";
import { prisma } from "../prisma";
import { TaskDTO } from "../../../domain/entities/task/taskDTO";

export async function createTask(task: Task): Promise<TaskDTO | BadRequestError>{

    try {

        const taskDB = await prisma.task.create({data: {title: task.title, completed: false, priority: task.priority, description: task.description}})
        
        return new TaskDTO(taskDB)

    } catch (error) {
        return new BadRequestError(error.name)
    }

}