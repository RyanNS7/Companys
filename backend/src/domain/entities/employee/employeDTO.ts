
export interface IEmployeeDTO{
    id: string
    name: string
    position: string
    companyCNPJ: bigint
}

export class EmployeeDTO{

    readonly employee: IEmployeeDTO
    
    constructor(employee: IEmployeeDTO){
        this.employee = employee
    }

}