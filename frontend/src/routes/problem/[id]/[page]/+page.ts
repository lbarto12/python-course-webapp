import { fetchAsync } from '$lib/services/fetch-service.js';


/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let id: string = params.id.split("_").join(" ");
    let idx: number = parseInt(params.page);

    console.log(id, idx);


    let problem = await fetchAsync(fetch, "POST", `/units/get`, {
        id
    });

    console.log(problem);

    let page: any = problem.pages[idx];
    let num_pages: number = problem.pages.length;

    // let submissions = await fetchAsync("GET", `/submissions/${id}`);

    return {
        id,
        problem,
        page,
        current_page: idx,
        num_pages,
        completed: page.completed,
        fetch
        // submissions,
    };
}