import HeartIcon from '../HeartIcon/HeartIcon';
import './CharacterCard.css';
import { NavLink } from 'react-router-dom';
import useFavorite from '../../hooks/useFavorite';
import { Character } from '../../types/character';

function CharacterCard(character: Character) {

    const { toggleFavorite } = useFavorite();

    return (
        <article className="character-card">
            <NavLink className="character-card-image" to={`/character/${character.id}`} state={character}>
                <img src={character.imageUrl} alt={character.name} />
            </NavLink>
            <div className='character-info'>
                <div className='highlight-box'></div>
                <span>{character.name}</span>
                <button onClick={() => toggleFavorite(character.id)}><HeartIcon isDefault={character.isFavorite} /></button>
            </div>
        </article>
    )
}

export default CharacterCard;