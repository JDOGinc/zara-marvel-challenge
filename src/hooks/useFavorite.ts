// hooks/useFavorites.js o en una ubicación apropiada según tu estructura de proyecto
import { useContext } from 'react';
import { characterContext } from '../context/characterContext';

const useFavorites = () => {
    const { charactersList, favoriteList, setFavoriteList, setCharactersList, setFavoriteListFiltered } = useContext(characterContext);

    const toggleFavorite = (id: number) => {
        const isFavorite = favoriteList.some(fav => fav.id === id);
        const newFavoriteList = isFavorite ? favoriteList.filter(fav => fav.id !== id) : [...favoriteList, ...charactersList.filter(char => char.id === id)];

        setFavoriteList(newFavoriteList);
        setFavoriteListFiltered(newFavoriteList);
        const newCharactersList = charactersList.map(character => {
            if (character.id === id) {
                return { ...character, isFavorite: !character.isFavorite };
            }
            return character;
        });
        setCharactersList(newCharactersList);
    };

    return { toggleFavorite };
};

export default useFavorites;
