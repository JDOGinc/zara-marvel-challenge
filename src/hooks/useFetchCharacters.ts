import { useCallback } from 'react';
import { getCharacterById, getCharacters, getComicsByCharacter } from '../services/characterService';
import { ComicDto } from '../types/responseComicDto';
import { Comic } from '../types/character';
import { CharacterDto } from '../types/responseCharacterDto';
import { Character } from '../types/character';


const useFetchCharacters = () => {

    const fetchCharacters = useCallback(async (query: string) => {
        console.log('fetchCharacters');
        try {
            const res = await getCharacters(50, query);
            const characterData: Character[] = res.data.results.map((character: CharacterDto) => {
                return {
                    id: character.id,
                    name: character.name,
                    description: character.description,
                    imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                    isFavorite: false
                };
            });
            return characterData;
        } catch (error) {
            return [];
        }
    }, []);

    const fetchComicsByCharacter = useCallback(async (characterId: string) => {
        console.log('fetchComicsByCharacter');
        try {
            const res = await getComicsByCharacter(characterId);
            const comicsData: Comic[] = res.data.results.map((comic: ComicDto) => {
                return {
                    id: comic.id,
                    title: comic.title,
                    imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                    year: new Date(comic.dates[0].date).getFullYear().toString()
                };
            });
            return comicsData;
        } catch (error) {
            return [];
        }
    }, []);

    const fetchCharacterById = useCallback(async (id: number) => {
        try {
            const res = await getCharacterById(id);

            const characterData: Character[] = res.data.results.map((character: CharacterDto) => {
                return {
                    id: character.id,
                    name: character.name,
                    description: character.description,
                    imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                    isFavorite: false
                };
            });
            if (characterData.length === 0) return undefined;
            return characterData[0];
        } catch (error) {
            return undefined;
        }
    }, []);

    return { fetchCharacters, fetchComicsByCharacter, fetchCharacterById };
};

export default useFetchCharacters;