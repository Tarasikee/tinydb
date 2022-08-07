import {Table} from "../classes/mod.ts"

export function TinyTable(name: string) {

  // deno-lint-ignore no-explicit-any
  return function <T extends { new(...args: any[]): Record<string, any> }>(Constructor: T) {
    return class extends Constructor {
      _table_name: string = name
      _id!: string

      // deno-lint-ignore no-explicit-any
      constructor(...args: any[]) {
        super(...args)
        Table.init(name)
      }
    }
  }
}
