import { Environment } from "$lib/environment";

export async function fetchAsync(method: string, endpoint: string, body?: any) {
    
    const SERVER_IP = Environment.serverIp;
    console.log(SERVER_IP + endpoint);

    const response = await fetch((SERVER_IP || "") + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}


