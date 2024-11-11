import { Company } from "../../../src/domain/entities/company/company"
import { BadRequestError } from "../../../src/domain/errors/BadRequestError"


describe("company class", () => {

    it("should be error when creating the CNPJ because there are not only numbers", () => {

        const sut = new Company("Empresa.ltda", "12345678000a15").create()
        
        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400, message: "CNPJ can only have numbers"})

    })

    it("should be error due to the CNPJ not having the right amount of characters", () => {

        const sut = new Company("Empresa.ltda", "123456780000915").create()

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400, message: "Invalid CNPJ"})

    })

    it("should be error creating company name", () => {

        const sut = new Company("LTDA", "12345678000915").create()

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400, message: "Company name should not be too few characters long"})

    })

    it("should be success in creating the company", () => {

        const sut = new Company("Empresa.LTDA", "12345678000915").create()

        expect(sut).toBeInstanceOf(Company)

    })

})