import { TaskDTO } from "../../../domain/entities/task/taskDTO"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"


interface TaskForGroup{
    taskThatGroupWillDo: TaskDTO
    groupThatWillDo: string
}

export class setTaskForEmployeeGroupUseCase{

    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async setTask(id_employeesGroup: string, id_task: string){

        const setTaskInGroup = await this.taskRepo.setTaskForEmployeeGroup<TaskForGroup | BadRequestError | NotFoundError>(id_employeesGroup, id_task)

        if(setTaskInGroup instanceof BadRequestError){
            return new BadRequestError(setTaskInGroup.message)
        }
    
        if(setTaskInGroup instanceof NotFoundError){
            return new NotFoundError(setTaskInGroup.message)
        }
    
        return setTaskInGroup

    }

}