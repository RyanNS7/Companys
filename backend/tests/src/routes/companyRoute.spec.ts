import request from "supertest";
import { app } from "../../../src/main/server";
import { prisma } from "../../../src/infra/DB/prisma";

describe("/POST Creation Route Tests", () => {
    it("should be return code 201 with the company creation done successfully", async() => {
        const response = await request(app)
        .post("/company/create")
        .send({name_company: "Ryan.LTDA", cnpj: "12345678987654"})
        .expect(201)
    })

    it("should be status error code 400 because the company already exists ", async() => {
        const response = await request(app)
        .post("/company/create")
        .send({name_company: "Ryan.LTDA", cnpj: "12345678987654"})
        .expect(400)
    })

    it("should be status error code 400 as the necessary information was not provided (cnpj)", async() => {
        const response = await request(app)
        .post("/company/create")
        .send({name_company: "Ryan.LTDA"})
        .expect(400)
    })

    it("should be status error code 400 as the necessary information was not provided (name_company)", async() => {
        const response = await request(app)
        .post("/company/create")
        .send({cnpj: "12345678987654"})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})

describe("/GET routes to find company", () => {
    beforeEach(async () => {
        await request(app)
        .post("/company/create")
        .send({name_company: "Marcela.LTDA", cnpj: "94917391731000"})
    })

    it("should be status code 200 because the company was found", async () => {
        const response = await request(app)
        .get("/company/find")
        .send({company_cnpj: "94917391731000"})
        .expect(200)
    })

    it("should be status code 404 because the company was not found", async () => {
        const response = await request(app)
        .get("/company/find")
        .send({company_cnpj: "94917391731001"})
        .expect(404)
    })

    it("should be status code 400 because the company's CNPJ was not passed", async () => {
        const response = await request(app)
        .get("/company/find")
        .send({})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})

describe("/DELETE routes to delete company", () => {
    beforeEach(async () => {
        await request(app)
        .post("/company/create")
        .send({name_company: "Marcela<3.LTDA", cnpj: "11111111111111"})
    })

    it("status code 400 because there was an error when trying to delete the company", async() => {
        const response = await request(app)
        .delete("/company/delete")
        .send({company_cnpj: "94917391731021"})
        .expect(400)
    })

    it("should be status code 200 because the company was deleted", async() => {
        const response = await request(app)
        .delete("/company/delete")
        .send({company_cnpj: "11111111111111"})
        .expect(200)
    })

    it("should be status code 400 because the company's CNPJ was not passed", async() => {
        const response = await request(app)
        .delete("/company/delete")
        .send({})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})

describe("/POST service position creation", () => {
    beforeEach(async () => {
        await request(app)
        .post("/company/create")
        .send({name_company: "RyanEnterprise.LTDA", cnpj: "22222222222222"})
    })

    it("should be status code 201 because the company position was created", async() => {
        const response = await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "22222222222222", new_service_position: "manager"})
        .expect(201)
    })

    it("should be status code 400 because there was an error adding the new company position", async() => {
        const response = await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "12341234123425", new_service_position: "manager"})
        .expect(400)
    })

    it("should be status code 400 because the correct information was not provided (new service position)", async() => {
        const response = await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "22222222222222"})
        .expect(400)
    })

    it("should be status code 400 because the correct information was not provided (company cnpj)", async() => {
        const response = await request(app)
        .post("/company/createPosition")
        .send({new_service_position: "manager"})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})