import { fetchAsync } from "./fetch-service";


export class Stats {
    public static async setComplete(pagefetch: any, unit: string, page: number): Promise<any> {
        let res = await fetchAsync(pagefetch, "POST", "/units/page/complete", {
            unit,
            page
        });
        return res;
    };
    
    public static async getCompletion(pagefetch: any, ): Promise<any> {
        let res: any = await fetchAsync(pagefetch, "GET", "/user/stats/completion");
        return res;
    };

    public static async getNextLesson(pagefetch: any, ): Promise<any> {
        let res: any = await fetchAsync(pagefetch, "GET", "/user/stats/nextlesson");
        return res;
    }

    public static async getUnits(pagefetch: any, ): Promise<any> {
        let res: any = await fetchAsync(pagefetch, "GET", "/units/list");
        return res;
    }
}