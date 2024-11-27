import { Company } from "../../../../src/domain/entities/company/company"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeDTO"
import { IEmployee } from "../../../../src/domain/entities/employee/employee"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { createCompany } from "../../../../src/infra/DB/company/createCompanyInDB"
import { createCompanyPosition } from "../../../../src/infra/DB/company/createCompanyPositionInDB"
import { createEmployee } from "../../../../src/infra/DB/employee/createEmployeeInDB"
import { deleteEmployee } from "../../../../src/infra/DB/employee/deleteEmployeeInDB"
import { findEmployee } from "../../../../src/infra/DB/employee/findEmployeeInDB"
import { prisma } from "../../../../src/infra/DB/prisma"

describe("testing the functions of the employees", () => {

    beforeEach(async () => {
        const company = new Company("Ryan.LTDA", "17120116022012")

        await createCompany(company)
    
        await createCompanyPosition(company.CNPJ, "manager")
        await createCompanyPosition(company.CNPJ, "employee")
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })

    it("should be employee creation completed successfully", async() => {

        const employee: IEmployee = {
            name: "Ryan",
            company_CNPJ: "17120116022012",
            company_position: "manager"
        }

        const sut = await createEmployee(employee)

        expect(sut).toBeInstanceOf(EmployeeDTO)

    })

    it("should be error creating employee", async() => {

        const sut = await createEmployee("employee" as any)

        expect(sut).toBeInstanceOf(BadRequestError)

    })

    it("should be employee found successfully", async() => {

        const employee: IEmployee = {
            name: "Ryan",
            company_CNPJ: "17120116022012",
            company_position: "employee"
        }

        const employeeDB = await createEmployee(employee)

        const sut = await findEmployee((employeeDB as EmployeeDTO).employee.id)

        expect(sut).toBeInstanceOf(EmployeeDTO)
    })

    
    it("should be error trying to find employee", async() => {

        const sut = await findEmployee("id_aleatorio")

        expect(sut).toBeInstanceOf(NotFoundError)
    })

    it("should be employee deleted successfully", async () => {

        const employee: IEmployee = {
            name: "Ryan",
            company_CNPJ: "17120116022012",
            company_position: "manager"
        }

        const employeeDB = await createEmployee(employee)

        const sut = await deleteEmployee((employeeDB as EmployeeDTO).employee.id)

        expect(sut).toBe(true)
    })

    it("should be error deleting employee", async () => {
        const sut = await deleteEmployee("id_aleatorio")

        expect(sut).toBeInstanceOf(BadRequestError)
    })
})