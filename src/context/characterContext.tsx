import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react'
import { useState, useCallback } from 'react'
import { Character } from '../types/character'
import useFetchCharacters from '../hooks/useFetchCharacters'

interface CharacterContextType {
  charactersList: Character[]
  setCharactersList: React.Dispatch<React.SetStateAction<Character[]>>
  favoriteList: Character[]
  setFavoriteList: React.Dispatch<React.SetStateAction<Character[]>>
  favoriteListFiltered: Character[]
  setFavoriteListFiltered: React.Dispatch<React.SetStateAction<Character[]>>
  favoriteMode: boolean
  setFavoriteMode: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  fetchCharacters: (query: string) => Character[] | Promise<Character[]>
  filterFavorites: (query: string) => void
  filterCharacters: (query: string) => void
  filterQuery: string
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>
}

export const characterContext = createContext<CharacterContextType>({
  charactersList: [],
  setCharactersList: () => {},
  favoriteList: [],
  setFavoriteList: () => {},
  favoriteListFiltered: [],
  setFavoriteListFiltered: () => {},
  favoriteMode: false,
  setFavoriteMode: () => {},
  isLoading: false,
  fetchCharacters: () => [],
  filterFavorites: () => {},
  filterCharacters: () => {},
  filterQuery: '',
  setFilterQuery: () => {},
})

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [charactersList, setCharactersList] = useState<Character[]>([])
  const [favoriteList, setFavoriteList] = useState<Character[]>([])
  const [favoriteListFiltered, setFavoriteListFiltered] = useState<Character[]>(
    [],
  )
  const [favoriteMode, setFavoriteMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { fetchCharacters } = useFetchCharacters()
  const [filterQuery, setFilterQuery] = useState('')

  useEffect(() => {
    setIsLoading(true)
    const loadData = async () => {
      const charactersData = await fetchCharacters('')
      setCharactersList(charactersData)
      setIsLoading(false)
    }

    loadData()
  }, [fetchCharacters])

  const filterFavorites = useCallback(
    (query: string) => {
      if (query === '') {
        setFavoriteListFiltered(favoriteList)
        return
      } else {
        const filteredList = favoriteList.filter(character => {
          return character.name.toLowerCase().includes(query.toLowerCase())
        })
        setFavoriteListFiltered(filteredList)
      }
    },
    [favoriteList],
  )

  const filterCharacters = useCallback(
    (query: string) => {
      const loadData = async () => {
        const charactersData = await fetchCharacters(query)
        setCharactersList(charactersData)
      }

      loadData()
    },
    [fetchCharacters, setCharactersList],
  )

  const value = useMemo(
    () => ({
      charactersList,
      setCharactersList,
      favoriteListFiltered,
      setFavoriteListFiltered,
      favoriteMode,
      setFavoriteMode,
      favoriteList,
      setFavoriteList,
      isLoading,
      fetchCharacters,
      filterFavorites,
      filterCharacters,
      filterQuery,
      setFilterQuery,
    }),
    [
      charactersList,
      favoriteMode,
      favoriteList,
      isLoading,
      fetchCharacters,
      favoriteListFiltered,
      filterFavorites,
      filterCharacters,
      filterQuery,
    ],
  )

  return (
    <characterContext.Provider value={value}>
      {children}
    </characterContext.Provider>
  )
}
export const useCharacterContext = () => useContext(characterContext)
