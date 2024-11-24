import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const CustomInputNonOutline = (props) => {
    const [inputFocus, setInputFocus] = useState(false)

    const [inputActive, setInputActive] = useState(false)

    const [value, setValue] = useState(props.value)

    const handleInputFocus = () => {
        setInputFocus(true)
    }

    const handleInputBlur = () => {
        setInputFocus(false)
        if (value != null && value !== '') {
            setInputActive(true)
        }else {
            setInputActive(false)
        }
    }

    const handleInputChange = (e) => {
        setValue(e.target.value)
        props.onChangeInput(e)
    }

    useEffect(() => {
        setValue(props.value)
        handleInputBlur()
        if ((value == null || value === '') && (props.value != null && props.value !== '')){
            setInputActive(true)
        }
    }, [props.value])

    return (
        <InputNonOutline inputFocus={inputFocus}>
            <Label 
                inputFocus={inputFocus}
                inputActive={inputActive}
            >
                {props.label}
            </Label>
            <input 
                type={props.type} 
                name={props.name}
                value={value}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
            />
        </InputNonOutline>
    )
}

const InputNonOutline = styled.div `
    border-bottom: 1px solid lightgray;
    ${'' /* width: ${p => p.inputFocus ? '100%' : '200px'}; */}
    ${'' /* width: 100%; */}
    position: relative;

    ::after {
        content: '';
        position: absolute;
        left: 0px;
        width: ${p => p.inputFocus ? '100%' : '0%'};
        bottom: -1px;
        background-color: #39f;
        height: 2px;
        transition: width ease-in-out .25s;
    }

    input {
        width: 100%;
        height: 34px;
        ${'' /* border: 1px solid red; */}
        border: none;
        outline: none;
        font-size: 1rem;
        padding: 8px 10px;
        padding-bottom: 2px;
    }
`
const Label = styled.label `
    color: rgba(0, 0, 0, .36);
    font-size: 1rem;
    position: absolute;
    top: 12px;
    left: 10px;
    pointer-events: none;
    transition: all ease-in-out .25s;

    ${p => p.inputFocus && `
        transform: translate(0px, -22px);
        color: #39f;
        font-size: .8rem;
    `}

    ${p => p.inputActive && `
        transform: translate(0px, -22px);
        font-size: .8rem;
    `}
`

export default CustomInputNonOutline