import './DetailsInfoCard.css'
import { Character } from '../../types/character'
import HeartIcon from '../HeartIcon/HeartIcon'
import useFavorite from '../../hooks/useFavorite'
import { motion } from 'framer-motion'

interface DetailsInfoCardProps {
  character: Character
}

function DetailsInfoCard({ character }: DetailsInfoCardProps) {
  const { toggleFavorite } = useFavorite()
  return (
    <motion.section
      className="character-resume"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 1,
        type: 'spring',
        mass: 1,
        stiffness: 80,
        damping: 20,
      }}
    >
      <article className="character-resume-content">
        <img
          src={character?.imageUrl ?? ''}
          alt={character?.name ?? ''}
          className="character-resume-image"
        />
        <div className="character-resume-info">
          <div className="character-resume-title">
            <h1>{character?.name ?? ''}</h1>
            <button
              data-testid="fav-button"
              onClick={() => toggleFavorite(character)}
            >
              <HeartIcon isDefault={character?.isFavorite} />
            </button>
          </div>
          <p className="character-description">
            {character?.description === ''
              ? 'No description available'
              : character?.description}
          </p>
        </div>
      </article>
    </motion.section>
  )
}

export default DetailsInfoCard
