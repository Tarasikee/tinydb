import {ensureDirSync} from "../../deps/deps.ts"

export class FileUtils {
  static writeJson<T>(path: string, data: Record<string, unknown> | Array<T | never>): string {
    try {
      Deno.writeTextFileSync(path, JSON.stringify(data))
      return "Written to " + path
    } catch (e) {
      return e.message
    }
  }

  static isFileExists(path: string): boolean {
    try {
      Deno.statSync(path)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static createOrCheckDir(path: string): string {
    try {
      ensureDirSync(path)
      return "Created directory " + path
    } catch (e) {
      return e.message
    }
  }

  static readJson<T>(path: string): Array<T> {
    try {
      const data = Deno.readTextFileSync(path)
      return JSON.parse(data)
    } catch (_e) {
      return []
    }
  }
}
