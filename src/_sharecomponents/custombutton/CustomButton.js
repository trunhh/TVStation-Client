import react, { Component } from 'react';

import './CustomButton.css';

class CustomButton extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        //const width = this.props.width;
        //const type = this.props.type;
        const { 
            width, 
            type, 
            uppercase, 
            large, 
            color, 
            //children,
            ...otherProps
            
        } = this.props;

        //const { title } = this.props;

        return (
            <button
                className={large ? 'btn btn-lg' : 'btn'}
                type={type}
                style={{
                    width: width ? width : 'inherit',
                    textTransform: uppercase ? 'uppercase' : 'none',
                    color: color,
                    cursor: 'pointer'
                }}
                {...otherProps}
            >
                {/* { title } */}
                {this.props.children}
            </button>
        )
    }
}

export default CustomButton;