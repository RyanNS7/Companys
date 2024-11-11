import { setTaskForEmployeeGroupUseCase } from "../../../application/usecases/tasks/setTaskForEmployeeGroupUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, ok } from "../../../http/statusCode"

export class setTaskForEmployeeGroupController{
    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async setTask(httpRequest: httpRequest): Promise<httpResponse>{

        const request = {
            id_task: (httpRequest.body as {id_task: string}).id_task,
            id_group: (httpRequest.body as {id_group: string}).id_group
        }

        if(request.id_task === undefined){
            return badRequest("Error, id task is required")
        }

        if(request.id_group === undefined){
            return badRequest("Error, id group is required")
        }

        try {

            const setTask = await new setTaskForEmployeeGroupUseCase(this.taskRepo).setTask(request.id_group, request.id_task)
            
            if(setTask instanceof BadRequestError){
                return badRequest(setTask.message)
            }
        
            if(setTask instanceof NotFoundError){
                return NotFound(setTask.message)
            }
        
            return ok(setTask)

        } catch (error) {
            return ServerError(error.message)
        }
        
    }
}