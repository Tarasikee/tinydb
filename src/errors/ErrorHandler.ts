export function ErrorHandler(error: Error) {
    let message, hint

    try {
        message = JSON.parse(error.message).message
        hint = JSON.parse(error.message).hint
    } catch (e) {
        message = error.message
        hint = "No hint provided"
    }

    return {
        message, hint
    }
}
