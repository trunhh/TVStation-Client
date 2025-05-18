import React from 'react';
import { StatusConst } from '../../constants/constants';

const StatusBox = ({ status }) => {
    const statusObject = StatusConst.find(s => s.value === status);
    
    return (
        <span className={`bg-${statusObject.style} rounded-pill px-2 py-1  text-white d-flex align-items-center`}>
            {statusObject.label}
        </span>
    );
};

export default StatusBox;