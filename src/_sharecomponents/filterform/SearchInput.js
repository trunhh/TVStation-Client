import React from 'react';

const SearchInput = (props) => {
    return (
        <input
            type="text"
            className="search-bar"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
};

export default SearchInput;
