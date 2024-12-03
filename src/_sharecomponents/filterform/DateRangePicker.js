import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './FilterForm.scss'

const DateRangePicker = (props) => {

    const {
        onChange,
        startDate,
        endDate,
        year,
        dateFormat = "dd/MM",
        placeholderText = "Khoảng thời gian"
    } = props
    return (
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date(year, 0, 1)}
            maxDate={new Date(year, 11, 31)}
            dateFormat={dateFormat}
            placeholderText={placeholderText}
            isClearable
        />
    );
};

export default DateRangePicker;
