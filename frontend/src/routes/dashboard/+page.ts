import { fetchAsync } from "$lib/services/fetch-service";
import { Profile } from "$lib/services/profile-service";
import { Stats } from "$lib/services/stats-service";

/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {

    let completion: any = await Stats.getCompletion(fetch);
    let next: any = await Stats.getNextLesson(fetch);
    let problems: any = Stats.getUnits(fetch);


    let name: string = await Profile.getUserName(fetch);


    return {
        problems,
        completion,
        next,
        name,
    };

}