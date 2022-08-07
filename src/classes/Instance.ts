import {ColumnsUtils, FileUtils, Schema} from "../mod.ts"

interface InstanceOptions {
  isNew: boolean
}

export class Instance<T extends { _id: string }> {
  constructor(private _schema: Schema,
              private _fields: T,
              private _options: InstanceOptions) {
  }

  set fields(value: T) {
    this._fields = value
  }

  get fields(): T {
    return this._fields
  }

  public delete() {
    const db = FileUtils.readJson<T>("./database/db.json")
    const filteredTable = db[this._schema.name].filter(row => row._id !== this._fields._id)
    
    FileUtils.writeJson("./database/db.json", {
      ...db,
      [this._schema.name]: filteredTable
    })
  }

  public save() {
    const db = FileUtils.readJson<T>("./database/db.json")

    if (!this._options.isNew) {
      const filteredTable = db[this._schema.name]
        .filter(row => row._id !== this._fields._id)

      new ColumnsUtils(this._schema.columns, filteredTable, this._fields)
      filteredTable.push(this._fields)
      FileUtils.writeJson("./database/db.json", {
          ...db,
          [this._schema.name]: filteredTable
        }
      )
    } else {
      const table = db[this._schema.name] ?? []

      new ColumnsUtils(this._schema.columns, table, this._fields)
      table.push({...this._fields, _id: crypto.randomUUID()})
      FileUtils.writeJson("./database/db.json", {
          ...db,
          [this._schema.name]: table
        }
      )
    }
  }
}
