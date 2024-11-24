import { useEffect, useState } from 'react'
import './CustomInput.css'

function CustomInput(props) {
    const [value, setValue] = useState('')

    const [inputFocus, setInputFocus] = useState(false)
    
    const [allowed, setAllowed] = useState(false)

    const _onChange = (e) => {
        setValue(e.target.value);

        props.onChangeInput(e);
    }

    const _onFocus = (e) => {
        setInputFocus(true);
    }

    const _onBlur = (e) => {
        setInputFocus(false);

        if (value != null && value !== '') {
            setAllowed(true);
        }else setAllowed(false);
    }

    useEffect(() => {
        setValue(props.value);

        if (props.value) setAllowed(true);
        else setAllowed(false);
    }, [props.value])

    return(
        <div className="formcontrol-input">
            <label 
                className={
                    inputFocus ? 'label active' : 
                    (allowed ? 'label allowed' : 'label')
                }
            >
                {props.label}
            </label>
            <div className='input-item'>
                <input
                    className={inputFocus ? 'active' : 
                    (allowed ? 'allowed' : '')}
                    type={props.type}
                    name={props.name}
                    value={value}
                    onChange={_onChange}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                />
                <fieldset className={
                    inputFocus ? 'active' : 
                    (allowed ? 'allowed' : '')
                }>
                    <legend>
                        <span>{props.label}</span>
                    </legend>
                </fieldset>
            </div>
        </div>
    )
}

export default CustomInput