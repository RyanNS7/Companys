import { addAnotherEmployeeToTheGroupUseCase } from "../../../../src/application/usecases/group/addAnotherEmployeeToTheGroupUseCase"
import { ServiceGroup } from "../../../../src/application/usecases/group/createGroupUseCase"
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

let serviceGroup: ServiceGroup = {id_group: createID(), id_employees: [createID(), createID()]}

describe("add another employee to the group use case", () => {
    it("should be successfully added a new employee", async() => {

        const new_employee = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: 17122001170202, position: "employee"})

        groupRepoMock.findGroup.mockResolvedValueOnce(serviceGroup)
        serviceGroup.id_employees.push(new_employee.employee.id)
        groupRepoMock.addAnotherEmployeeToTheGroup.mockResolvedValueOnce(serviceGroup)

        const sut = await new addAnotherEmployeeToTheGroupUseCase(employeeRepoMock, groupRepoMock).addEmployee(new_employee.employee.id, serviceGroup.id_group)
    
    })

    it("should be error, group not found", async() => {

        const new_employee = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: 17122001170202, position: "employee"})

        groupRepoMock.findGroup.mockResolvedValueOnce(new NotFoundError("Group not found"))

        const sut = await new addAnotherEmployeeToTheGroupUseCase(employeeRepoMock, groupRepoMock).addEmployee(new_employee.employee.id, serviceGroup.id_group)
    
        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })

    it("should be error when trying to add employee to group", async() => {

        const new_employee = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: 17122001170202, position: "employee"})

        groupRepoMock.findGroup.mockResolvedValueOnce(serviceGroup)
        groupRepoMock.addAnotherEmployeeToTheGroup.mockResolvedValueOnce(new BadRequestError("error when trying to add employee to group"))

        const sut = await new addAnotherEmployeeToTheGroupUseCase(employeeRepoMock, groupRepoMock).addEmployee(new_employee.employee.id, serviceGroup.id_group)
    
        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })

})

