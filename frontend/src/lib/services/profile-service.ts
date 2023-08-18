
import { fetchAsync } from "./fetch-service";

export class Profile {

    public static async getUserName(pagefetch: any): Promise<any> {
        let res: string = await fetchAsync(pagefetch, "GET", "/user/name");
        return res;
    }

    public static async setUserName(pagefetch: any, name: string): Promise<string>{
        let res: string = await fetchAsync(pagefetch, "POST", "/user/name", {
            name
        });

        return res;
    }
}