export class ObjectUtils {
    static nestedCheck<T extends Record<string, any>>(obj: T, key: keyof T, value: any): boolean {

        if (typeof obj[key] === "boolean" && typeof value === "boolean") {
            return obj[key] === value
        }

        if (obj[key] === value) {
            return true
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
