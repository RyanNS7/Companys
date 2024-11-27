import { createTaskUseCase } from "../../../../src/application/usecases/tasks/createTaskUseCase";
import { ITask } from "../../../../src/domain/entities/task/task";
import { TaskDTO } from "../../../../src/domain/entities/task/taskDTO";
import { BadRequestError } from "../../../../src/domain/errors/BadRequestError";
import { TaskRepo } from "../../../../src/domain/usecases/taskRepo";
import { createID } from "../../../createTestID";

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn()
}

const task: ITask = {
    title: "Não esquecer de fazer as carnes",
    description: "Antes de amassar as carnes, colocar em um recipiente misturar ela toda por 4 minutos e depois pesar bolinhas com 115g",
    priority: true,
    completed: false
}

describe("create task use case", () => {
    it("should be task created successfully", async() => {

        taskRepoMock.createTask.mockResolvedValueOnce(new TaskDTO({id: createID(),...task}))
    
        const sut = await new createTaskUseCase(taskRepoMock).create(task)

        expect(sut).toBeInstanceOf(Object)

    })

    it("should be error creating new task", async() => {

        taskRepoMock.createTask.mockResolvedValueOnce(new BadRequestError("Error creating new task"))
    
        const sut = await new createTaskUseCase(taskRepoMock).create(task)

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400})

    })
})