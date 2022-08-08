import {FileUtils} from "../mod.ts"

export class Table {
  public static init(name: string) {
    const url = `./database/${name}.json`

    try {
      const isExists = FileUtils.isFileExists(url)

      if (isExists) {
        return this
      }

      FileUtils.createOrCheckDir("./database")
      FileUtils.writeJson(url, [])
      return this
    } catch (e) {
      console.error(e.message)
    }
  }

  public static nuke(name: string) {
    const url = `./database/${name}.json`

    try {
      FileUtils.writeJson(url, [])
      return "Nuke'em"
    } catch (e) {
      console.error(e.message)
    }
  }
}
