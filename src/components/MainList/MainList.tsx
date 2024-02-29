import CharacterCard from '../CharacterCard/CharacterCard';
import './MainList.css';
import { useFilter } from '../../context/filterContext';

function MainList() {

    const { filteredCharacters } = useFilter();

    return (
        <ul className='characters-list'>
            {filteredCharacters.map((character: any) => (
                <CharacterCard
                    key={character.id}
                    name={character.name}
                    image={character.imageUrl}
                    isFavorite={character.isFavorite}
                />
            ))}
        </ul>
    );
}

export default MainList;