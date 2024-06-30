import React from 'react';
import Select from 'react-select';
import './singleSelect.css';

const SingleSelect =
    ({
        classStyle,
        onChange,
        isClearable,
        isDisabled,
        isSearchable,
        options
    }) => {
        return (
            <>
                <Select
                    className={classStyle}
                    onChange={onChange}
                    isDisabled={isDisabled}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    options={options}
                    name='ciao'
                    required
                />
            </>
        );
    };

export default SingleSelect;
