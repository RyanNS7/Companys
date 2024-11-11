
import { changeTaskCompletedStatusController } from "../../../../../src/adapters/controllers/task/changeTaskCompletedStatusController"
import { TaskRepo } from "../../../../../src/domain/usecases/taskRepo"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn(),
    setTaskForEmployee: jest.fn(),
    setTaskForEmployeeGroup: jest.fn()
}

describe("change task completed status controller", () => {
    it("should be return a 400 error because the id task is undefined", async() => {
        const request = {
            body: {}
        }

        const sut = await new changeTaskCompletedStatusController(taskRepoMock).changeStatus(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id task is required"}})

    })
})