import {userModel} from "./userInitiale.ts"
import {faker, assertStrictEquals, format} from "../deps/deps.ts"

export const findingTests = () => {
    return Deno.test("Finding tests", async (t) => {
        await t.step("Create 10 users for testing purposes", () => {
            const users = [...Array(10).keys()].map(() => userModel.create({
                name: faker.name.firstName(),
                birthday: format(faker.date.past(), "yyyy-MM-dd"),
                isAdmin: faker.random.boolean(),
                settings: {
                    theme: faker.random.arrayElement(["light", "dark", "system"]),
                    lang: faker.random.arrayElement(["en", "fr"]),
                    test: 1,
                    nestedThing: {
                        first: 1,
                        moreNesting: {
                            second: 2,
                            third: 3,
                            MuchMoreNesting: {
                                fourth: 4,
                                more: true
                            }
                        }
                    }
                }
            }))
            users.map(user => user.save())
        })

        await t.step("Find all users", () => {
            const users = userModel.findAll()
            assertStrictEquals(users.length, 10)
        })

        await t.step("Find one or first user", () => {
            const user = userModel.findOne({settings: {test: 1}})
            assertStrictEquals(user.toJSON().settings.test, 1)
        })

        await t.step("Find users with nested searching 1", () => {
            const users = userModel.find({
                settings: {
                    lang: "en",
                    nestedThing: {
                        first: 1,
                        moreNesting: {
                            second: 2,
                            third: 5,
                            MuchMoreNesting: {
                                fourth: 4
                            }
                        }
                    }
                }
            })
            assertStrictEquals(users.length, 0)
        })

        await t.step("Find users with nested searching 2", () => {
            const users = userModel.find({
                settings: {
                    lang: "en",
                    nestedThing: {
                        first: 1,
                        moreNesting: {
                            second: 2,
                            third: 3,
                            MuchMoreNesting: {
                                fourth: 5
                            }
                        }
                    }
                }
            })
            assertStrictEquals(users.length, 0)
        })


        await t.step("Find users with nested searching 3", () => {
            const users = userModel.find({
                settings: {
                    lang: "en",
                    nestedThing: {
                        first: 1,
                        moreNesting: {
                            second: 2,
                            third: 3,
                            MuchMoreNesting: {
                                fourth: 5
                            }
                        }
                    }
                }
            })
            assertStrictEquals(users.length, 0)
        })

        await t.step("Find users with nested searching 4", () => {
            const users = userModel.find({
                settings: {
                    test: 1,
                    nestedThing: {
                        moreNesting: {
                            MuchMoreNesting: {
                                fourth: 4,
                                more: true
                            }
                        }
                    }
                }
            })

            assertStrictEquals(users.length, 10)
        })

        await t.step("Failed to find users with nested searching 1", () => {
            const users = userModel.find({
                settings: {
                    test: 1,
                    nestedThing: {
                        moreNesting: {
                            MuchMoreNesting: {
                                fourth: 4,
                                more: false
                            }
                        }
                    }
                }
            })

            assertStrictEquals(users.length, 0)
        })

        await t.step("Failed to find users with nested searching 2", () => {
            const users = userModel.find({
                settings: {
                    test: 2,
                    nestedThing: {
                        moreNesting: {
                            MuchMoreNesting: {
                                fourth: 4,
                                more: true
                            }
                        }
                    }
                }
            })

            assertStrictEquals(users.length, 0)
        })

        await t.step("Clear DB", () => {
            const message = userModel.huntAll()
            assertStrictEquals("Successful absolute hunt!", message)
        })
    })
}
