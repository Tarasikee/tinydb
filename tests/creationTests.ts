import {userDocument, userModel} from "./userInitiale.ts"
import {faker, format, assertStrictEquals, assertThrows, assertObjectMatch} from "../deps/deps.ts"

export const creationTests = () => {
  return Deno.test("Creation tests", async (t) => {
    await t.step("Create user with all fields", () => {
      const user = userModel.create({
        name: faker.name.firstName(),
        birthday: format(faker.date.past(), "yyyy-MM-dd"),
        isAdmin: faker.random.boolean(),
        settings: {
          theme: faker.random.arrayElement(["light", "dark", "system"]),
          lang: faker.random.arrayElement(["en", "fr", "no", "de", "ua"])
        }
      } as unknown as userDocument)
      
      user.save()
      user.delete()
    })

    await t.step("Wait db to throw a non-unique name error message", () => {
      assertThrows(
        () => {
          const users = [...Array(800).keys()].map(() => userModel.create({
            name: faker.name.firstName(),
            birthday: format(faker.date.past(), "yyyy-MM-dd"),
            isAdmin: faker.random.boolean(),
            settings: {
              theme: faker.random.arrayElement(["light", "dark", "system"]),
              lang: faker.random.arrayElement(["en", "fr", "no", "de", "ua"])
            }
          } as unknown as userDocument))


          users.map(user => user.save())
        },
        Error,
        "Message: name must be unique"
      )
    })

    await t.step("Clear database", () => {
      const message = userModel.huntAll()
      assertStrictEquals("Successful absolute hunt!", message)
    })

    await t.step("User with invalid name type", () => {
      assertThrows(
        () => {
          const user = userModel.create({
            name: 123,
            birthday: format(faker.date.past(), "yyyy-MM-dd"),
            isAdmin: faker.random.boolean(),
            settings: {
              theme: faker.random.arrayElement(["light", "dark", "system"]),
              lang: faker.random.arrayElement(["en", "fr", "no", "de", "ua"])
            }
          } as unknown as userDocument)
          user.save()
        },
        Error,
        "Message: name must be string"
      )
    })

    await t.step("User with invalid birthday date type", () => {
      assertThrows(
        () => {
          const user = userModel.create({
            name: faker.name.firstName(),
            birthday: "123-12321",
            isAdmin: faker.random.boolean(),
            settings: {
              theme: faker.random.arrayElement(["light", "dark", "system"]),
              lang: faker.random.arrayElement(["en", "fr", "no", "de", "ua"])
            }
          } as unknown as userDocument)
          user.save()
        },
        Error,
        "Message: birthday must be date"
      )
    })

    await t.step("User with invalid isAdmin type", () => {
      assertThrows(
        () => {
          const user = userModel.create({
            name: faker.name.firstName(),
            birthday: format(faker.date.past(), "yyyy-MM-dd"),
            isAdmin: 123,
            settings: {
              theme: faker.random.arrayElement(["light", "dark", "system"]),
              lang: faker.random.arrayElement(["en", "fr", "no", "de", "ua"])
            }
          } as unknown as userDocument)
          user.save()
        },
        Error,
        "Message: isAdmin must be boolean"
      )
    })

    await t.step("User with invalid settings type", () => {
      assertThrows(
        () => {
          const user = userModel.create({
            name: faker.name.firstName(),
            birthday: format(faker.date.past(), "yyyy-MM-dd"),
            isAdmin: faker.random.boolean(),
            settings: []
          } as unknown as userDocument)
          user.save()
        },
        Error,
        "Message: settings must be json"
      )
    })

    await t.step("Creating user with custom `_id`", () => {
      const user = userModel.create({
        _id: "123",
        name: "John",
        birthday: "2000-01-29",
        isAdmin: true,
        settings: {
          theme: "darcula",
          lang: "ua"
        }
      } as unknown as userDocument)

      user.save()

      assertObjectMatch(
        userModel.findById("123").toJSON(),
        {
          _id: "123",
          name: "John",
          birthday: "2000-01-29",
          isAdmin: true,
          settings: {
            theme: "darcula",
            lang: "ua"
          }
        })

      user.delete()
    })

    await t.step("Creating user with unexpected settings", () => {
      const user = userModel.create({
        _id: "123",
        name: "John",
        birthday: "2000-01-29",
        isAdmin: true,
        settings: {
          theme: "light",
          lang: "no"
        }
      } as unknown as userDocument)

      user.save()

      assertThrows(() => {
          assertObjectMatch(
            userModel.findById("123").toJSON(),
            {
              _id: "123",
              name: "John",
              birthday: "2000-01-29",
              isAdmin: true,
              settings: {
                theme: "darcula",
                lang: "ua"
              }
            })
        },
        Error
      )
      
      user.delete()
    })
  })
}