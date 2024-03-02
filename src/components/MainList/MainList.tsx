import CharacterCard from '../CharacterCard/CharacterCard';
import './MainList.css';
import { useCharacterContext } from '../../context/characterContext';
import { Character } from '../../types/character';
function MainList() {

    const { characters, isLoading } = useCharacterContext();



    return (
        <ul className='characters-list'>
            {isLoading && characters.map((character: Character) => (
                <CharacterCard
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    image={character.imageUrl}
                    isFavorite={character.isFavorite}
                />
            ))}
        </ul>
    );
}

export default MainList;