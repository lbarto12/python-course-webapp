import { fetchAsync } from "$lib/services/fetch-service";

/** @type {import('./$types').PageLoad} */
export async function load() {

    let completion: any = await fetchAsync("GET", "/user/stats/completion");
    let next: any = await fetchAsync("GET", "/user/stats/nextlesson");
    let problems: any = await fetchAsync("GET", "/units/list");

    console.log(completion);
    console.log(next);


    let name: string = await fetchAsync("GET", "/user/name");


    return {
        problems,
        completion,
        next,
        name,
    };

}