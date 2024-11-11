import { setTaskForEmployeeUseCase } from "../../../../src/application/usecases/tasks/setTaskForEmployeeUseCase"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { TaskRepo } from "../../../../src/domain/usecases/taskRepo"
import { createID } from "../../../createTestID"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn(),
    setTaskForEmployee: jest.fn(),
    setTaskForEmployeeGroup: jest.fn()
}

const task = {
    id: createID(),
    title: "Não esquecer de fazer as carnes",
    description: "Antes de amassar as carnes, colocar em um recipiente misturar ela toda por 4 minutos e depois pesar bolinhas com 115g",
    priority: true,
    completed: false
}

const employee = {
    id: createID(),
    name: 'Ryan',
    company_position: "manager",
    company_CNPJ: "12345678898765"
}

describe("set task for employee use case", () => {
    it("should be error assigning a task to an employee", async () => {

        taskRepoMock.setTaskForEmployee.mockResolvedValueOnce(new BadRequestError("Error assigning a task to an employee"))
        
        const sut = await new setTaskForEmployeeUseCase(taskRepoMock).setTask(employee.id, task.id)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})

    })

    it("should be error trying to find employee", async () => {

        taskRepoMock.setTaskForEmployee.mockResolvedValueOnce(new NotFoundError("employee not found"))
        
        const sut = await new setTaskForEmployeeUseCase(taskRepoMock).setTask(employee.id, task.id)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})

    })

    it("should be error trying to find a task", async () => {

        taskRepoMock.setTaskForEmployee.mockResolvedValueOnce(new NotFoundError("task not found"))
        
        const sut = await new setTaskForEmployeeUseCase(taskRepoMock).setTask(employee.id, task.id)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})

    })

    it("should be task assigned to employee successfully", async () => {

        taskRepoMock.setTaskForEmployee.mockResolvedValueOnce({taskThatEmployeeWillDo: task, employeeThoWillDo: employee})
        
        const sut = await new setTaskForEmployeeUseCase(taskRepoMock).setTask(employee.id, task.id)

        expect(sut).toMatchObject({taskThatEmployeeWillDo: task, employeeThoWillDo: employee})

    })
})