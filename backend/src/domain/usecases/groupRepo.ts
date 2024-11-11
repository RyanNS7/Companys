
export interface GroupRepo {

    createGroup<T>(id_manager: string, id_employees: string[]): Promise<T>
    addAnotherEmployeeToTheGroup<T>(id_employees: string, id_group: string): Promise<T>
    findGroup<T>(id_group: string): Promise<T>

}