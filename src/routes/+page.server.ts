import type {PageServerLoad} from "../../.svelte-kit/types/src/routes/$types";

import {error} from '@sveltejs/kit';
import { CLIENT_ID } from '$env/static/private';
import { CLIENT_SECRET} from '$env/static/private';

export const load: PageServerLoad = async ({params, url}: any) => {

    const res = await fetch('https://api.petfinder.com/v2/oauth2/token',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    });

    const data = await res.json();
    let access_token = data.access_token;
    
    const location= '94709'
    const res2 = await fetch(`https://api.petfinder.com/v2/animals?location=${location}&limit=20`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    const data2 = await res2.json();
    if (!data2.animals) {
        throw error(404, 'Noooo, Animals not found');
    }
    return {
        animals: data2.animals,}
}