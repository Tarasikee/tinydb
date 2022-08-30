import {TinyTable, Schema, Column, Model, Document} from "../../../src/mod.ts"

@TinyTable({
    name: "users",
    url: "database/example1/"
})
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

