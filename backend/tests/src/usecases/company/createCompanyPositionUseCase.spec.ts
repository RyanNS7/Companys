import { createCompanyPositionUseCase } from "../../../../src/application/usecases/company/createCompanyPositionUseCase"
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

describe("create company position use case", () => {
    it("should be error creating new service position", async() => {

        const company = new Company("empresa.ltda", "1234512345123423")

        companyRepoMock.createCompanyPosition.mockResolvedValue(new BadRequestError("error creating new service position"))

        const sut = await new createCompanyPositionUseCase(companyRepoMock).createServicePosition(BigInt(company.CNPJ), "manager")

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })

    it("should be new service position created successfully", async() => {

        const company = new Company("empresa.ltda", "1234512345123423")
        const new_service_position = "manager"

        companyRepoMock.createCompanyPosition.mockResolvedValue({new_service_position, company_cnpj: BigInt(company.CNPJ)})

        const sut = await new createCompanyPositionUseCase(companyRepoMock).createServicePosition(BigInt(company.CNPJ), "manager")

        expect(sut).toMatchObject({new_service_position, company_cnpj: BigInt(company.CNPJ)})
    })
})