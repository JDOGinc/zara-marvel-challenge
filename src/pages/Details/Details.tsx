import './Details.css'
import ComicSlider from '../../components/ComicSlider/ComicSlider'
import { useEffect, useState } from 'react'
import { Character } from '../../types/character'
import DetailsInfoCard from '../../components/DetailsInfoCard/DetailsInfoCard'
import { useLocation } from 'react-router-dom'
import LoadBar from '../../components/LoadBar/LoadBar'

function Details() {
  const [character, setCharacter] = useState<Character>()
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const data: Character = location.state
    if (data) {
      setCharacter(data)
      return
    }
  }, [location.state])

  if (character === undefined) {
    return null
  } else {
    return (
      <>
        {isLoading && <LoadBar />}
        {!isLoading && <DetailsInfoCard character={character} />}
        <section className="character-comics">
          <div className="comics-content">
            <ComicSlider
              id={character.id.toString()}
              setIsLoading={setIsLoading}
            ></ComicSlider>
          </div>
        </section>
      </>
    )
  }
}
export default Details
