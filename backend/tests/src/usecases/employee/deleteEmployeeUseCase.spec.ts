import { deleteEmployeeUseCase } from "../../../../src/application/usecases/employee/deleteEmployeeUseCase"
import { Company } from "../../../../src/domain/entities/company/company"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { EmployeeRepo } from "../../../../src/domain/usecases/employeeRepo"
import { createID } from "../../../createTestID"

const employeeRepoMock: jest.Mocked<EmployeeRepo> = {
    createEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
    findEmployee: jest.fn(),
}

const company = new Company("empresa.LTDA", "12345678912345")
const employeeInfo = new EmployeeDTO({id: createID(), name: "Ryan", position: "manager", companyCNPJ: BigInt(company.CNPJ)})

describe("delete employee use case", () => {
    it("should be employee deleted successfully", async() => {

        employeeRepoMock.deleteEmployee.mockResolvedValueOnce(true)

        const sut = await new deleteEmployeeUseCase(employeeRepoMock).delete(employeeInfo.employee.id)

        expect(sut).toBeTruthy()

    })

    it("should be error deleting employee", async() => {

        employeeRepoMock.deleteEmployee.mockResolvedValueOnce(new BadRequestError("Error deleting employee"))

        const sut = await new deleteEmployeeUseCase(employeeRepoMock).delete(employeeInfo.employee.id)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })
})
