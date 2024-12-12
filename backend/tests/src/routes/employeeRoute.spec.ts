import request from "supertest";
import { app } from "../../../src/main/server";
import { prisma } from "../../../src/infra/DB/prisma";

describe("/POST Creation Employee Test", () => {

    beforeEach(async () => {
        await request(app)
        .post("/company/create")
        .send({name_company: "RyanEnterprise.LTDA", cnpj: "91200000000004"})

        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "91200000000004", new_service_position: "manager"})
        .expect(201)

    })

    it("should be code 201 with employee creation done", async() => {

        const response = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager", company_CNPJ: "91200000000004"})
        .expect(201)
    })

    it("should be code 400 because there is missing information (name)", async() => {

        const response = await request(app)
        .post("/employee/create")
        .send({company_position: "manager", company_CNPJ: "91200000000004"})
        .expect(400)
    })

    it("should be code 400 because there is missing information (company position)", async() => {

        const response = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_CNPJ: "91200000000004"})
        .expect(400)
    })

    it("should be code 400 because there is missing information (company cnpj)", async() => {

        const response = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager"})
        .expect(400)
    })

    it("should be code 404 because the company was not found", async() => {

        const response = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager", company_CNPJ: "91200000000005"})
        .expect(404)
    })

    it("should be code 404 because the service position was not found", async() => {

        const response = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manage", company_CNPJ: "91200000000004"})
        .expect(404)

    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})

describe("/GET Find Employee Test", () => {
    beforeEach(async () => {
        await request(app)
        .post("/company/create")
        .send({name_company: "RyanEnterprise.LTDA", cnpj: "91200000000012"})

        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "91200000000012", new_service_position: "manager"})


        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "91200000000012", new_service_position: "employee"})

    })

    it("should be code 200 because the manager was found", async() => {

        const manager = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager", company_CNPJ: "91200000000012"})

        const response = await request(app)
        .get("/employee/find")
        .send({id_employee: (manager.body as {employee: {id: string}}).employee.id})
        .expect(200)
    })

    it("should be code 200 because the employee was found", async() => {

        const employee = await request(app)
        .post("/employee/create")
        .send({name: "Juan", company_position: "employee", company_CNPJ: "91200000000012"})

        const response = await request(app)
        .get("/employee/find")
        .send({id_employee: (employee.body as {employee: {id: string}}).employee.id})
        .expect(200)
    })

    it("should be code 404 because the employee is not", async() => {

        const response = await request(app)
        .get("/employee/find")
        .send({id_employee: 1213123})
        .expect(404)
    })

    it("should be code 400 because the information was not passed", async() => {

        const response = await request(app)
        .get("/employee/find")
        .send({})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})

describe("/DELETE Delete Employee Test", () => {
    beforeEach(async () => {
        await request(app)
        .post("/company/create")
        .send({name_company: "RyanEnterprise.LTDA", cnpj: "91200000050012"})

        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "91200000050012", new_service_position: "manager"})

        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "91200000050012", new_service_position: "employee"})

    })

    it("should be code 200 because the manager was deleted", async() => {

        const manager = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager", company_CNPJ: "91200000050012"})

        const response = await request(app)
        .delete("/employee/delete")
        .send({id_employee: (manager.body as {employee: {id: string}}).employee.id})
        .expect(200)
    })

    it("should be code 200 because the employee was deleted ", async() => {

        const employee = await request(app)
        .post("/employee/create")
        .send({name: "Juan", company_position: "employee", company_CNPJ: "91200000050012"})

        const response = await request(app)
        .delete("/employee/delete")
        .send({id_employee: (employee.body as {employee: {id: string}}).employee.id})
        .expect(200)

    })

    it("should be code 400 because the information was not passed (id employee)", async() => {

        const response = await request(app)
        .delete("/employee/delete")
        .send({})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})