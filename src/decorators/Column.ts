import {Reflect} from "https://deno.land/x/reflect_metadata@v0.1.12/mod.ts";
import {ColumnProps} from "../interfaces/IColumn.ts";

const formatMetadataKey = Symbol("columns");

export function getFormat(target: unknown, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

export function Column(options: ColumnProps) {
    const optionsProxy = options.allowNull === undefined
        ? {...options, allowNull: false}
        : {...options, allowNull: true};

    return Reflect.metadata(formatMetadataKey, optionsProxy);
}
