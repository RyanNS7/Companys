import request from "supertest";
import { app } from "../../../src/main/server";
import { prisma } from "../../../src/infra/DB/prisma";

describe("/POST Creation Task Test", () => {
    it("should be code 201 because the task was created with all items", async() => {
        const response = await request(app)
        .post("/task/create")
        .send({title: "Task com prioridade", description: "descrição da task com prioridade", priority: true})
        .expect(201)
    })

    it("should be code 201 because the task was created but does not have priority", async() => {
        const response = await request(app)
        .post("/task/create")
        .send({title: "Task sem prioridade", description: "descrição da task sem prioridade"})
        .expect(201)
    })

    it("should be code 201 because the task was created but has no priority or description", async() => {
        const response = await request(app)
        .post("/task/create")
        .send({title: "Task sem prioridade e sem descrição"})
        .expect(201)
    })

    it("should be code 201 because the task was created, has priority but no description", async() => {
        const response = await request(app)
        .post("/task/create")
        .send({title: "Task com prioridade e sem descrição", priority: true})
        .expect(201)
    })

    it("should be code 400 because the minimum number of characters was not passed", async() => {
        const response = await request(app)
        .post("/task/create")
        .send({title: "Task"})
        .expect(400)
    })

    it("should be code 400 because the information was not passed (title)", async() => {
        const response = await request(app)
        .post("/task/create")
        .send({})
        .expect(400)
    })

    afterAll(async () => {
        await prisma.task.deleteMany({})
    })
})

describe("/PUT Update Status Task Test", () => {
    afterAll(async () => {
        await prisma.task.deleteMany({})
    })

    it("should be code 200 because the task status was completed", async() => {

        const task = await request(app)
        .post("/task/create")
        .send({title: "Task com prioridade", description: "descrição da task com prioridade", priority: true})

        const response = await request(app)
        .put("/task/changeStatus")
        .send({id_task: (task.body as {task: {id: string}}).task.id})
        .expect(200)
    })

    it("should be code 404 because the task was not found", async() => {

        const response = await request(app)
        .put("/task/changeStatus")
        .send({id_task: "id_aleatorio"})
        .expect(404)
    })

    it("should be code 400 because the information was not passed (id task)", async() => {
        const response = await request(app)
        .put("/task/changeStatus")
        .send({})
        .expect(400)
    })
})