import React from 'react';
import './ToggleSwitch.scss'; // Import custom styles

const ToggleSwitch = (props) => {
    return (
        <div className="toggle-switch">
            <label>
                
                <input
                    type="checkbox"
                    checked={props.value}
                    onChange={props.handleChange}
                />
                <span className="slider"></span>
                <p className="toggle-switch-text">{props.label}</p>
            </label>
        </div>
    );
}
export default ToggleSwitch