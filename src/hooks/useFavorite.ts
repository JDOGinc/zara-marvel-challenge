import { useContext } from 'react'
import { characterContext } from '../context/characterContext'
import { Character } from '../types/character'

const useFavorites = () => {
  const {
    charactersList,
    favoriteList,
    setFavoriteList,
    setCharactersList,
    setFavoriteListFiltered,
  } = useContext(characterContext)
  const toggleFavorite = (character: Character): void => {
    const isCurrentlyFavorite = favoriteList.some(
      fav => fav.id === character.id,
    )

    let updatedFavoriteList: Character[]

    if (isCurrentlyFavorite) {
      character.isFavorite = false
      updatedFavoriteList = favoriteList.filter(fav => fav.id !== character.id)
      setFavoriteList(updatedFavoriteList)
      setFavoriteListFiltered(updatedFavoriteList)
    } else {
      character.isFavorite = true
      const newCharacter = { ...character, isFavorite: true }
      updatedFavoriteList = [...favoriteList, newCharacter]

      setFavoriteList(updatedFavoriteList)
      setFavoriteListFiltered(updatedFavoriteList)
    }
    const updatedCharactersList = charactersList.map(char =>
      char.id === character.id
        ? { ...char, isFavorite: !isCurrentlyFavorite }
        : char,
    )

    setCharactersList(updatedCharactersList)
  }

  return { toggleFavorite }
}

export default useFavorites
