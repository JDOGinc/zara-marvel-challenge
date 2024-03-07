import './SearchFilter.css'
import searchIcon from '../../assets/likeButton.svg'
import { useCharacterContext } from '../../context/characterContext'
import { useRef } from 'react'

function SearchFilter() {
  const {
    charactersList,
    favoriteListFiltered,
    favoriteMode,
    filterCharacters,
    filterFavorites,
    filterQuery,
    setFilterQuery,
  } = useCharacterContext()

  const debounceTimer = useRef<NodeJS.Timeout>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setFilterQuery(value)

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      if (favoriteMode) {
        filterFavorites(value)
      } else {
        filterCharacters(value)
      }
    }, 500)
  }

  const itemsResult = favoriteMode
    ? favoriteListFiltered.length
    : charactersList.length

  return (
    <section className="search-wrapper">
      <div className="search-input">
        <label htmlFor="search">
          <img src={searchIcon} alt="Search filter input" />
        </label>
        <input
          id="search"
          type="text"
          placeholder="SEARCH CHARACTER..."
          onChange={handleChange}
          value={filterQuery}
        />
      </div>
      <span data-testid="items-result" id="items-result">
        {itemsResult === 1 ? `${itemsResult} RESULT` : `${itemsResult} RESULTS`}
      </span>
    </section>
  )
}

export default SearchFilter
