// hooks/useFavorites.js o en una ubicación apropiada según tu estructura de proyecto
import { useContext } from 'react';
import { characterContext } from '../context/characterContext';
import { Character } from '../types/character';
import useFetchCharacters from '../hooks/useFetchCharacters';

const useFavorites = () => {
    const { charactersList, favoriteList, setFavoriteList, setCharactersList, setFavoriteListFiltered } = useContext(characterContext);
    const { fetchCharacterById } = useFetchCharacters();
    const toggleFavorite = (id: number | undefined): void => {
        if (id === undefined) return;
        const isCurrentlyFavorite = favoriteList.some(fav => fav.id === id);

        let updatedFavoriteList: Character[];
        let characterToAdd: Character | undefined;

        if (isCurrentlyFavorite) {
            updatedFavoriteList = favoriteList.filter(fav => fav.id !== id);
            setFavoriteList(updatedFavoriteList);
            setFavoriteListFiltered(updatedFavoriteList);
        } else {
            characterToAdd = charactersList.find(char => char.id === id);

            if (!characterToAdd) {
                const fetchData = async () => {
                    characterToAdd = await fetchCharacterById(Number(id)).then((res) => res);
                    if (characterToAdd) {
                        const newCharacter = { ...characterToAdd, isFavorite: true };
                        updatedFavoriteList = [...favoriteList, newCharacter];

                        setFavoriteList(updatedFavoriteList);
                        setFavoriteListFiltered(updatedFavoriteList);
                    }
                };

                fetchData();
            } else {
                const newCharacter = { ...characterToAdd, isFavorite: true };
                updatedFavoriteList = [...favoriteList, newCharacter];

                setFavoriteList(updatedFavoriteList);
                setFavoriteListFiltered(updatedFavoriteList);
            }
        }
        const updatedCharactersList = charactersList.map(character =>
            character.id === id ? { ...character, isFavorite: !isCurrentlyFavorite } : character
        );

        setCharactersList(updatedCharactersList);
    };


    return { toggleFavorite };
};

export default useFavorites;
