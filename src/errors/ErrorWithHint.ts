export class ErrorWithHint extends Error {
    constructor(message: string, hint: string) {
        super(JSON.stringify({
            message,
            hint
        }))
    }
}
