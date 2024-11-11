import { findEmployeeController } from "../../../../../src/adapters/controllers/employee/findEmployeeController"
import { EmployeeRepo } from "../../../../../src/domain/usecases/employeeRepo"

const employeeRepoMock: jest.Mocked<EmployeeRepo> = {
    createEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
    findEmployee: jest.fn(),
}

describe("", () => {
    it("should be return a 400 error because the id employee was undefined", async () => {

        const request = {
            body: {}
        }

        const sut = await new findEmployeeController(employeeRepoMock).find(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id employee is required"}})

    })
})