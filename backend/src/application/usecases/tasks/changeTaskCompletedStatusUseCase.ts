import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"


export class changeTaskCompletedStatusUseCase{
    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async changeStatus(id_task: string){

        const changeStatusTask = await this.taskRepo.changeTaskCompletedStatus(id_task)

        return changeStatusTask instanceof NotFoundError? new NotFoundError(changeStatusTask.message) : changeStatusTask

    }
}