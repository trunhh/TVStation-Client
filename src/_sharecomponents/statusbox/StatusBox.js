import React from 'react';
import { StatusConst } from '../../constants/constants';

const StatusBox = ({ status }) => {
    if (!status) return null;

    const statusObject = StatusConst.find(s => s.value === status);
    
    return (
        <span className={`bg-${statusObject.style} rounded-pill px-2 py-1  text-white align-items-center flex-grow-0 text-nowrap`}>
            {statusObject.label}
        </span>
    );
};

export default StatusBox;