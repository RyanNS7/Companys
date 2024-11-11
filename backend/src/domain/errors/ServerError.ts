import { BaseError } from "./BaseError";

export class ServerError extends BaseError{

    constructor(message: string, cause?: unknown){
        super(message, 500)
        this.cause = cause
    }
}