import {userModel, userDocument} from "./userInitiale.ts"

import {faker, format} from "../deps/deps.ts"


const users = [...Array(500).keys()].map(() => userModel.create({
  name: faker.name.firstName() + " " + faker.name.lastName(),
  birthday: format(faker.date.past(), "yyyy-MM-dd"),
  isAdmin: faker.random.boolean(),
  settings: {
    theme: faker.random.arrayElement(["light", "dark"]),
    lang: faker.random.arrayElement(["en", "fr"])
  }
} as unknown as userDocument))

users.map(user => user.save())

// const candidates = userModel.find({
//     settings: {
//         theme: {
//             night: {
//                 second: {
//                     background: {
//                         r: 2,
//                         b: 1
//                     }
//                 }
//             }
//         }
//     }
// })
// console.log(candidates)

// const users = userModel.findAll()
// users.map(user => {
//     user.fields.settings = {
//         theme: "darcula",
//         lang: "en"
//     }
//
//     user.fields.isAdmin = false
//
//     user.save()
// })

