import { fetchAsync } from "$lib/services/fetch-service";

/** @type {import('./$types').PageLoad} */
export async function load() {

    let problems: Array<any> = await fetchAsync("GET", "/units/list");
    let stats: any = await fetchAsync("GET", "/user/stats");
    let name: string = await fetchAsync("GET", "/user/name");

    let num_completed: number = 0;
    let num_problems: number = 0;

    for (let problem of Object.values(problems)) {
        let num_unit_completed: number = 0;
        for (let page of problem.pages) {
            if (page.completed) {
                num_completed++;
                num_unit_completed++;
            }
            num_problems++;
        }
        problem.num_completed = num_unit_completed;
        problem.completed = num_unit_completed == problem.pages.length;
    }

    stats.completed = num_completed;
    stats.total = num_problems;

    return {
        problems,
        stats,
        name,
    };

}