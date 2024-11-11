import { createGroupController } from "../../../../../src/adapters/controllers/group/createGroupController"
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

describe("create group controller", () => {
    it("should be return a 400 error because the employees id is undefined", async() => {

        const request = {
            body: {
                id_manager: createID()
            }
        }

        const sut = await new createGroupController(employeeRepoMock, groupRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id employees is required"}})

    })

    it("should be return a 400 error because the manager id is undefined", async() => {

        const request = {
            body: {
                id_employes: [createID(), createID(), createID()]
            }
        }

        const sut = await new createGroupController(employeeRepoMock, groupRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id manager is required"}})

    })
})