import { changeTaskCompletedStatusUseCase } from "../../../application/usecases/tasks/changeTaskCompletedStatusUseCase"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, ok } from "../../../http/statusCode"

export class changeTaskCompletedStatusController{
    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async changeStatus(httpRequest: httpRequest): Promise<httpResponse>{

        if((httpRequest.body as {id_task: string}).id_task === undefined){
            return badRequest("Error, id task is required")
        }

        try {

            const changeStatus = await new changeTaskCompletedStatusUseCase(this.taskRepo).changeStatus((httpRequest.body as {id_task: string}).id_task)

            return changeStatus instanceof NotFoundError? NotFound(changeStatus.message): ok(changeStatus)
            
        } catch (error) {
            return ServerError(error.message)
        }

    }
}