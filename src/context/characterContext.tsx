import { ReactNode, createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { useState, useCallback } from 'react';
import { Character } from '../types/character';
import { getCharacters, getCharactersByName } from '../services/characterService';

interface CharacterContextType {
    characters: Character[];
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
    favoriteMode: boolean;
    setFavoriteMode: React.Dispatch<React.SetStateAction<boolean>>;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    handleFavorite: (id: number) => void;
    favoriteCharacters: Character[];
}

export const characterContext = createContext<CharacterContextType>({
    characters: [],
    setCharacters: () => { },
    favoriteMode: false,
    setFavoriteMode: () => { },
    setFilter: () => { },
    handleFavorite: () => { },
    favoriteCharacters: []
});

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
    const [filter, setFilter] = useState('' as string);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
    const [favoriteMode, setFavoriteMode] = useState(false);


    const isFavoriteCharacters = useCallback((id: number) => {
        return favoriteCharacters.some((character) => character.id === id);
    }, [favoriteCharacters]);

    const fetchAllCharacters = useCallback(() => {
        getCharacters(50).then((res) => {
            const characterData = res.data.results.map((character: any) => ({
                id: character.id,
                name: character.name,
                imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                isFavorite: isFavoriteCharacters(character.id)
            }));
            setCharacters(characterData);
        });
    }, [isFavoriteCharacters]);

    const filterFavoriteCharacters = useCallback((query: string) => {
        const filteredCharacters = favoriteCharacters.filter((character) => character.name.toLowerCase().includes(query.toLowerCase()));
        setCharacters(filteredCharacters);
    }, [favoriteCharacters]);

    const fetchFilterCharacters = useCallback((query: string) => {
        getCharactersByName(50, query).then((res) => {
            const characterData = res.data.results.map((character: any) => ({
                id: character.id,
                name: character.name,
                imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                isFavorite: isFavoriteCharacters(character.id)
            }));
            setCharacters(characterData);
        });
    }, [isFavoriteCharacters]);

    useEffect(() => {
        if (favoriteMode) {
            if (filter === '') {
                setCharacters(favoriteCharacters);
            } else {
                filterFavoriteCharacters(filter);
            }

        } else {
            if (filter === '') {
                fetchAllCharacters();
            } else {
                fetchFilterCharacters(filter);
            }
        }

    }, [filter, fetchAllCharacters, fetchFilterCharacters, favoriteMode, filterFavoriteCharacters, favoriteCharacters]);



    //funcion que se encarga de ir almacenando solo los personajes favoritos en favoriteCharacters, si ya existe el personaje en favoriteCharacters, lo elimina
    const handleFavorite = useCallback((id: number) => {

        if (favoriteMode) {
            setFavoriteCharacters(favoriteCharacters.filter((character) => character.id !== id));
            const updatedCharacters: Character[] = characters.map((character: Character) => {
                if (character.id === id) {
                    return { ...character, isFavorite: !character.isFavorite };
                }
                return character;
            });
            setCharacters(updatedCharacters);
        } else {
            //busca el personaje en characters
            const character = characters.find((character) => character.id === id);

            //si el personaje ya esta en favoriteCharacters, lo elimina
            if (favoriteCharacters.some((character) => character.id === id)) {
                setFavoriteCharacters(favoriteCharacters.filter((character) => character.id !== id));
            } else {
                //si el personaje no esta en favoriteCharacters, lo agrega con el valor de isFavorite en true
                setFavoriteCharacters([...favoriteCharacters, { ...character, isFavorite: true }]);
            }
            const updatedCharacters: Character[] = characters.map((character: Character) => {
                if (character.id === id) {
                    return { ...character, isFavorite: !character.isFavorite };
                }
                return character;
            });
            setCharacters(updatedCharacters);
        }



    }, [characters, favoriteCharacters, favoriteMode]);

    const value = useMemo(() => ({ characters, setCharacters, favoriteMode, setFavoriteMode, setFilter, handleFavorite, favoriteCharacters }), [characters, favoriteMode, handleFavorite, favoriteCharacters]);

    return (
        <characterContext.Provider value={value}>
            {children}
        </characterContext.Provider>
    );
};

export const useCharacterContext = () => useContext(characterContext);