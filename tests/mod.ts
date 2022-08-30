import {creationTests} from "./creationTests.ts"
import {findingTests} from "./findingTests.ts"
import {clearDB} from "./utils.ts"

creationTests()
clearDB()
findingTests()
clearDB()
