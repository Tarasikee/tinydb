import {Application, Context, HttpException} from "https://deno.land/x/abc@v1.3.3/mod.ts"
import { logger } from "https://deno.land/x/abc@v1.3.3/middleware/logger.ts";
import {userDocument, userModel} from "./models/user.model.ts"
import {Status} from "https://deno.land/std@0.152.0/http/http_status.ts"

const app = new Application()
app.use(logger());

const findAll = (ctx: Context) => {
    const users = userModel.findAll()
    ctx.json(users)
}

const create = async (ctx: Context) => {
    try {
        const body = await ctx.body
        const user = userModel.create(body as userDocument)
        user.save()
        ctx.json(user.toJSON())
    } catch (error) {
        throw new HttpException(
            {
                status: Status.BadRequest,
                error: error.message
            },
            Status.BadRequest
        )
    }
}

app
    .get("/users", findAll)
    // .get("/users/:id", findOne)
    .post("/users", create)
    // .delete("/users/:id", deleteOne)
    .start({port: 8080})
