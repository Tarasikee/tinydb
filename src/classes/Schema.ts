import {ColumnRules, getFormat} from "../mod.ts"

export class Schema {
    constructor(
        private _name: string = "",
        private _url: string = "",
        private _columns: ColumnRules[] = []
    ) {
    }

    get name(): string {
        return this._name
    }

    get url(): string {
        return this._url
    }

    get columns(): ColumnRules[] {
        return this._columns
    }

    // deno-lint-ignore no-explicit-any
    public static initializeSchema<T extends { new(...args: any[]): any }>(args: T) {
        const instance = new args()
        const options = Object.keys(instance)
            .filter(key => key[0] !== "_")
            .map(key => ({name: key, options: getFormat(instance, key)}))

        return new Schema(instance["_tableName"], instance["_dir_url"], [...options, {
            name: "_id", options: {type: "string", unique: true}
        }])
    }
}
