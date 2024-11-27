import { findCompanyUseCase } from "../../../../src/application/usecases/company/findCompanyUseCase"
import { Company } from "../../../../src/domain/entities/company/company"
import { CompanyDTO } from "../../../../src/domain/entities/company/companyDTO"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { CompanyRepo } from "../../../../src/domain/usecases/companyRepo"

const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

describe("find enterprise use case", () => {
    it("should be the company was not found", async() => {

        const company = new Company("empresa.ltda", "1234512345123423")

        companyRepoMock.findCompany.mockResolvedValue(new NotFoundError("The company was not found"))

        const sut = await new findCompanyUseCase(companyRepoMock).find(company.CNPJ)

        expect(sut).toBeInstanceOf(NotFoundError)

    })

    it("should be the company was successfully found", async() => {

        const company = new CompanyDTO("empresa.ltda", BigInt(1234512345123423))

        companyRepoMock.findCompany.mockResolvedValue(company)

        const sut = await new findCompanyUseCase(companyRepoMock).find(String(company.CNPJ))

        expect(sut).toBeInstanceOf(CompanyDTO)

    })
})
