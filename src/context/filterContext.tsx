import { createContext, useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { charactersMock } from '../assets/character.json';
interface Character {
    id: number;
    name: string;
    imageUrl: string;
    isFavorite: boolean;
    // Añade más propiedades según sea necesario
}

export const filterContext = createContext({} as any);

export const FilterProvider = ({ children }: any) => {
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
            isFavorite: false
        }));
        setCharacters(characterData);
        setFilteredCharacters(characterData);
    }, []);

    const filterCharacters = (filter: string) => {
        const filtered: Character[] = filter === '' ? characters : characters.filter(character =>
            character.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    const value = useMemo(() => ({ characters, filteredCharacters, filterCharacters }), [characters, filteredCharacters]);

    return (
        <filterContext.Provider value={value}>
            {children}
        </filterContext.Provider>
    );
};

export const useFilter = () => useContext(filterContext);