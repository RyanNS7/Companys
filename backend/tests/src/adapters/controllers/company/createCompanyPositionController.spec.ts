import { createCompanyPositionController } from "../../../../../src/adapters/controllers/company/createCompanyPositionController"
import { CompanyRepo } from "../../../../../src/domain/usecases/companyRepo"

const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

describe("create company position controller", () => {
    it("should be return a 400 error because the company's CNPJ is undefined", async () => {

        const request = {
            body: {
                new_service_position: "manager"
            }
        }

        const sut = await new createCompanyPositionController(companyRepoMock).createServicePosition(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, company cnpj is required"}})

    })

    it("should return a 400 error because the company's new service position is undefined", async () => {

        const request = {
            body: {
                company_cnpj: 12345678909876
            }
        }

        const sut = await new createCompanyPositionController(companyRepoMock).createServicePosition(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, new service position is required"}})

    })
})