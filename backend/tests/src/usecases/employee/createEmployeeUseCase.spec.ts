import { createEmployeeUseCase } from "../../../../src/application/usecases/employee/createEmployeeUseCase"
import { Company } from "../../../../src/domain/entities/company/company"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeDTO"
import { IEmployee } from "../../../../src/domain/entities/employee/employee"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { CompanyRepo } from "../../../../src/domain/usecases/companyRepo"
import { EmployeeRepo } from "../../../../src/domain/usecases/employeeRepo"
import { createID } from "../../../createTestID"

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

const company = new Company("empresa.LTDA", "12345678912345")

describe("create employee use case", () => {
    it("should be company not found", async () => {

        const employee: IEmployee = {
            name: 'Ryan',
            company_position: "manager",
            company_CNPJ: company.CNPJ
        }

        companyRepoMock.findCompany.mockResolvedValueOnce(new NotFoundError("Company Not Found"))

        const sut = await new createEmployeeUseCase(employeeRepoMock, companyRepoMock).create(employee)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})

    })

    it("should be error creating company employee", async () => {

        const employee: IEmployee = {
            name: 'Ryan',
            company_position: "manager",
            company_CNPJ: company.CNPJ
        }

        employeeRepoMock.createEmployee.mockResolvedValueOnce(new BadRequestError("Error creating employee"))

        const sut = await new createEmployeeUseCase(employeeRepoMock, companyRepoMock).create(employee)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})

    })

    it("should be company employee successfully created", async () => {

        const employee: IEmployee = {
            name: 'Ryan',
            company_position: "manager",
            company_CNPJ: company.CNPJ
        }

        employeeRepoMock.createEmployee.mockResolvedValueOnce(new EmployeeDTO({id: createID(), name: employee.name, companyCNPJ: parseInt(employee.company_CNPJ), position: employee.company_position}))

        const sut = await new createEmployeeUseCase(employeeRepoMock, companyRepoMock).create(employee)

        expect(sut).toBeInstanceOf(EmployeeDTO)

    })
})
