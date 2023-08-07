import { fetchAsync } from '$lib/services/fetch-service.js';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let id: string = params.id.split("_").join(" ");
    let idx: number = parseInt(params.page);

    let problem = await fetchAsync("POST", `/units/get`, {
        id
    });


    let page: any = problem.pages[idx];
    let num_pages: number = problem.pages.length;

    // let submissions = await fetchAsync("GET", `/submissions/${id}`);

    console.log(page)

    return {
        id,
        problem,
        page,
        current_page: idx,
        num_pages,
        completed: page.completed,
        // submissions,
    };
}