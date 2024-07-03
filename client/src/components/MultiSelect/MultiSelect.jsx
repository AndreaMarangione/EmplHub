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
        options,
        value
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
                    value={value}
                    isMulti
                    required
                />
            </>
        );
    };

export default MultiSelect;
