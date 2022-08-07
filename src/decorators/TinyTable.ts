import {Table} from "../Table.ts";

export function TinyTable(name: string) {
    return function<T extends { new(...args: any[]): Record<string, any> }>(Constructor: T) {
        return class extends Constructor {
            _table_name: string = name;
            _id!: string;

            constructor(...args: any[]) {
                super(...args);
                Table.init(name);
            }
        }
    }
}
