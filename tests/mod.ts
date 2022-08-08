import {userDocument, userModel} from "./userInitiale.ts"

import {faker, format} from "../deps/deps.ts"
import TestContext = Deno.TestContext

Deno.test("database", async (t: TestContext) => {
  await t.step("Create users using userModel, skipping types check with `as` keyword",
    () => {
      const users = [...Array(200).keys()].map(() => userModel.create({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        birthday: format(faker.date.past(), "yyyy-MM-dd"),
        isAdmin: faker.random.boolean(),
        settings: {
          theme: faker.random.arrayElement(["light", "dark", "system"]),
          lang: faker.random.arrayElement(["en", "fr", "no", "de", "ua"])
        }
      } as unknown as userDocument))


      users.map(user => user.save())
    }
  )
})