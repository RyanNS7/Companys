import request from "supertest";
import { app } from "../../../src/main/server";
import { prisma } from "../../../src/infra/DB/prisma";

describe("/POST Creation Group Test", () => {

    beforeEach(async() => {
        await request(app)
        .post("/company/create")
        .send({name_company: "Ryan.LTDA", cnpj: "16012003170202"})

        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "16012003170202", new_service_position: "manager"})
    })

    it("should be code 201 because the group was created", async() => {
        const task = await request(app)
        .post("/task/create")
        .send({title: "Task com prioridade", description: "descrição da task com prioridade", priority: true})

        const response = await request(app)
        .post("/group/create")
        .send({id_task: (task.body as {task: {id: string}}).task.id})
        expect(201)
    })

    it("should be code 404 because the task to create the group was not found", async() => {

        const response = await request(app)
        .post("/group/create")
        .send({id_task: "task aleatoria"})
        expect(404)
    })

    it("should be code 400 because the necessary information was not passed", async() => {

        const response = await request(app)
        .post("/group/create")
        .send({})
        expect(400)
    })

    afterAll(async () => {
        await prisma.employeeGroup.deleteMany({})
        await prisma.group.deleteMany({})
        await prisma.task.deleteMany({})
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})

describe("/POST ADD New Employe At The Group Test", () => {
    beforeEach(async() => {
        await request(app)
        .post("/company/create")
        .send({name_company: "Ryan.LTDA", cnpj: "16012003170202"})

        await request(app)
        .post("/company/createPosition")
        .send({company_cnpj: "16012003170202", new_service_position: "manager"})

    })

    it("should be code 200 because the user was added to the group", async() => {

        const task = await request(app)
        .post("/task/create")
        .send({title: "Task com prioridade", description: "descrição da task com prioridade", priority: true})

        const group = await request(app)
        .post("/group/create")
        .send({id_task: (task.body as {task: {id: string}}).task.id})

        const employee = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager", company_CNPJ: "16012003170202"})

        const id_employee = (employee.body as {employee: {id: string}}).employee.id
        const id_group = (group.body as {id: string}).id

        const response = await request(app)
        .post("/group/newEmployee")
        .send({id_employee, id_group})
        .expect(200)
    })

    it("should be should be code 404 because the group was not found", async() => {

        const task = await request(app)
        .post("/task/create")
        .send({title: "Task com prioridade", description: "descrição da task com prioridade", priority: true})

        const group = await request(app)
        .post("/group/create")
        .send({id_task: (task.body as {task: {id: string}}).task.id})

        const employee = await request(app)
        .post("/employee/create")
        .send({name: "Ryan", company_position: "manager", company_CNPJ: "16012003170202"})

        const id_employee = (employee.body as {employee: {id: string}}).employee.id

        const response = await request(app)
        .post("/group/newEmployee")
        .send({id_employee, id_group: "id_aleatorio"})
        .expect(404)
    })

    it("should be code 400 because the necessary information was not passed (id group)", async() => {
        
        const response = await request(app)
        .post("/group/newEmployee")
        .send({id_employee: "id_do_funcionario"})
        .expect(400)
    })

    it("should be code 400 because the necessary information was not passed (id employee)", async() => {
        
        const response = await request(app)
        .post("/group/newEmployee")
        .send({id_group: "id_do_grupo"})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.employeeGroup.deleteMany({})
        await prisma.group.deleteMany({})
        await prisma.task.deleteMany({})
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })
})