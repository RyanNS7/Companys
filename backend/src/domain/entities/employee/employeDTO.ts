
export interface IEmployeeDTO{
    id: string
    name: string
    position: string
    companyCNPJ: number
}

export class EmployeeDTO{

    readonly employee: IEmployeeDTO
    
    constructor(employee: IEmployeeDTO){
        this.employee = employee
    }

}