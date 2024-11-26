import React from 'react';
import './ToggleSwitch.scss'; // Import custom styles

const ToggleSwitch = ({ label, value, handleChange }) => {
    return (
        <div className="toggle-switch">
            <label>
                
                <input
                    type="checkbox"
                    checked={value}
                    onChange={handleChange}
                />
                <span className="slider"></span>
                <p className="toggle-switch-text">{label}</p>
            </label>
        </div>
    );
}
export default ToggleSwitch