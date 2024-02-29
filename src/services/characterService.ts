import { getApiUrl } from "../apiConfig"

export const getCharacters = (limitNumber: Number) => {

    const apiUrl = getApiUrl('public/characters');
    return fetch(`${apiUrl}&limit=${limitNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}