import { createContext, useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { charactersMock } from '../assets/character.json';
interface Character {
    id: number;
    name: string;
    imageUrl: string;
    isFavorite: boolean;
    description: string;
    comics: string[];
    // Añade más propiedades según sea necesario
}
interface CharacterComics {
    id: number;
    title: string;
    imageUrl: string;
    year: number;

};

export const characterContext = createContext({} as any);

export const CharacterProvider = ({ children }: any) => {
    const [filter, setFilter] = useState('' as string);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

    useEffect(() => {
        /*getCharacters(50).then((res) => {
            const characterData = res.data.results.map((character: any) => ({
                id: character.id,
                name: character.name,
                imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                isFavorite: false
            }));
            setCharacters(characterData);
        });*/
        const characterData: Character[] = charactersMock.map((character) => ({
            id: character.id,
            name: character.name,
            imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            isFavorite: false,
            description: character.description,
            comics: character.comics.items.map((comic: any) => comic.resourceURI)
        }));
        setCharacters(characterData);
        setFilteredCharacters(characterData);
    }, []);

    useEffect(() => {
        filterCharacters(filter);
    }, [characters]);

    const filterCharacters = (filter: string) => {
        const filtered: Character[] = filter === '' ? characters : characters.filter(character =>
            character.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilter(filter);
        setFilteredCharacters(filtered);
    };



    const value = useMemo(() => ({ characters, setCharacters, filteredCharacters, filterCharacters }), [characters, filteredCharacters]);

    return (
        <characterContext.Provider value={value}>
            {children}
        </characterContext.Provider>
    );
};

export const useCharacterContext = () => useContext(characterContext);