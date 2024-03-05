import CharacterCard from '../CharacterCard/CharacterCard';
import './MainList.css';
import { useCharacterContext } from '../../context/characterContext';
import { Character } from '../../types/character';
import { useEffect, useState } from 'react';

function MainList() {

    const { charactersList, favoriteList, favoriteListFiltered, isLoading, favoriteMode } = useCharacterContext();
    const [displayList, setDisplayList] = useState<Character[]>([]);

    useEffect(() => {
        console.log('useEffect MainList');
        if (favoriteMode) {
            setDisplayList(favoriteListFiltered);
        } else {
            const data: Character[] = charactersList.map((character) => {
                return {
                    ...character,
                    isFavorite: favoriteList.some((favoriteCharacter) => favoriteCharacter.id === character.id)
                }
            });
            setDisplayList(data);
        }
    }, [charactersList, favoriteListFiltered, favoriteMode, favoriteList]);

    if (isLoading) {
        return <></>
    }


    return (
        <ul className='characters-list'>
            {displayList.map((character: Character) => (
                <CharacterCard
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    description={character.description}
                    imageUrl={character.imageUrl}
                    isFavorite={character.isFavorite}
                />
            ))}
        </ul>
    );
}

export default MainList;