import { addAnotherEmployeeToTheGroupUseCase } from "../../../../src/application/usecases/group/addAnotherEmployeeToTheGroupUseCase"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeeDTO"
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

describe("add another employee to the group use case", () => {

    it("should be error adding employee to group", async() => {

        const new_employee = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: String(17122001170202), position: "employee"})

        groupRepoMock.findGroup.mockResolvedValueOnce({id: createID(), task: createID()})
        groupRepoMock.addAnotherEmployeeToTheGroup.mockResolvedValueOnce({id: createID(), group: createID(), employee: new_employee.employee.id})

        const sut = await new addAnotherEmployeeToTheGroupUseCase(employeeRepoMock, groupRepoMock).addEmployee(new_employee.employee.id, createID())
    
        expect(sut).toBeInstanceOf(Object)
    })

    it("should be error, group not found", async() => {

        const new_employee = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: String(17122001170202), position: "employee"})

        groupRepoMock.findGroup.mockResolvedValueOnce(new NotFoundError("Group not found"))

        const sut = await new addAnotherEmployeeToTheGroupUseCase(employeeRepoMock, groupRepoMock).addEmployee(new_employee.employee.id, createID())
    
        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })

    it("should be error adding employee to group", async() => {

        const new_employee = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: String(17122001170202), position: "employee"})

        groupRepoMock.findGroup.mockResolvedValueOnce({id: createID(), task: createID()})
        groupRepoMock.addAnotherEmployeeToTheGroup.mockResolvedValueOnce(new BadRequestError("error adding employee to group"))

        const sut = await new addAnotherEmployeeToTheGroupUseCase(employeeRepoMock, groupRepoMock).addEmployee(new_employee.employee.id, createID())
    
        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })

})

