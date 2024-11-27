import { EmployeeGroup } from "../../application/usecases/group/addAnotherEmployeeToTheGroupUseCase";
import { ServiceGroup } from "../../application/usecases/group/createGroupUseCase";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { GroupRepo } from "../../domain/usecases/groupRepo";
import { addAnotherEmployeeToTheGroup } from "../DB/group/addAnotherEmployeeToTheGroupInDB";
import { createGroup } from "../DB/group/createGroupInDB";
import { findGroup } from "../DB/group/findGroupInDB";

export class GroupRepository implements GroupRepo{
    async addAnotherEmployeeToTheGroup(id_employees: string, id_group: string): Promise<EmployeeGroup | BadRequestError> {
        return await addAnotherEmployeeToTheGroup(id_employees, id_group)
    }

    async createGroup(id_task: string): Promise<ServiceGroup | BadRequestError> {
        return await createGroup(id_task)
    }

    async findGroup(id_group: string): Promise<{
        id: string;
        task: string;
    } | NotFoundError> {
        return await findGroup(id_group)
    }
}