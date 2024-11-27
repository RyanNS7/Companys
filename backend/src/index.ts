require('dotenv').config()
import { PrismaClient } from "@prisma/client";
import { Request, Response, urlencoded } from "express";
import Express from "express";
import { EmployeeDTO } from "./domain/entities/employee/employeDTO";

const app = Express()

app.use(Express.urlencoded())
app.use(Express.json())

const prisma = new PrismaClient()

app.get("/", async (req: Request, res: Response) => {

    await prisma.$connect()

    const company = await prisma.company.create({data: {name: req.body.name, cnpj:parseInt(req.body.cnpj)}})

    res.send(company)
})

app.get("/asd", async (req: Request, res: Response) => {

    await prisma.$connect()
    try {
        const company = await prisma.companyPosition.create({data: {servicePosition: req.body.service_position, companyCNPJ:parseInt(req.body.cnpj)}})

        res.send(company)
        
    } catch (error) {
        res.send(error)
    }
})

app.get("/find", async (req: Request, res: Response) => {

    await prisma.$connect()

    try {

        const company = await prisma.company.findUniqueOrThrow({where: {cnpj: parseInt(req.body.cnpj)}})

        res.send(company)

    } catch (error) {
        res.send(error.name)
    }
})

app.get("/delete", async (req: Request, res: Response) => {

    await prisma.$connect()

    try {

        const company = await prisma.company.delete({where: {cnpj: parseInt(req.body.cnpj)}})

        res.send(company)

    } catch (error) {
        res.send(error)
    }
})

app.get("/employee", async (req: Request, res: Response) => {

    await prisma.$connect()

    try {
        const id_servicePosition = await prisma.companyPosition.findFirst({where: {companyCNPJ: parseInt(req.body.company_cnpj), servicePosition: req.body.position}})

        const employee = await prisma.employee.create({data: {name: req.body.name, companyCNPJ: parseInt(req.body.company_cnpj), position: id_servicePosition.id}})

        res.send(new EmployeeDTO({...employee, position: id_servicePosition.servicePosition}))

    } catch (error) {
        res.send(error)
    }
})

app.get("/task", async (req: Request, res: Response) => {

    await prisma.$connect()

    try {

        const task = await prisma.task.create({data: {title: req.body.title, priority: true, completed: false, description: req.body.description}})

        res.send(task)

    } catch (error) {
        res.send(error)
    }
})

app.get("/group", async (req: Request, res: Response) => {

    await prisma.$connect()

    try {
        const group = await prisma.group.create({data: {task: req.body.task}})

        res.send(group)

    } catch (error) {
        res.send(error)
    }
})

app.get("/employeegroup", async (req: Request, res: Response) => {

    await prisma.$connect()

    try {
        const group = await prisma.employeeGroup.create({data: {employee: req.body.id_employee, group: req.body.id_group}})

        res.send(group)

    } catch (error) {
        res.send(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Iniciado com sucesso na porta ${process.env.PORT}`)
})