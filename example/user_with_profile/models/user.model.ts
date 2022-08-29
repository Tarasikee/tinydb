import {TinyTable, Schema, Column, Model, Document} from "https://deno.land/x/tinydb@v2.0.1/src/mod.ts"

@TinyTable("users")
class User {
    @Column({
        type: "string",
        unique: true
    })
    name!: string

    @Column({
        type: "boolean",
        default: false,
        allowNull: true
    })
    isAdmin!: boolean
}

export type userDocument = User & Document

const userSchema = Schema.initializeSchema(User)
export const userModel = new Model<userDocument>(userSchema)

