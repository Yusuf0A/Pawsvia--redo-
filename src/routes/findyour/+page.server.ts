import {error} from '@sveltejs/kit';
import { CLIENT_ID } from '$env/static/private';
import { CLIENT_SECRET} from '$env/static/private';

export const actions = {
    findyour: async ({request}) => {
        const formData = await request.formData();
        const res = await fetch('https://api.petfinder.com/v2/oauth2/token',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        });
    
        const data = await res.json();
        let access_token = data.access_token;
        let filters ="" 

        formData.forEach ((value, key) => {
            filters += `${key}=${value}&`
        })

        const limit = 10 

        const res2 = await fetch(`https://api.petfinder.com/v2/animals?${filters}limit=${limit}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const data2 = await res2.json();
        
        if (!data2.animals) {
            throw error(404, 'Noooo, Animals not found');
        }
        return {
            animals: data2.animals
        }

    }
}