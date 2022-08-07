import {Schema, Instance} from "./mod.ts"
import {FileUtils, ObjectUtils} from "./utils/mod.ts"

export class Model<T extends { _id: string }> {
    constructor(
        private schema: Schema
    ) {
    }

    public create(args: T) {
        return new Instance(this.schema, args, {isNew: true})
    }

    public findById(_id: string) {
        const db = FileUtils.readJson<T>("./database/db.json")
        const table = db[this.schema.name] ?? []
        const candidate = table.find(row => row._id === _id)

        if (candidate === undefined) {
            throw new Error("No record found")
        }

        return new Instance<T>(this.schema, candidate, {
            isNew: false
        })
    }

    public find(args: Partial<T>) {
        const db = FileUtils.readJson<T>("./database/db.json")
        const table = db[this.schema.name] ?? []
        const keys = Object.keys(args) as unknown as Array<keyof T>

        const filtered_table = table.filter(row =>
            keys.every(key =>
                ObjectUtils.nestedCheck(row, key, args[key])))

        return filtered_table.map(row => new Instance<T>(this.schema, row, {
            isNew: false
        }))
    }

    public findOne(args: Partial<T>) {
        return this.find(args)[0]
    }

    public findAll() {
        const db = FileUtils.readJson<T>("./database/db.json")
        return db[this.schema.name].map(row => new Instance<T>(this.schema, row, {
            isNew: false
        }))
    }
}
