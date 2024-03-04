import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { useState, useCallback } from 'react';
import { Character } from '../types/character';
import { getCharacters } from '../services/characterService';

interface CharacterContextType {
    charactersList: Character[];
    setCharactersList: React.Dispatch<React.SetStateAction<Character[]>>;
    favoriteList: Character[];
    setFavoriteList: React.Dispatch<React.SetStateAction<Character[]>>;
    favoriteListFiltered: Character[];
    setFavoriteListFiltered: React.Dispatch<React.SetStateAction<Character[]>>;
    favoriteMode: boolean;
    setFavoriteMode: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    fetchCharacters: (query: string) => Character[] | Promise<Character[]>;
    filterFavorites: (query: string) => void;
    filterCharacters: (query: string) => void;
    getCharacter: (id: number) => Character | undefined;
}

export const characterContext = createContext<CharacterContextType>({
    charactersList: [],
    setCharactersList: () => { },
    favoriteList: [],
    setFavoriteList: () => { },
    favoriteListFiltered: [],
    setFavoriteListFiltered: () => { },
    favoriteMode: false,
    setFavoriteMode: () => { },
    isLoading: false,
    fetchCharacters: () => [],
    filterFavorites: () => { },
    filterCharacters: () => { },
    getCharacter: () => undefined
});

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
    const [charactersList, setCharactersList] = useState<Character[]>([]);
    const [favoriteList, setFavoriteList] = useState<Character[]>([]);
    const [favoriteListFiltered, setFavoriteListFiltered] = useState<Character[]>([]);
    const [favoriteMode, setFavoriteMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCharacters = useCallback(async (query: string) => {
        console.log('fetchCharacters');
        setIsLoading(true);
        try {
            const res = await getCharacters(50, query);
            const characterData = res.data.results.map((character: any) => {
                return {
                    id: character.id,
                    name: character.name,
                    description: character.description,
                    imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                    isFavorite: false
                };
            });
            setIsLoading(false);
            return characterData;
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            return [];
        }
    }, []);

    useEffect(() => {
        console.log('useEffect characterContext fetchCharacters');
        const loadData = async () => {
            const charactersData = await fetchCharacters('');
            setCharactersList(charactersData);
        };

        loadData();
    }, [fetchCharacters]);


    const filterFavorites = useCallback((query: string) => {
        console.log('filterFavorites');
        if (query === '') {
            setFavoriteListFiltered(favoriteList);
            return;
        } else {
            const filteredList = favoriteList.filter((character) => {
                return character.name.toLowerCase().includes(query.toLowerCase());
            });
            setFavoriteListFiltered(filteredList);
        }
    }, [favoriteList]);

    const filterCharacters = useCallback((query: string) => {
        console.log('filterCharacters');
        const loadData = async () => {
            const charactersData = await fetchCharacters(query);
            setCharactersList(charactersData);
        };

        loadData();
    }, [fetchCharacters, setCharactersList]);

    const getCharacter = useCallback((id: number) => {
        console.log('getCharacter');
        return charactersList.find(character => character.id === id);
    }, [charactersList]);

    const value = useMemo(() => ({
        charactersList,
        setCharactersList,
        favoriteListFiltered,
        setFavoriteListFiltered,
        favoriteMode,
        setFavoriteMode,
        favoriteList,
        setFavoriteList,
        isLoading,
        fetchCharacters,
        filterFavorites,
        filterCharacters,
        getCharacter
    }), [charactersList, favoriteMode, favoriteList, isLoading, fetchCharacters, favoriteListFiltered, filterFavorites, filterCharacters, getCharacter]);

    return (
        <characterContext.Provider value={value}>
            {children}
        </characterContext.Provider>
    );
};

export const useCharacterContext = () => useContext(characterContext);