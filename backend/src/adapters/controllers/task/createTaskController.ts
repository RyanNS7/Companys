import { createTaskUseCase } from "../../../application/usecases/tasks/createTaskUseCase"
import { ITask } from "../../../domain/entities/task/task"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { ServerError, badRequest, created } from "../../../http/statusCode"

export class createTaskController{
    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async create(httpRequest: httpRequest): Promise<httpResponse>{

        if((httpRequest.body as ITask).title === undefined){
            return badRequest("Error, title is required")
        }

        const task: ITask = {
            title: (httpRequest.body as ITask).title,
            description: (httpRequest.body as ITask).description,
            completed: false,
            priority: (httpRequest.body as ITask).priority === undefined? false : (httpRequest.body as ITask).priority
        }

        try {

            const createTask = await new createTaskUseCase(this.taskRepo).create(task)

            return createTask instanceof BadRequestError? badRequest(createTask.message) : created(createTask)
            
        } catch (error) {
            return ServerError(error.message)
        }

    }
}