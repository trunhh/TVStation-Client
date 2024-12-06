import './StatusBox.scss'
import React from 'react';
import { StatusConst } from '../../constants/constants';

const StatusBox = ({ status }) => {
    const statusObject = StatusConst.find(s => s.value === status);
    const statusText = statusObject ? statusObject.label : "Unknown Status";
    
    return (
        <span className={`status-box ${status.toLowerCase()}`}>
            {statusText}
        </span>
    );
};

export default StatusBox;