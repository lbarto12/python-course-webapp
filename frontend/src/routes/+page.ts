import { fetchAsync } from "$lib/services/fetch-service";


/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {

    let name: string = await fetchAsync(fetch, "GET", "/user/name");

    if (name !== "") {
        return {
            redirect: "/dashboard"
        }
    }


    return {};
} 