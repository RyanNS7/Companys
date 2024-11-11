import { IEmployee } from "../entities/employee/employee"

export interface EmployeeRepo {

    createEmployee<T>(employee: IEmployee): Promise<T>
    deleteEmployee<T>(id_employee: string): Promise<T>
    findEmployee<T>(id_employee: string): Promise<T>

}