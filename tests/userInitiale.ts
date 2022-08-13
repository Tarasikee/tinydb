import {Column, Document, Model, Schema, TinyTable} from "../tinydb.ts"

@TinyTable("users")
class User {
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

export type userDocument = User & Document

const userSchema = Schema.initializeSchema(User)
export const userModel = new Model<userDocument>(userSchema)
