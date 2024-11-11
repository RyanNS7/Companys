import { setTaskForEmployeeController } from "../../../../../src/adapters/controllers/task/setTaskForEmployeeController"
import { TaskRepo } from "../../../../../src/domain/usecases/taskRepo"
import { createID } from "../../../../createTestID"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    createTask: jest.fn(),
    findTask: jest.fn(),
    changeTaskCompletedStatus: jest.fn(),
    setTaskForEmployee: jest.fn(),
    setTaskForEmployeeGroup: jest.fn()
}

describe("set task for employee controller", () => {
    it("should be return a 400 error because the id task is undefined", async() => {
        const request = {
            body: {id_employee: createID()}
        }

        const sut = await new setTaskForEmployeeController(taskRepoMock).setTask(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id task is required"}})

    })

    it("should be return a 400 error because the id employee is undefined", async() => {
        const request = {
            body: {id_task: createID()}
        }

        const sut = await new setTaskForEmployeeController(taskRepoMock).setTask(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id employee is required"}})

    })
})