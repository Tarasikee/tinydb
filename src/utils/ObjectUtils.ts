export class ObjectUtils {
    // deno-lint-ignore no-explicit-any
    static nestedCheck<T extends Record<string, any>>(obj: T, key: keyof T, value: any): boolean {
        if (obj[key] === value) {
            return obj[key] === value
        } else {
            return Object
                .keys(value)
                .every(inner_key => {
                    if (
                        typeof obj[key][inner_key] === "object" &&
                        !Array.isArray(obj[key][inner_key]) &&
                        obj[key][inner_key] !== null
                    ) {
                        return this.nestedCheck(obj[key], inner_key, value[inner_key])
                    }

                    return obj[key][inner_key] === value[inner_key]
                })
        }
    }
}
