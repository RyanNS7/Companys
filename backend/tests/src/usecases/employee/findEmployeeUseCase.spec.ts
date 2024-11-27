import { Company } from "../../../../src/domain/entities/company/company"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeDTO"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { EmployeeRepo } from "../../../../src/domain/usecases/employeeRepo"
import { createID } from "../../../createTestID"

const employeeRepoMock: jest.Mocked<EmployeeRepo> = {
    createEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
    findEmployee: jest.fn(),
}

const company = new Company("empresa.LTDA", "12345678912345")
const employeeInfo = new EmployeeDTO({id: createID(), name: "Ryan", companyCNPJ: BigInt(company.CNPJ), position: "manager"})

describe("find employee use case", () => {
    it("should be employee found successfully", async() => {

        employeeRepoMock.findEmployee.mockResolvedValueOnce(employeeInfo)

        const sut = await employeeRepoMock.findEmployee(employeeInfo.employee.id)

        expect(sut).toBeInstanceOf(EmployeeDTO)
    })

    it("should be error because the employee was not found", async() => {

        employeeRepoMock.findEmployee.mockResolvedValueOnce(new NotFoundError("Error, employee not found"))

        const sut = await employeeRepoMock.findEmployee(employeeInfo.employee.id)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })
})
