import { CreateCompanyUseCase } from "../../../../src/application/usecases/company/createCompanyUseCase"
import { Company } from "../../../../src/domain/entities/company/company"
import { CompanyDTO } from "../../../../src/domain/entities/company/companyDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { CompanyRepo } from "../../../../src/domain/usecases/companyRepo"


const companyRepoMock: jest.Mocked<CompanyRepo> = {
    createCompany: jest.fn(),
    deleteCompany: jest.fn(),
    findCompany: jest.fn(),
    createCompanyPosition: jest.fn(),
    checkCompanyPosition: jest.fn()
}

describe("create enterprise use case", () => {
    it("should be successful company creation", async() => {

        const company = {
            name_company: "Empresa.ltda",
            company_cnpj: "12345678907777"
        }

        companyRepoMock.createCompany.mockResolvedValueOnce(new CompanyDTO(company.name_company, String(company.company_cnpj)))
        
        const sut = await new CreateCompanyUseCase(companyRepoMock).create(company.name_company, company.company_cnpj)

        expect(sut).toBeInstanceOf(CompanyDTO)

    })

    it("should be error creating company", async() => {

        const company = {
            name_company: "empresa.ltda",
            company_cnpj: "12345678907777eq"
        }
        
        const sut = await new CreateCompanyUseCase(companyRepoMock).create(company.name_company, company as any)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})

    })

})