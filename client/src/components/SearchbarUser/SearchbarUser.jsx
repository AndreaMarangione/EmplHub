import React from 'react';
import SearchIcon from '../icons/SearchIcon/SearchIcon';
import useWindowSize from '../../Hooks/useWindowsSize';
import './searchbarUser.css';

const SearchbarUser =
    ({
        checkInputValue,
        showFiltered
    }) => {
        const { width } = useWindowSize();
        return (
            <div className='d-flex flex-column gap-2 gap-md-0 flex-lg-row align-items-center position-relative mb-5'>
                <div className='position-relative w-100'>
                    <SearchIcon classStyle='searchbarUser-search-icon' />
                    <input
                        onChange={checkInputValue}
                        className='searchbarUser-input'
                        type="text"
                        placeholder='Search here...' />
                </div>
                <button
                    onClick={showFiltered}
                    className='searchbarUser-btn'>
                    Search
                </button>
            </div>
        )
    }

export default SearchbarUser;
