import React from 'react';
import Select from 'react-select';
import './multiSelect.css';

const MultiSelect =
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
                    isMulti
                    required
                />
            </>
        );
    };

export default MultiSelect;
