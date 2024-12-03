import './FilterForm.scss'
import React from 'react';

const SearchInput = (props) => {
    const {
        value,
        onChange,
        placeholder= "Enter text",
        noOutline= false
    } = props
    return (
        <input
            type="text"
            className={`search-bar${noOutline ? ' no-outline' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default SearchInput;
