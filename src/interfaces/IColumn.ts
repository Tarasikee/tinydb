export type OptionTypes = "string" | "number" | "boolean" | "date" | "json" | "array";

export interface ColumnProps {
    unique?: boolean;
    type?: OptionTypes;
    allowNull?: boolean;
    default?: any;
}

export interface ColumnRules {
    name: string;
    options: ColumnProps;
}
