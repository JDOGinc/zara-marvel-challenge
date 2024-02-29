import CharacterCard from '../CharacterCard/CharacterCard';
import './MainList.css';
import { useCharacterContext } from '../../context/characterContext';

function MainList() {

    const { filteredCharacters } = useCharacterContext();

    return (
        <ul className='characters-list'>
            {filteredCharacters.map((character: any) => (
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