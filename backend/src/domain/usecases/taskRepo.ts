import { Task } from "../entities/task/task"

export interface TaskRepo{

    createTask<T>(task: Task): Promise<T>
    findTask<T>(id_task: string): Promise<T>
    changeTaskCompletedStatus<T>(id_task: string): Promise<T>
    setTaskForEmployee<T>(id_employee: string, id_task: string): Promise<T>
    setTaskForEmployeeGroup<T>(id_employeesGroup: string, id_task: string): Promise<T>

}