import React from 'react';
import SearchIcon from '../icons/SearchIcon/SearchIcon';
import useWindowSize from '../../Hooks/useWindowsSize';
import './searchbarAdmin.css';

const SearchbarAdmin =
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
                    <SearchIcon classStyle='searchbarAdmin-search-icon' />
                    <input
                        onChange={checkInputValue}
                        className='searchbarAdmin-input'
                        type="text"
                        placeholder='Search here...' />
                </div>
                <button
                    onClick={showFiltered}
                    className='searchbarAdmin-btn text-muted'>
                    Search
                </button>
                {width > 768 ?
                    <button onClick={handleNavCreate}
                        className='searchbarAdmin-create-btn text-muted'>
                        +
                    </button>
                    :
                    <button
                        onClick={handleNavCreate}
                        className='searchbarAdmin-create-mobile-btn'>
                        {textBtnCreate}
                    </button>
                }
            </div>
        )
    }

export default SearchbarAdmin;
