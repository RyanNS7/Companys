import { EmployeeGroup } from "../../application/usecases/group/addAnotherEmployeeToTheGroupUseCase"
import { ServiceGroup } from "../../application/usecases/group/createGroupUseCase"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"

export interface GroupRepo {

    createGroup(id_task: string): Promise<ServiceGroup | BadRequestError>
    addAnotherEmployeeToTheGroup(id_employees: string, id_group: string): Promise<EmployeeGroup | BadRequestError>
    findGroup(id_group: string): Promise<{
        id: string;
        task: string;
    } | NotFoundError>

}