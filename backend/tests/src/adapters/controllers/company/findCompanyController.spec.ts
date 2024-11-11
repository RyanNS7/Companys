import { findCompanyController } from "../../../../../src/adapters/controllers/company/findCompanyController"
import { CompanyRepo } from "../../../../../src/domain/usecases/companyRepo"

const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

describe("find company controller", () => {
    it("should be return a 400 error because the company's CNPJ is undefined", async () => {

        const request = {
            body: {}
        }

        const sut = await new findCompanyController(companyRepoMock).find(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, company CNPJ is required"}})

    })
})