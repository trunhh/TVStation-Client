import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './FilterForm.scss'

const DateRangePicker = (props) => {
    return (
        <DatePicker
            selected={props.startDate}
            onChange={props.onChange}
            startDate={props.startDate}
            endDate={props.endDate}
            selectsRange
            minDate={new Date(props.year, 0, 1)}
            maxDate={new Date(props.year, 11, 31)}
            dateFormat="dd/MM"
            placeholderText="Khoảng thời gian"
            isClearable
        />
    );
};

export default DateRangePicker;
