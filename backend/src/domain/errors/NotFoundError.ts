import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError{

    constructor(message: string, cause?: unknown){
        super(message, 404)
        this.cause = cause
    }
}