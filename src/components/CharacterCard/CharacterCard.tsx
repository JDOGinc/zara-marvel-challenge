import HeartIcon from '../HeartIcon/HeartIcon';
import './CharacterCard.css';
import RectangleInfoCut from './Rectangle-info-cut';

interface CharacterCardProps {
    name: string;
    image: string;
    isFavorite: boolean;
}
function CharacterCard({ name, image, isFavorite }: CharacterCardProps) {
    return (
        <article className="character-card">
            <div className="character-card-image">
                <img src={image} alt={name} />
            </div>
            <div className='character-info'>
                <div className='highlight-box'></div>
                <span>{name}</span>
                <HeartIcon isDefault={isFavorite} />
            </div>
        </article>
    )
}

export default CharacterCard;