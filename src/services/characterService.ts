import { getApiUrl } from "../apiConfig"
import { ComicDto } from "../types/responseDto"

export const getCharacters = (limitNumber: number) => {

    const apiUrl = getApiUrl('public/characters');
    return fetch(`${apiUrl}&limit=${limitNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const getCharactersByName = (limitNumber: number, name: string) => {

    const apiUrl = getApiUrl('public/characters');
    return fetch(`${apiUrl}&limit=${limitNumber}&nameStartsWith=${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const getComicsByCharacter = (characterId: string) => {

    const apiUrl = getApiUrl(`public/characters/${characterId}/comics`);
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json() as Promise<{ data: { results: [ComicDto] } }>);
}

