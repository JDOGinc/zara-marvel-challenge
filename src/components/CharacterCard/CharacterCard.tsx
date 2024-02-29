import HeartIcon from '../HeartIcon/HeartIcon';
import './CharacterCard.css';
import { useCharacterContext } from '../../context/characterContext';

interface CharacterCardProps {
    id: number;
    name: string;
    image: string;
    isFavorite: boolean;
}

function CharacterCard({ id, name, image, isFavorite }: CharacterCardProps) {

    const { characters, setCharacters } = useCharacterContext();

    const handleFavorite = () => {
        const updatedCharacters = characters.map((character: any) => {
            if (character.id === id) {
                return { ...character, isFavorite: !character.isFavorite };
            }
            return character;
        });

        setCharacters(updatedCharacters);
        console.log(updatedCharacters);
    };

    return (
        <article className="character-card">
            <div className="character-card-image">
                <img src={image} alt={name} />
            </div>
            <div className='character-info'>
                <div className='highlight-box'></div>
                <span>{name}</span>
                <button onClick={handleFavorite}><HeartIcon isDefault={isFavorite} /></button>
            </div>
        </article>
    )
}

export default CharacterCard;