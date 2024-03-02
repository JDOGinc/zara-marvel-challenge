import './SearchFilter.css';
import searchIcon from '../../assets/likeButton.svg';
import { useCharacterContext } from '../../context/characterContext';
import { useState, useEffect } from 'react';

function SearchFilter() {
    const { characters, setFilter } = useCharacterContext();
    const [inputValue, setInputValue] = useState('' as string);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setFilter(inputValue);
        }, 500);
        return () => clearTimeout(timerId);
    }, [inputValue, setFilter]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const itemsResult = characters.length;

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