import {TinyTable, Schema, Column, Model, Document} from "https://deno.land/x/tinydb@v2.0.1/src/mod.ts"

@TinyTable("users")
class Profile {
    @Column({
        type: "string",
        unique: true
    })
    name!: string

    @Column({
        type: "date"
    })
    birthday!: string

    @Column({
        type: "boolean",
        default: false,
        allowNull: true
    })
    isAdmin!: boolean

    @Column({
        allowNull: true,
        type: "json",
        default: {
            theme: "light",
            lang: "en"
        }
    })
    settings!: Record<string, unknown>
}

export type profileDocument = Profile & Document

const profileSchema = Schema.initializeSchema(Profile)
export const profileModel = new Model<profileDocument>(profileSchema)

