import { BadRequestError } from "../../errors/BadRequestError"

export interface ITask{
    title: string,
    description?: string,
    priority: boolean,
    completed: boolean
}

export class Task{

    readonly task: ITask

    constructor(task: ITask){
        this.task = task
    }

    create(): Task | BadRequestError{

        if(this.task.title.length <= 8){
            return new BadRequestError("the title has few characters, describe more")
        }

        if(this.task.description !== undefined){
            if(this.task.description.length < 10){
                return new BadRequestError("the description must contain the details of the task, too few characters are not allowed")
            }
        }

        return new Task(this.task)

    }

}