import { EmployeeDTO } from "../../../domain/entities/employee/employeDTO"
import { TaskDTO } from "../../../domain/entities/task/taskDTO"
import { BadRequestError } from "../../../domain/errors/BadRequestError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { TaskRepo } from "../../../domain/usecases/taskRepo"

interface TaskForEmployee{
    taskThatEmployeeWillDo: TaskDTO
    employeeThoWillDo: EmployeeDTO
}

export class setTaskForEmployeeUseCase{

    taskRepo: TaskRepo

    constructor(taskRepo: TaskRepo){
        this.taskRepo = taskRepo
    }

    async setTask(id_employee: string, id_task: string){

        const setTask = await this.taskRepo.setTaskForEmployee<TaskForEmployee | BadRequestError | NotFoundError>(id_employee, id_task)

        if(setTask instanceof BadRequestError){
            return new BadRequestError(setTask.message)
        }
    
        if(setTask instanceof NotFoundError){
            return new NotFoundError(setTask.message)
        }
    
        return setTask

    }

}