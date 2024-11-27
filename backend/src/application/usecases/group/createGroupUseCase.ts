import { TaskDTO } from "../../../domain/entities/task/taskDTO"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { GroupRepo } from "../../../domain/usecases/groupRepo"
import { TaskRepo } from "../../../domain/usecases/taskRepo"

export interface ServiceGroup{
    id: string
    task: string
}

export class createGroupUseCase{

    taskRepo: TaskRepo
    groupRepo: GroupRepo

    constructor(taskRepo: TaskRepo, groupRepo: GroupRepo){
        this.taskRepo = taskRepo
        this.groupRepo = groupRepo
    }

    async create(id_task: string){

        const task = await this.taskRepo.findTask(id_task)

        if(task instanceof NotFoundError){
            return new NotFoundError(task.message)
        }

        const createGroup = await this.groupRepo.createGroup(task.task.id)

        return createGroup instanceof BadRequestError? new BadRequestError(createGroup.message) : createGroup

    }

}