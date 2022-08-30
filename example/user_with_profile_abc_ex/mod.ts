import {Application, Context, HttpException} from "https://deno.land/x/abc@v1.3.3/mod.ts"
import {logger} from "https://deno.land/x/abc@v1.3.3/middleware/logger.ts"
import {userDocument, userModel} from "./models/user.model.ts"
import {Status} from "https://deno.land/std@0.152.0/http/http_status.ts"
import {ErrorHandler} from "../../src/errors/ErrorHandler.ts"

const app = new Application()
app.use(logger())

const findAll = (ctx: Context) => {
    const users = userModel.findAll()
    ctx.json(users)
}

const create = async (ctx: Context) => {
    try {
        const body = await ctx.body
        const user = userModel.create(body as userDocument)
        user.save()
        ctx.json(user.toJSON(), Status.Created)
    } catch (error) {
        const {message, hint} = ErrorHandler(error)

        throw new HttpException(
            {
                status: Status.BadRequest,
                error: {message, hint}
            },
            Status.BadRequest
        )
    }
}

const findOne = (ctx: Context) => {
    const {id} = ctx.params
    const user = userModel.findById(id)
    ctx.json(user)
}

const deleteOne = (ctx: Context) => {
    const {id} = ctx.params
    const message = userModel.huntById(id)
    ctx.json({message})
}

app
    .get("/users", findAll)
    .get("/users/:id", findOne)
    .post("/users", create)
    .delete("/users/:id", deleteOne)
    .start({port: 8080})
