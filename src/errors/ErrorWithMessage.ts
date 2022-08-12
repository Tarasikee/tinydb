export class ErrorWithMessage extends Error {
    constructor(message: string) {
        super(`Message: ${message}`)
    }
}
