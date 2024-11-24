import { useState } from "react";

const WithColor = (WrappedComponent) => {
    const randomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i ++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const WithColorCoponent = (props) => {
        const [number, setNumber] = useState(0);

        return (
            <div style={{color: randomColor()}}>
                <WrappedComponent {...props} number={number}/>
            </div>
        )
    }
    return WithColorCoponent;
}

export default WithColor;