import { ITask, Task } from "../../../../src/domain/entities/task/task"
import { TaskDTO } from "../../../../src/domain/entities/task/taskDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { prisma } from "../../../../src/infra/DB/prisma"
import { changeTaskCompletedStatus } from "../../../../src/infra/DB/task/changeTaskCompletedStatusInDB"
import { createTask } from "../../../../src/infra/DB/task/createTaskInDB"
import { findTask } from "../../../../src/infra/DB/task/findTaskInDB"

describe("task functions in the database", () => {

    afterAll(async () => {
        await prisma.employeeGroup.deleteMany({})
        await prisma.group.deleteMany({})
        await prisma.task.deleteMany({})
    })

    it("should be task creation completed successfully", async() => {

        const iTask: ITask = {
            title: "Fazer Tarefa Test",
            description: "Descrição da tarefa",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const sut = await createTask(task)

        expect(sut).toBeInstanceOf(TaskDTO)

    })

    it("should be task creation without description successfully completed", async() => {

        const iTask: ITask = {
            title: "Fazer Tarefa Test sem descrição",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const sut = await createTask(task)

        expect(sut).toBeInstanceOf(TaskDTO)

    })

    it("should be error creating task", async() => {

        const sut = await createTask("task" as any)

        expect(sut).toBeInstanceOf(BadRequestError)

    })

    it("should be task was found successfully", async() => {

        const iTask: ITask = {
            title: "Task para ser encontrada",
            description: "sera que realmente foi encontrada com sucesso?",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const taskInDB = await createTask(task)

        const sut = await findTask((taskInDB as TaskDTO).task.id)

        expect(sut).toBeInstanceOf(TaskDTO)

    })

    it("should be error while trying to find task", async() => {

        const sut = await findTask("id_da_task")

        expect(sut).toBeInstanceOf(NotFoundError)

    })

    it("should be task status has been changed to successfully completed", async() => {

        const iTask: ITask = {
            title: "Task para ser encontrada",
            description: "sera que realmente foi encontrada com sucesso?",
            completed: false,
            priority: true
        }

        const task = new Task(iTask)

        const taskInDB = await createTask(task)

        const sut = await changeTaskCompletedStatus((taskInDB as TaskDTO).task.id)

        expect(sut).toBeInstanceOf(TaskDTO)

    })

    it("should be error while trying to find the task to change its status", async() => {

        const sut = await changeTaskCompletedStatus("id_da_task")

        expect(sut).toBeInstanceOf(NotFoundError)

    })

})