import { fetchAsync } from "./fetch-service";

export class Python {
    public static async run(code: string): Promise<any> {
        let res = await fetchAsync("POST", "/run", {
            code
        });
        return res;
    };

    public static async submit(unit: string, page: number, code: string): Promise<any> {
        let res = await fetchAsync("POST", "/submit", {
            code,
            unit,
            page
        });
        return res;
    };
}