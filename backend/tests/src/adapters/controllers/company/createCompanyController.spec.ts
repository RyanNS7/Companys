import { createCompanyController } from "../../../../../src/adapters/controllers/company/createCompanyController"
import { CompanyRepo } from "../../../../../src/domain/usecases/companyRepo"

const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

describe("create company controller", () => {
    it("should be expected error 400 due to company name being undefined", async() => {

        const request = {
            body: {
                cnpj: "12345678910127"
            }
        }

        const sut = await new createCompanyController(companyRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, company name is required"}})

    })

    it("should be expected error 400 due to company cnpj being undefined", async() => {

        const request = {
            body: {
                name_company: "Empresa.LTDA",
            }
        }

        const sut = await new createCompanyController(companyRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, company cnpj is required"}})

    })
})