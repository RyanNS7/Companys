import { addAnotherEmployeeToTheGroupController } from "../../../../../src/adapters/controllers/group/addAnotherEmployeeToTheGroupController"
import { EmployeeRepo } from "../../../../../src/domain/usecases/employeeRepo"
import { GroupRepo } from "../../../../../src/domain/usecases/groupRepo"
import { createID } from "../../../../createTestID"

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

describe("add another employee to the group controller", () => {
    it("should be return a 400 error because the group id is undefined", async() => {

        const request = {
            body: {
                id_employee: createID()
            }
        }

        const sut = await new addAnotherEmployeeToTheGroupController(employeeRepoMock, groupRepoMock).addEmployee(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id group is required"}})

    })

    it("should return a 400 error because the employee id is undefined", async() => {

        const request = {
            body: {
                id_group: createID()
            }
        }

        const sut = await new addAnotherEmployeeToTheGroupController(employeeRepoMock, groupRepoMock).addEmployee(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id employee is required"}})

    })
})