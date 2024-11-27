import { changeTaskCompletedStatusUseCase } from "../../../../src/application/usecases/tasks/changeTaskCompletedStatusUseCase";
import { ITask } from "../../../../src/domain/entities/task/task";
import { TaskDTO } from "../../../../src/domain/entities/task/taskDTO";
import { NotFoundError } from "../../../../src/domain/errors/NotFoundError";
import { TaskRepo } from "../../../../src/domain/usecases/taskRepo";
import { createID } from "../../../createTestID";

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn()
}

const taskInfo = {
    id: createID(),
    title: "Não esquecer de fazer as carnes",
    description: "Antes de amassar as carnes, colocar em um recipiente misturar ela toda por 4 minutos e depois pesar bolinhas com 115g",
    priority: true,
    completed: false
}

const task = new TaskDTO(taskInfo)

describe("change task completed status use case", () => {
    it("should be error, because the task was not found", async() => {

        taskRepoMock.changeTaskCompletedStatus.mockResolvedValueOnce(new NotFoundError("Task not found"))

        const sut = await new changeTaskCompletedStatusUseCase(taskRepoMock).changeStatus(taskInfo.id)

        expect(sut).toBeInstanceOf(NotFoundError)
        expect(sut).toMatchObject({statusCode: 404})

    })

    it("should be task status has been changed successfully", async() => {

        const taskDTO = {...task, completed: true}

        taskRepoMock.changeTaskCompletedStatus.mockResolvedValueOnce(taskDTO)

        const sut = await new changeTaskCompletedStatusUseCase(taskRepoMock).changeStatus(taskInfo.id)

        expect(sut).toMatchObject({completed: true})

    })
})