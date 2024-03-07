import './ComicCard.css'
import { Comic } from '../../types/character'

function ComicCard(comic: Comic) {
  return (
    <article className="comic-card">
      <img
        src={comic.imageUrl}
        alt={`comic image: ${comic.title}`}
        className="comic-image"
      />
      <div className="comic-info">
        <h3>{comic.title}</h3>
        <span>{comic.year}</span>
      </div>
    </article>
  )
}
export default ComicCard
