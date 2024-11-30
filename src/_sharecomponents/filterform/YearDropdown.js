import React from 'react';

const YearDropdown = (props) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, index) => currentYear + index);

    return (
        <select 
            className="form-control-filter"
            value={props.value} 
            onChange={props.onChange}
        >
            <option value="Year" hidden>Năm</option>
            {years.map(yearValue => (
                <option key={yearValue} value={yearValue}>
                    Năm {yearValue}
                </option>
            ))}
        </select>
    );
};

export default YearDropdown;
