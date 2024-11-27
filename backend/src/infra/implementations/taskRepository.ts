import { Task } from "../../domain/entities/task/task";
import { TaskDTO } from "../../domain/entities/task/taskDTO";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { TaskRepo } from "../../domain/usecases/taskRepo";
import { changeTaskCompletedStatus } from "../DB/task/changeTaskCompletedStatusInDB";
import { createTask } from "../DB/task/createTaskInDB";
import { findTask } from "../DB/task/findTaskInDB";

export class taskRepository implements TaskRepo{
    async changeTaskCompletedStatus(id_task: string): Promise<TaskDTO | NotFoundError> {
        return await changeTaskCompletedStatus(id_task)
    }

    async createTask(task: Task): Promise<TaskDTO | BadRequestError> {
        return await createTask(task)
    }

    async findTask(id_task: string): Promise<TaskDTO | NotFoundError> {
        return await findTask(id_task)
    }
}