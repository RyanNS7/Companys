import { ServiceGroup } from "../../../../src/application/usecases/group/createGroupUseCase"
import { setTaskForEmployeeGroupUseCase } from "../../../../src/application/usecases/tasks/setTaskForEmployeeGroupUseCase"
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

let serviceGroup: ServiceGroup = {id_group: createID(), id_employees: [createID(), createID()]}

describe("set task for employee group use case", () => {
    it("should be error when trying to assign a task to the group", async() => {

        taskRepoMock.setTaskForEmployeeGroup.mockResolvedValueOnce(new BadRequestError("error when trying to assign a task to the group"))

        const sut = await new setTaskForEmployeeGroupUseCase(taskRepoMock).setTask(serviceGroup.id_group, task.id)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })

    it("should be error trying to find group", async() => {

        taskRepoMock.setTaskForEmployeeGroup.mockResolvedValueOnce(new NotFoundError('Group not found'))

        const sut = await new setTaskForEmployeeGroupUseCase(taskRepoMock).setTask(serviceGroup.id_group, task.id)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })

    it("should be error while trying to find task", async() => {

        taskRepoMock.setTaskForEmployeeGroup.mockResolvedValueOnce(new NotFoundError('Task not found'))

        const sut = await new setTaskForEmployeeGroupUseCase(taskRepoMock).setTask(serviceGroup.id_group, task.id)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })

    it("should be task was successfully added to the group", async() => {

        taskRepoMock.setTaskForEmployeeGroup.mockResolvedValueOnce({taskThatGroupWillDo: task, groupThatWillDo: serviceGroup})

        const sut = await new setTaskForEmployeeGroupUseCase(taskRepoMock).setTask(serviceGroup.id_group, task.id)

        expect(sut).toMatchObject({ taskThatGroupWillDo: task, groupThatWillDo: serviceGroup})
    })
})