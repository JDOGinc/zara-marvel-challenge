import { getApiUrl } from "../apiConfig"
import { ComicDto } from "../types/responseDto"

export const getCharacters = (limitNumber: number, name: string) => {

    const apiUrl = getApiUrl('public/characters');
    const nameStartsWith = name === '' ? '' : `&nameStartsWith=${name}`;
    return fetch(`${apiUrl}&limit=${limitNumber}${nameStartsWith}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const getComicsByCharacter = (characterId: string) => {

    const apiUrl = getApiUrl(`public/characters/${characterId}/comics?orderBy=onsaleDate&limit=20`);
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json() as Promise<{ data: { results: [ComicDto] } }>);
}

