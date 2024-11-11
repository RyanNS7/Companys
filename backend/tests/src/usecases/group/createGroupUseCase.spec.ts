import { createGroupUseCase } from "../../../../src/application/usecases/group/createGroupUseCase"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../../src/domain/usecases/employeeRepo"
import { GroupRepo } from "../../../../src/domain/usecases/groupRepo"
import { createID } from "../../../createTestID"

const employeeRepoMock: jest.Mocked<EmployeeRepo> = {
    createEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
    findEmployee: jest.fn(),
}

const groupRepoMock:jest.Mocked<GroupRepo> = {
    createGroup: jest.fn(),
    addAnotherEmployeeToTheGroup: jest.fn(),
    findGroup: jest.fn(),
}

const manager = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: 17122001170202, position: "manager"})

describe("create group use case", () => {
    it("should be create the employee group successfully", async() => {

        employeeRepoMock.findEmployee.mockResolvedValueOnce(manager)
        groupRepoMock.createGroup.mockResolvedValue({id_group: createID(), id_employees: [manager.employee.id, manager.employee.id]})

        const sut = await new createGroupUseCase(employeeRepoMock, groupRepoMock).create(manager.employee.id, [manager.employee.id, manager.employee.id])

        expect(sut).toBeInstanceOf(Object)
    })

    it("should be error, employee who will create the group was not found", async() => {

        employeeRepoMock.findEmployee.mockResolvedValueOnce(new NotFoundError("Manager not found"))
        groupRepoMock.createGroup.mockResolvedValue({id_group: createID(), id_employees: [manager.employee.id, manager.employee.id]})

        const sut = await new createGroupUseCase(employeeRepoMock, groupRepoMock).create(manager.employee.id, [manager.employee.id, manager.employee.id])

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })

    it("should be error creating group", async() => {

        employeeRepoMock.findEmployee.mockResolvedValueOnce(manager)
        groupRepoMock.createGroup.mockResolvedValue(new BadRequestError("Error creating group"))

        const sut = await new createGroupUseCase(employeeRepoMock, groupRepoMock).create(manager.employee.id, [manager.employee.id, manager.employee.id])

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })
})
