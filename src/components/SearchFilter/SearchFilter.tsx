import './SearchFilter.css';
import searchIcon from '../../assets/Like button.svg';
function SearchFilter() {
    return (
        <section className='search-wrapper'>
            <div className='search-input'>
                <label htmlFor="search"><img src={searchIcon} alt="" /></label>
                <input id="search" type="text" placeholder="SEARCH CHARACTER..." />
            </div>
            <span id='items-result'>50 RESULTS</span>
        </section>
    );
}

export default SearchFilter;