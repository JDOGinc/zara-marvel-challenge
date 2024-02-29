import './SearchFilter.css';
import searchIcon from '../../assets/likeButton.svg';
import { useCharacterContext } from '../../context/characterContext';
function SearchFilter() {
    const { filteredCharacters, filterCharacters } = useCharacterContext();
    const handleChange = (e: any) => {
        filterCharacters(e.target.value);
    }

    const itemsResult = filteredCharacters.length;

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