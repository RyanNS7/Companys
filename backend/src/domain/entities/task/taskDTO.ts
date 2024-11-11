
export interface ITaskDTO{
    id: string,
    title: string,
    description?: string,
    priority: boolean,
    completed: boolean
}

export class TaskDTO{

    readonly task: ITaskDTO

    constructor(task: ITaskDTO){
        this.task = task
    }

}