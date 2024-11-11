import { createTaskController } from "../../../../../src/adapters/controllers/task/createTaskController"
import { TaskRepo } from "../../../../../src/domain/usecases/taskRepo"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn(),
    setTaskForEmployee: jest.fn(),
    setTaskForEmployeeGroup: jest.fn()
}

describe("create task controller", () => {
    it("should be return a 400 error because the title is undefined", async() => {
        const request = {
            body: {}
        }

        const sut = await new createTaskController(taskRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, title is required"}})

    })
})