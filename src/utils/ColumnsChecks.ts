import {ColumnRules, OptionTypes} from "../interfaces/mod.ts"
import {ErrorWithHint, ErrorWithMessage} from "../errors/mod.ts"

export class ColumnsChecks<T> {
    constructor(
        private columnRules: ColumnRules[] = [],
        private table: Array<T> = [],
        private record: T
    ) {
        this.run()
    }

    private checkType(value: T[keyof T], columnName: string, checkType?: OptionTypes) {
        const valueType = typeof value

        if (checkType === "date") {
            try {
                return new Date(String(value)).toISOString()
            } catch (_) {
                throw new ErrorWithMessage(`${columnName} must be date`)
            }
        }

        if (checkType === "array") {
            if (!Array.isArray(value)) throw new ErrorWithMessage(`${columnName} must be array`)
            return
        }

        if (checkType === "json") {
            if (typeof value === "object" && !Array.isArray(value) && value !== null) return
            throw new ErrorWithMessage(`${columnName} must be json`)
        }

        if (valueType !== checkType) {
            throw new ErrorWithMessage(`${columnName} must be ${checkType}`)
        }
    }

    private unique(column: ColumnRules) {
        const name = column.name as keyof T

        if (this.table.some(row => row[name] === this.record[name])) {
            throw new ErrorWithHint(
                `${String(name)} must be unique`,
                `${this.record[name]} is already exists`
            )
        }
    }

    private type(column: ColumnRules) {
        const name = column.name as keyof T
        const value = this.record[name]
        return this.checkType(value, String(name), column.options.type)
    }

    private default(column: ColumnRules) {
        const name = column.name as keyof T
        this.record[name] = column.options.default
    }

    private run() {
        this.columnRules.map(rule => {
            if (rule.options.allowNull &&
                this.record[rule.name as keyof T] === undefined &&
                rule.options.default === undefined) return


            if (
                rule.options.default !== undefined &&
                this.record[rule.name as keyof T] === undefined) this.default(rule)

            rule.options.type !== undefined && this.type(rule)
            rule.options.unique !== undefined && this.unique(rule)
        })
    }
}
