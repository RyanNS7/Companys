import { createGroupUseCase } from "../../../application/usecases/group/createGroupUseCase"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { GroupRepo } from "../../../domain/usecases/groupRepo"
import { TaskRepo } from "../../../domain/usecases/taskRepo"
import { httpRequest, httpResponse } from "../../../http/http"
import { NotFound, ServerError, badRequest, created } from "../../../http/statusCode"

export class createGroupController{
    taskRepo: TaskRepo
    groupRepo: GroupRepo

    constructor(taskRepo: TaskRepo, groupRepo: GroupRepo){
        this.taskRepo = taskRepo
        this.groupRepo = groupRepo
    }

    async create(httpRequest: httpRequest): Promise<httpResponse>{

        const request = {
            id_task: (httpRequest.body as {id_task: string}).id_task,
        }

        if(request.id_task === undefined){
            return badRequest("Error, id task is required")
        }

        try {

            const createGroup = await new createGroupUseCase(this.taskRepo, this.groupRepo).create(request.id_task)

            if(createGroup instanceof BadRequestError){
                return badRequest(createGroup.message)
            }

            if(createGroup instanceof NotFoundError){
                return NotFound(createGroup.message)
            }

            return created(createGroup)
            
        } catch (error) {
            return ServerError(error.message)
        }

    }
}