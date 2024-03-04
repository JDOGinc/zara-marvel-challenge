import './SearchFilter.css';
import searchIcon from '../../assets/likeButton.svg';
import { useCharacterContext } from '../../context/characterContext';
import { useRef } from 'react';

function SearchFilter() {
    const { charactersList, favoriteListFiltered, favoriteMode, filterCharacters, filterFavorites } = useCharacterContext();

    const debounceTimer = useRef<number>();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleChange searchFilter');
        const value = e.target.value;

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            if (favoriteMode) {
                filterFavorites(value);
            } else {
                filterCharacters(value);
            }
        }, 500)
    }

    const itemsResult = favoriteMode ? favoriteListFiltered.length : charactersList.length;

    return (
        <section className='search-wrapper'>
            <div className='search-input'>
                <label htmlFor="search"><img src={searchIcon} alt="" /></label>
                <input id="search" type="text" placeholder="SEARCH CHARACTER..." onChange={handleChange} />
            </div>
            <span id='items-result'>{itemsResult === 1 ? `${itemsResult} RESULT` : `${itemsResult} RESULTS`}</span>
        </section>
    );
}

export default SearchFilter;