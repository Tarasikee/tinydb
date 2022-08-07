import {FileUtils} from "./utils/mod.ts";

export class Table {
    public static async init(name: string) {
        try {
            const isExists = await FileUtils.isFileExists("./database/db.json");

            if (isExists) {
                return this;
            }

            await FileUtils.createOrCheckDir("./database");
            await FileUtils.writeJson("./database/db.json", {[name]: []});
            return this;
        } catch (e) {
            console.error(e.message);
        }
    }

    public static async nuke(name: string) {
        try {
            await FileUtils.writeJson("./database/db.json", {[name]: []});
            return this;
        } catch (e) {
            console.error(e.message);
        }
    }
}
