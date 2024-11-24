import { useState } from "react";

const OnMouseHover = (props) => {
    const [point, setPoint] = useState({
        x: 0,
        y: 0
    })

    const _onMouseMove = (e) => {
        const { clientX, clientY } = e;//const clientX = e.clientX
        setPoint({
            x: clientX,
            y: clientY
        })
    }

    return (
        <div style={{height: '100%'}} onMouseMove={_onMouseMove}>
            <h3>Component OnMouseHover</h3>
            {props.render(point)}
        </div>
    )
}

export default OnMouseHover;