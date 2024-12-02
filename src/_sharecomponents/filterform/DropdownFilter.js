import './FilterForm.scss'
import React from 'react';

const DropdownFilter = (props) => {
    const {
        name,
        value,
        onChange,
        options,
        placeholder,
        valueKey = 'key', // Default value for key-value pair
        displayKey = 'value', // Default value for key-value pair
    } = props;

    return (
        <select 
            className="form-control-filter" 
            name={name}
            value={value} 
            onChange={onChange}
        >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option[valueKey]}>
                    {option[displayKey]}
                </option>
            ))}
        </select>
    );
};

export default DropdownFilter;
