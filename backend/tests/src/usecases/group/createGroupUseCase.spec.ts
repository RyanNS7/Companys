import { createGroupUseCase } from "../../../../src/application/usecases/group/createGroupUseCase"
import { TaskDTO } from "../../../../src/domain/entities/task/taskDTO"
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError"
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError"
import { GroupRepo } from "../../../../src/domain/usecases/groupRepo"
import { TaskRepo } from "../../../../src/domain/usecases/taskRepo"
import { createID } from "../../../createTestID"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn(),
    findTask: jest.fn(),
}

const groupRepoMock:jest.Mocked<GroupRepo> = {
    createGroup: jest.fn(),
    addAnotherEmployeeToTheGroup: jest.fn(),
    findGroup: jest.fn(),
}

const task = new TaskDTO({id: createID(), completed: false, priority:true, description: "testando aqui", title: "Teste supremo dos use cases"})

describe("create group use case", () => {
    it("should be create the employee group successfully", async() => {

        taskRepoMock.findTask.mockResolvedValueOnce(task)
        groupRepoMock.createGroup.mockResolvedValue({id: createID(), task: task.task.id})

        const sut = await new createGroupUseCase(taskRepoMock, groupRepoMock).create(task.task.id)

        expect(sut).toBeInstanceOf(Object)
    })

    it("should be error, employee who will create the group was not found", async() => {

        taskRepoMock.findTask.mockResolvedValueOnce(new NotFoundError("Task not found"))

        const sut = await new createGroupUseCase(taskRepoMock, groupRepoMock).create(createID())

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})
    })

    it("should be error creating group", async() => {

        taskRepoMock.findTask.mockResolvedValueOnce(task)
        groupRepoMock.createGroup.mockResolvedValue(new BadRequestError("Error creating group"))

        const sut = await new createGroupUseCase(taskRepoMock, groupRepoMock).create(task.task.id)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})
    })
})
