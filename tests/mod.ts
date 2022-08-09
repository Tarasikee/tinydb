import {userDocument, userModel} from "./userInitiale.ts"

import {faker, format, assertThrows} from "../deps/deps.ts"


Deno.test("database", () => {
  assertThrows(
    () => {
      const users = [...Array(1300).keys()].map(() => userModel.create({
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
  );
})