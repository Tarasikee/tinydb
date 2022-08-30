import {Table} from "../classes/mod.ts"

interface Props {
    name: string
    url: string
}

export function TinyTable({name, url}: Props) {

    // deno-lint-ignore no-explicit-any
    return function <T extends { new(...args: any[]): Record<string, any> }>(Constructor: T) {
        return class extends Constructor {
            _tableName: string = name
            _dir_url: string = url
            _id!: string

            // deno-lint-ignore no-explicit-any
            constructor(...args: any[]) {
                super(...args)
                Table.init(name, url)
            }
        }
    }
}
