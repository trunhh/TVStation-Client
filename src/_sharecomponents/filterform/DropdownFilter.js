import './FilterForm.scss'
import React from 'react';

const DropdownFilter = (props) => {
    return (
        <select 
            className="form-control-filter" 
            name={props.name}
            value={props.value} 
            onChange={props.onChange}
        >
            <option value="">{props.placeholder}</option>
            {Object.keys(props.options).map(key => (
                <option key={key} value={key}>
                    {props.options[key]}
                </option>
            ))}
        </select>
    );
};

export default DropdownFilter;
