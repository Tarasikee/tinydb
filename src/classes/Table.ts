import {FileUtils} from "../mod.ts"

export class Table {
    public static init(name: string, dir_url: string) {
        const url = `${dir_url}${name}.json`

        try {
            const isExists = FileUtils.isFileExists(url)

            if (isExists) {
                return this
            }

            FileUtils.createOrCheckDir(dir_url)
            FileUtils.writeJson(url, [])
            return this
        } catch (e) {
            console.error(e.message)
        }
    }

    public static nuke(name: string, dir_url: string) {
        const url = `${dir_url}${name}.json`

        try {
            FileUtils.writeJson(url, [])
            return "Nuke'em"
        } catch (e) {
            console.error(e.message)
        }
    }
}
