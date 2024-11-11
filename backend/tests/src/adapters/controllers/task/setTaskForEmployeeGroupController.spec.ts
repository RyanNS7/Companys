import { setTaskForEmployeeGroupController } from "../../../../../src/adapters/controllers/task/setTaskForEmployeeGroupController"
import { TaskRepo } from "../../../../../src/domain/usecases/taskRepo"
import { createID } from "../../../../createTestID"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn(),
    setTaskForEmployee: jest.fn(),
    setTaskForEmployeeGroup: jest.fn()
}

describe("set task for employee group controller", () => {
    it("should be return a 400 error because the id task is undefined", async() => {
        const request = {
            body: {id_group: createID()}
        }

        const sut = await new setTaskForEmployeeGroupController(taskRepoMock).setTask(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id task is required"}})

    })

    it("should be return a 400 error because the id group is undefined", async() => {
        const request = {
            body: {id_task: createID()}
        }

        const sut = await new setTaskForEmployeeGroupController(taskRepoMock).setTask(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id group is required"}})

    })
})