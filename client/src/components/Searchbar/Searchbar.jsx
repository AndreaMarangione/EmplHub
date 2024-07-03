import React from 'react';
import SearchIcon from '../icons/SearchIcon/SearchIcon';
import useWindowSize from '../../Hooks/useWindowsSize';
import './searchbar.css';

const Searchbar =
    ({
        checkInputValue,
        showFiltered,
        handleNavCreate,
        textBtnCreate
    }) => {
        const { width } = useWindowSize();
        return (
            <div className='d-flex flex-column gap-2 gap-md-0 flex-lg-row align-items-center position-relative mb-5'>
                <div className='position-relative w-100'>
                    <SearchIcon classStyle='searchBar-search-icon' />
                    <input
                        onChange={checkInputValue}
                        className='searchBar-input'
                        type="text"
                        placeholder='Search here...' />
                </div>
                <button
                    onClick={showFiltered}
                    className='searchBar-btn'>
                    Search
                </button>
                {width > 768 ?
                    <button onClick={handleNavCreate}
                        className='searchBar-create-btn'>
                        +
                    </button>
                    :
                    <button
                        onClick={handleNavCreate}
                        className='searchBar-create-mobile-btn'>
                        {textBtnCreate}
                    </button>
                }
            </div>
        )
    }

export default Searchbar;
