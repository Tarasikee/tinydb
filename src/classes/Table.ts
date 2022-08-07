import {FileUtils} from "../mod.ts"

export class Table {
    public static init(name: string) {
        try {
            const isExists = FileUtils.isFileExists("./database/db.json")

            if (isExists) {
                return this
            }

            FileUtils.createOrCheckDir("./database")
            FileUtils.writeJson("./database/db.json", {[name]: []})
            return this
        } catch (e) {
            console.error(e.message)
        }
    }

    public static nuke(name: string) {
        try {
            FileUtils.writeJson("./database/db.json", {[name]: []})
            return 'Nuke\'em'
        } catch (e) {
            console.error(e.message)
        }
    }
}
