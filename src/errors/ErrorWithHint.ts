export class ErrorWithHint extends Error {
    constructor(message: string, hint: string) {
        super(`
            Message: ${message}
            Hint: ${hint}
        `);
    }
}
