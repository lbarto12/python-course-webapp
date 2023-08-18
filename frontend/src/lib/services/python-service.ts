import { fetchAsync } from "./fetch-service";

export class Python {
    public static async run(fetchpage: any, code: string): Promise<any> {
        let res = await fetchAsync(fetchpage, "POST", "/run", {
            code
        });
        return res;
    };

    public static async submit(fetchpage: any, unit: string, page: number, code: string): Promise<any> {
        let res = await fetchAsync(fetchpage, "POST", "/submit", {
            code,
            unit,
            page
        });
        return res;
    };
}