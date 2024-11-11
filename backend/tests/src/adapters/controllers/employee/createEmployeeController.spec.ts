import { createEmployeeController } from "../../../../../src/adapters/controllers/employee/createEmployeeController"
import { CompanyRepo } from "../../../../../src/domain/usecases/companyRepo"
import { EmployeeRepo } from "../../../../../src/domain/usecases/employeeRepo"

const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

const employeeRepoMock: jest.Mocked<EmployeeRepo> = {
    createEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
    findEmployee: jest.fn(),
}

describe("create employee controller", () => {
    it("should be return a 400 error because the company employee's position is undefined", async () => {

        const request = {
            body: {
                name: "Ryan",
                company_CNPJ: "123456789098765"
            }
        }

        const sut = await new createEmployeeController(employeeRepoMock, companyRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, company position is required"}})

    })

    it("should be return a 400 error because the company's CNPJ is undefined", async () => {

        const request = {
            body: {
                name: "Marcela",
                company_position: "manager"
            }
        }

        const sut = await new createEmployeeController(employeeRepoMock, companyRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, company CNPJ is required"}})

    })

    it("should be return a 400 error because the employee name was undefined", async () => {

        const request = {
            body: {
                company_CNPJ: "12212112211221",
                company_position: "employee"
            }
        }

        const sut = await new createEmployeeController(employeeRepoMock, companyRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, name is required"}})

    })
})