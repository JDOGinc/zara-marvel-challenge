import HeartIcon from '../HeartIcon/HeartIcon';
import './CharacterCard.css';
import { useCharacterContext } from '../../context/characterContext';
import { NavLink } from 'react-router-dom';


interface CharacterCardProps {
    id: number;
    name: string;
    image: string;
    isFavorite: boolean;
}

function CharacterCard({ id, name, image, isFavorite }: CharacterCardProps) {

    const { handleFavorite } = useCharacterContext();

    const handleFavoriteCharacter = () => {
        handleFavorite(id);
    };

    return (
        <article className="character-card">
            <NavLink className="character-card-image" to={`/character/${id}`}>
                <img src={image} alt={name} />
            </NavLink>
            <div className='character-info'>
                <div className='highlight-box'></div>
                <span>{name}</span>
                <button onClick={handleFavoriteCharacter}><HeartIcon isDefault={isFavorite} /></button>
            </div>
        </article>
    )
}

export default CharacterCard;