import { Task } from "../../../src/domain/entities/task/task"
import { BadRequestError } from "../../../src/domain/errors/BadRequestError"

describe("company task Class", () => {
    it("should be error creating the task because the title has too few characters", () => {

        const task_sut = {
            title: "não",
            description: "especificações da tarefa",
            priority: false,
            completed: false
        }

        const sut = new Task(task_sut).create()

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400, message: 'the title has few characters, describe more'})
    })

    it("should be error creating the task because the description had too few characters so it was not possible to be objective", () => {

        const task_sut = {
            title: "não tem titulo ainda",
            description: "test",
            priority: false,
            completed: false
        }

        const sut = new Task(task_sut).create()

        expect(sut).toBeInstanceOf(BadRequestError)
        expect(sut).toMatchObject({statusCode: 400, message: 'the description must contain the details of the task, too few characters are not allowed'})
    })

    
    it("should be success creating task without description", () => {

        const task_sut = {
            title: "Fazer o relatorio do Mês",
            priority: false,
            completed: false
        }

        const sut = new Task(task_sut).create()

        expect(sut).toBeInstanceOf(Task)
    })

    it("should be success creating the task", () => {

        const task_sut = {
            title: "Horario de Janta",
            description: "Pedir aos funcionarios para avisarem quando for retirar o horario de janta",
            priority: false,
            completed: false
        }

        const sut = new Task(task_sut).create()

        expect(sut).toBeInstanceOf(Task)
    })
})