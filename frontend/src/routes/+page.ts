import { fetchAsync } from "$lib/services/fetch-service";


/** @type {import('./$types').PageLoad} */
export async function load() {

    let name: string = await fetchAsync("GET", "/user/name");

    if (name !== "") {
        return {
            redirect: "/dashboard"
        }
    }


    return {};
} 