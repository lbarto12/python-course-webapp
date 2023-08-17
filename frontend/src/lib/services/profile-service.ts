
import { fetchAsync } from "./fetch-service";

export class Profile {

    public static async getUserName(): Promise<any> {
        let res: string = await fetchAsync("GET", "/user/name");
        return res;
    }

    public static async setUserName(name: string): Promise<string>{
        let res: string = await fetchAsync("POST", "/user/name", {
            name
        });

        return res;
    }
}