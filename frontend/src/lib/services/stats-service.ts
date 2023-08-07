import { fetchAsync } from "./fetch-service";


export class Stats {
    public static async setComplete(unit: string, page: number): Promise<any> {
        let res = await fetchAsync("POST", "/units/page/complete", {
            unit,
            page
        });
        return res;
    };
}