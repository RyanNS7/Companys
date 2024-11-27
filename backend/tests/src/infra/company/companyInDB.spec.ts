import { Company } from "../../../../src/domain/entities/company/company"
import { CompanyDTO } from "../../../../src/domain/entities/company/companyDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { checkCompanyPosition } from "../../../../src/infra/DB/company/checkCompanyPositionInDB"
import { createCompany } from "../../../../src/infra/DB/company/createCompanyInDB"
import { createCompanyPosition } from "../../../../src/infra/DB/company/createCompanyPositionInDB"
import { deleteCompany } from "../../../../src/infra/DB/company/deleteCompanyDB"
import { findCompany } from "../../../../src/infra/DB/company/findCompanyInDB"
import { prisma } from "../../../../src/infra/DB/prisma"

describe("CRUD company in database", () => {

    it("should be company creation successfully done in the database", async() => {

        const company = new Company("Ryan.LTDA", "12345678910121")

        const sut = await createCompany(company)

        expect(sut).toBeInstanceOf(CompanyDTO)

    })

    it("should be error creating company in database", async() => {

        const sut = await createCompany("company" as any)

        expect(sut).toBeInstanceOf(BadRequestError)

    })

    it("should be company was successfully found", async() => {
        
        const sut = await findCompany("12345678910121")

        expect(sut).toBeInstanceOf(CompanyDTO)

    })

    it("should be error trying to find the company", async() => {
        
        const sut = await findCompany("1235")

        expect(sut).toBeInstanceOf(NotFoundError)

    })

    it("should be company was successfully deleted", async() => {
        const sut = await deleteCompany("12345678910121")

        expect(sut).toBe(true)
    })

    it("should be error deleting company", async() => {
        const sut = await deleteCompany("12356")

        expect(sut).toBeInstanceOf(BadRequestError)
    })

    
    it("should be error when trying to create company position", async() => {

        const sut = await createCompanyPosition("5678910127", "manager")

        expect(sut).toBeInstanceOf(BadRequestError)

    })

    it("should be company position was successfully created", async() => {

        const company = new Company("Ryan.LTDA", "12345678910127")

        const CDB = await createCompany(company)

        const sut = await createCompanyPosition(String((CDB as CompanyDTO).CNPJ), "manager")

        expect(sut).toHaveProperty("new_service_position")
        expect(sut).toHaveProperty("company_cnpj")

    })

    it("should be company position was successfully found", async() => {
        const sut = await checkCompanyPosition("12345678910127", "manager")

        expect(sut).toBe(true)
    })

    it("should be error when trying to find company position", async() => {
        const sut = await checkCompanyPosition("12345678910127", "atendente")

        expect(sut).toBe(false)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})