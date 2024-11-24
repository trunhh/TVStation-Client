import './FormGroup.css'

const FormGroup = (props) => {
    return (
        <div className="form-group"
            style={{width: props.width ? props.width : '100%'}}
        >
            {props.children}
        </div>
    )
}

export default FormGroup