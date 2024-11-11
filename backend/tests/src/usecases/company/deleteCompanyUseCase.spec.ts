import { deleteCompanyUseCase } from "../../../../src/application/usecases/company/deleteCompanyUseCase"
import { Company } from "../../../../src/domain/entities/company/company"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { CompanyRepo } from "../../../../src/domain/usecases/companyRepo"

const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

describe("delete enterprise use case", () => {
    it("should be error when trying to delete the company", async() => {

        const company = new Company("empresa.ltda", "1234512345123423")

        companyRepoMock.deleteCompany.mockResolvedValue(new BadRequestError("Error deleting company"))

        const sut = await new deleteCompanyUseCase(companyRepoMock).delete(company.CNPJ)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })

    it("should be company successfully deleted", async() => {
        const company = new Company("empresa.ltda", "1234512345123423")

        companyRepoMock.deleteCompany.mockResolvedValue(true)

        const sut = await new deleteCompanyUseCase(companyRepoMock).delete(company.CNPJ)

        expect(sut).toBeTruthy()

    })
})