import { fetchAsync } from "$lib/services/fetch-service";
import { Profile } from "$lib/services/profile-service";
import { Stats } from "$lib/services/stats-service";

/** @type {import('./$types').PageLoad} */
export async function load() {

    let completion: any = await Stats.getCompletion();
    let next: any = await Stats.getNextLesson();
    let problems: any = Stats.getUnits();


    let name: string = await Profile.getUserName();


    return {
        problems,
        completion,
        next,
        name,
    };

}