import {ColumnRules, getFormat} from "../mod.ts"

export class Schema {
  constructor(
    private _name: string = "",
    private _columns: ColumnRules[] = []
  ) {
  }

  get name(): string {
    return this._name
  }

  get columns(): ColumnRules[] {
    return this._columns
  }

  // deno-lint-ignore no-explicit-any
  public static initializeSchema<T extends { new(...args: any[]): any }>(args: T) {
    const instance = new args()

    const keys = Object.keys(instance).filter(key => key !== "_table_name" && key !== "_id")
    const options = keys.map(key => ({
      name: key, options: getFormat(instance, key)
    }))

    return new Schema(instance["_table_name"], options)
  }
}
