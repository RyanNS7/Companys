import { createGroupController } from "../../../../../src/adapters/controllers/group/createGroupController"
import { GroupRepo } from "../../../../../src/domain/usecases/groupRepo"
import { TaskRepo } from "../../../../../src/domain/usecases/taskRepo"

const taskRepoMock: jest.Mocked<TaskRepo> = {
    changeTaskCompletedStatus: jest.fn(),
    createTask: jest.fn(),
    findTask: jest.fn(),
}

const groupRepoMock:jest.Mocked<GroupRepo> = {
    createGroup: jest.fn(),
    addAnotherEmployeeToTheGroup: jest.fn(),
    findGroup: jest.fn(),
}

describe("create group controller", () => {

    it("should be return a 400 error because the task id is undefined", async() => {

        const request = {
            body: {
                
            }
        }

        const sut = await new createGroupController(taskRepoMock, groupRepoMock).create(request)

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({data: {error: "Error, id task is required"}})

    })
})