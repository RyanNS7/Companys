import { ITask, Task } from "../../../domain/entities/task/task"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"


export class createTaskUseCase {

    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async create(taskInfo: ITask){

        const task = new Task(taskInfo).create()

        if(task instanceof BadRequestError){
            return new BadRequestError(task.message)
        }

        const createTask = await this.taskRepo.createTask(task)

        return createTask instanceof BadRequestError? new BadRequestError(createTask.message): createTask

    }
}