import { ServiceGroup } from "../../../../src/application/usecases/group/createGroupUseCase"
import { Company } from "../../../../src/domain/entities/company/company"
import { EmployeeDTO } from "../../../../src/domain/entities/employee/employeeDTO"
import { IEmployee } from "../../../../src/domain/entities/employee/employee"
import { ITask, Task } from "../../../../src/domain/entities/task/task"
import { TaskDTO } from "../../../../src/domain/entities/task/taskDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { createCompany } from "../../../../src/infra/DB/company/createCompanyInDB"
import { createCompanyPosition } from "../../../../src/infra/DB/company/createCompanyPositionInDB"
import { createEmployee } from "../../../../src/infra/DB/employee/createEmployeeInDB"
import { addAnotherEmployeeToTheGroup } from "../../../../src/infra/DB/group/addAnotherEmployeeToTheGroupInDB"
import { createGroup } from "../../../../src/infra/DB/group/createGroupInDB"
import { findGroup } from "../../../../src/infra/DB/group/findGroupInDB"
import { prisma } from "../../../../src/infra/DB/prisma"
import { createTask } from "../../../../src/infra/DB/task/createTaskInDB"

describe("group functions in the database", () => {

    beforeEach(async () => {
        const company = new Company("Ryan.LTDA", "17120116022027")

        await createCompany(company)
    
        await createCompanyPosition(company.CNPJ, "manager")
        await createCompanyPosition(company.CNPJ, "employee")
    })

    afterAll(async () => {
        await prisma.employeeGroup.deleteMany({})
        await prisma.group.deleteMany({})
        await prisma.task.deleteMany({})
        await prisma.employee.deleteMany({})
        await prisma.companyPosition.deleteMany({})
        await prisma.company.deleteMany({})
    })

    it("should be group was created successfully", async() => {

        const iTask: ITask = {
            title: "Task para ser encontrada",
            description: "sera que realmente foi encontrada com sucesso?",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const taskInDB = await createTask(task)

        const sut = await createGroup((taskInDB as TaskDTO).task.id)

        expect(sut).toHaveProperty("id")
        expect(sut).toHaveProperty("task")

    })

    it("should be error creating group in database", async() => {

        const sut = await createGroup("1232112")

        expect(sut).toBeInstanceOf(BadRequestError)

    })

    it("should be group found successfully", async() => {

        const iTask: ITask = {
            title: "Task para ser encontrada",
            description: "sera que realmente foi encontrada com sucesso?",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const taskInDB = await createTask(task)

        const group = await createGroup((taskInDB as TaskDTO).task.id)

        const sut = await findGroup((group as ServiceGroup).id)

        expect(sut).toHaveProperty("id")
        expect(sut).toHaveProperty("task")

    })

    it("should be error trying to find group in database", async() => {

        const sut = await findGroup("1232112")

        expect(sut).toBeInstanceOf(NotFoundError)

    })

    it("should be employee added to group successfully", async() => {

        const iTask: ITask = {
            title: "Task para adicionar novo usuario",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const taskInDB = await createTask(task)

        const iEmployee: IEmployee = {
            name: "Ryan",
            company_CNPJ: "17120116022027",
            company_position: "manager"
        }

        const employee = await createEmployee(iEmployee)
        const group = await createGroup((taskInDB as TaskDTO).task.id)

        const sut = await addAnotherEmployeeToTheGroup((group as ServiceGroup).id, (employee as EmployeeDTO).employee.id)

        expect(sut).toHaveProperty("id")
        expect(sut).toHaveProperty("group")
        expect(sut).toHaveProperty("employee")

    })

    it("should be error when trying to add new employee to task group", async() => {

        const sut = await addAnotherEmployeeToTheGroup("123123124", "asdasdqwe")

        expect(sut).toBeInstanceOf(BadRequestError)

    })

})
