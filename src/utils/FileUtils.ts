import { ensureDir } from "https://deno.land/std@0.78.0/fs/mod.ts";

export class FileUtils {
    static writeJson<T>(path: string, data: Record<string, unknown> | Array<T | never>): string {
        try {
            Deno.writeTextFileSync(path, JSON.stringify(data));
            return "Written to " + path;
        } catch (e) {
            return e.message;
        }
    }

    static async isFileExists(path: string): Promise<boolean> {
        try {
            await Deno.stat(path);
            return true;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    static async createOrCheckDir(path: string): Promise<string> {
        try {
            await ensureDir(path);
            return "Created directory " + path;
        } catch (e) {
            return e.message;
        }
    }

    static readJson<T>(path: string): Record<string, Array<T>> {
        try {
            const data = Deno.readTextFileSync(path);
            return JSON.parse(data);
        } catch (_e) {
            return {};
        }
    }
}
