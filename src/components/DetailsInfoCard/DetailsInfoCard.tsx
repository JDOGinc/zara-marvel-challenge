import './DetailsInfoCard.css'
import { Character } from '../../types/character';
import HeartIcon from '../HeartIcon/HeartIcon';

interface DetailsInfoCardProps {
    character: Character;
    toggleFavorite: (id: number) => void;
}
function DetailsInfoCard({ character, toggleFavorite }: DetailsInfoCardProps) {
    return (
        <section className='character-resume'>
            <article className='character-resume-content'>
                <img src={character?.imageUrl ?? ''} alt={character?.name ?? ''} className='character-resume-image' />
                <div className='character-resume-info'>
                    <div className='character-resume-title'>
                        <h1>{character?.name ?? ''}</h1>
                        <button onClick={() => toggleFavorite(character?.id)}><HeartIcon isDefault={character?.isFavorite} /></button>
                    </div>
                    <p className='character-description'>
                        {character?.description === '' ? 'No description available' : character?.description}
                    </p>
                </div>
            </article>
        </section>
    )
}

export default DetailsInfoCard;