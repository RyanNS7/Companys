import { Task } from "../entities/task/task"
import { TaskDTO } from "../entities/task/taskDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"

export interface TaskRepo{

    createTask(task: Task): Promise<TaskDTO | BadRequestError>
    findTask(id_task: string): Promise<TaskDTO | NotFoundError>
    changeTaskCompletedStatus(id_task: string): Promise<TaskDTO | NotFoundError>

}