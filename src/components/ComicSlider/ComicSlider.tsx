import './ComicSlider.css'
import { Comic } from '../../types/character'
import ComicCard from '../ComicCard/ComicCard'
import { useEffect, useState } from 'react'
import useFetchCharacters from '../../hooks/useFetchCharacters'
import { motion } from 'framer-motion'

interface ComicSliderProps {
  id: string
  setIsLoading: (value: boolean) => void
}

function ComicSlider({ id, setIsLoading }: ComicSliderProps) {
  const [comics, setComics] = useState<Comic[] | undefined>(undefined)
  const { fetchComicsByCharacter } = useFetchCharacters()

  useEffect(() => {
    const fetchComics = async () => {
      setIsLoading(true)
      const comicsData = await fetchComicsByCharacter(id)
      setIsLoading(false)
      setComics(comicsData)
    }
    fetchComics()
  }, [fetchComicsByCharacter, id, setIsLoading])

  if (comics === undefined) {
    return <></>
  } else {
    return (
      <motion.div
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
        <h2>COMICS</h2>
        <ul className="comics-list">
          {comics.map((comic: Comic) => (
            <ComicCard
              key={comic.id}
              id={comic.id}
              title={comic.title}
              imageUrl={comic.imageUrl}
              year={comic.year}
            />
          ))}
        </ul>
      </motion.div>
    )
  }
}
export default ComicSlider
