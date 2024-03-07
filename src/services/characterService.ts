import { getApiUrl } from '../apiConfig'
import { ComicDto } from '../types/responseComicDto'
import { CharacterDto } from '../types/responseCharacterDto'

export const getCharacters = (limitNumber: number, name: string) => {
  const apiUrl = getApiUrl('public/characters')
  const nameStartsWith = name === '' ? '' : `&nameStartsWith=${name}`
  return fetch(`${apiUrl}&limit=${limitNumber}${nameStartsWith}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json() as Promise<{ data: { results: [CharacterDto] } }>)
}

export const getCharacterById = (id: number) => {
  const apiUrl = getApiUrl(`public/characters/${id}`)
  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json() as Promise<{ data: { results: [CharacterDto] } }>)
}

export const getComicsByCharacter = (characterId: string) => {
  const apiUrl = getApiUrl(`public/characters/${characterId}/comics`)
  return fetch(`${apiUrl}&orderBy=onsaleDate&limit=20`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json() as Promise<{ data: { results: [ComicDto] } }>)
}
