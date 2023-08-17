import { fetchAsync } from "./fetch-service";


export class Stats {
    public static async setComplete(unit: string, page: number): Promise<any> {
        let res = await fetchAsync("POST", "/units/page/complete", {
            unit,
            page
        });
        return res;
    };
    
    public static async getCompletion(): Promise<any> {
        let res: any = await fetchAsync("GET", "/user/stats/completion");
        return res;
    };

    public static async getNextLesson(): Promise<any> {
        let res: any = await fetchAsync("GET", "/user/stats/nextlesson");
        return res;
    }

    public static async getUnits(): Promise<any> {
        let res: any = await fetchAsync("GET", "/units/list");
        return res;
    }
}