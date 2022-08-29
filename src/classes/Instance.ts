import {ColumnsUtils, FileUtils, Schema} from "../mod.ts"

interface InstanceOptions {
    isNew: boolean
}

export class Instance<T extends { _id: string }> {
    constructor(private _schema: Schema,
                private _fields: T,
                private _options: InstanceOptions
    ) {
    }

    set fields(value: T) {
        this._fields = value
    }

    get fields(): T {
        return this._fields
    }

    private getTable(): T[] {
        const url = `./database/${this._schema.name}.json`
        return FileUtils.readJson<T>(url)
    }

    private writeTable(table: T[]) {
        const url = `./database/${this._schema.name}.json`
        FileUtils.writeJson(url, [...table])
    }

    public toJSON(): T {
        return this._fields
    }

    public delete() {
        const filteredTable = this
            .getTable()
            .filter(row => row._id !== this._fields._id)

        this.writeTable([...filteredTable])
    }

    public save() {
        const table = this.getTable()

        if (this._options.isNew) {
            const _id = this._fields._id || crypto.randomUUID()

            new ColumnsUtils(this._schema.columns, table, this._fields)
            table.push({...this._fields, _id})
            this._fields._id = _id

            this.writeTable([...table])
        } else {
            const filteredTable = table.filter(row => row._id !== this._fields._id)
            new ColumnsUtils(this._schema.columns, filteredTable, this._fields)
            filteredTable.push(this._fields)

            this.writeTable([...filteredTable])
        }

        return this
    }
}
