import {Schema, Instance, FileUtils, ObjectUtils} from "../mod.ts"

export class Model<T extends { _id: string }> {
  constructor(
    private schema: Schema
  ) {
  }

  private getTable(): T[] {
    const db = FileUtils.readJson<T>("./database/db.json")
    return db[this.schema.name] ?? []
  }


  // Creators

  public create(args: T) {
    return new Instance(this.schema, args, {isNew: true})
  }

  // Finders

  public findById(_id: string) {
    const table = this.getTable()
    const candidate = table.find(row => row._id === _id)

    if (candidate === undefined) {
      throw new Error("No record found")
    }

    return new Instance<T>(this.schema, candidate, {
      isNew: false
    })
  }

  public find(args: Partial<T>) {
    const table = this.getTable()
    const keys = Object.keys(args) as unknown as Array<keyof T>

    return table
      .filter(row => keys.every(key => ObjectUtils.nestedCheck(row, key, args[key])))
      .map(row => new Instance<T>(this.schema, row, {isNew: false}))
  }

  public findOne(args: Partial<T>) {
    return this.find(args)[0]
  }

  public findAll() {
    return this
      .getTable()
      .map(row => new Instance<T>(this.schema, row, {isNew: false}))
  }

  // Hunters
  public hunt(args: Partial<T>) {
    this.find(args).map(instance => instance.delete())
    return "Successful hunt!"
  }

  public huntOne(args: Partial<T>) {
    this.findOne(args).delete()
    return "Successful single hunt!"
  }
  
  public huntAll() {
    this.findAll().map(instance => instance.delete())
    return "Successful absolute hunt!"
  }
}
