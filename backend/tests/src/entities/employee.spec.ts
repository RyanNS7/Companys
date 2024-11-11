import { Employee } from "../../../src/domain/entities/employee/employee"
import { BadRequestError } from "../../../src/domain/errors/BadRequestError"

describe("employee class", () => {

    it("should be error creating employee name", async () => {

        const employeeSUT = {
            name: "SU",
            company_position: "manager",
            company_CNPJ: "12345678000915"
        }

        const sut = new Employee(employeeSUT).create()

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400, message: "Name does not have enough characters"})
    })

    it("should be success in creating the company employee", async () => {

        const employeeSUT = {
            name: "SUT_NAME",
            company_position: "manager",
            company_CNPJ: "12345678000915"
        }

        const sut = new Employee(employeeSUT).create()

        expect(sut).toBeInstanceOf(Employee)
    })
})