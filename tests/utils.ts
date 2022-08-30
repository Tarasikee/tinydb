import {Table} from "../src/classes/Table.ts"

export const clearDB = () => {
    return Deno.test("Clear DB", async (t) => {
        await t.step("Nuke em:)", () => {
            Table.nuke("users", "database/test/")
        })
    })
}
