import { ActionConst, RoleActionConst} from '../../constants/constants';
import React, { useState, forwardRef } from 'react';


import { Button, FloatingLabel, Form, InputGroup, ButtonGroup, Dropdown } from 'react-bootstrap';


export const CustomDropdown = ({ options, text, variant, ...props}) => {

  return (
    <Dropdown className="btn-group" {...props} >
      <Dropdown.Toggle variant={variant}>
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(({ key, value }, index) => (
          <Dropdown.Item key={key} eventKey={key}>
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};





// #region button

export const CustomApproveButton = ({ role= "", status="", onClick, ...props }) => {
  let validActions = [];
  const roleActions = RoleActionConst["MANAGER"];
  if (roleActions) {
    validActions = roleActions["IN_PROGRESS"] || [];
  }

  
  const options = validActions
    .filter(key => ActionConst[key]) // Ensure only valid keys are used
    .map(key => ({ key, value: ActionConst[key] })); // Map to an array of objects

  const [action, setAction] = useState(options[0]?.key || ""); // Default to the first option's key or empty if no valid options

  // if (validActions.length == 0) return null;

  const variant = "success"

  return (
    <CustomIconButton 
      variant={variant}
      icon="bi-exclamation-circle-fill"
      text={ActionConst[action] || "Unknown Action"}
      onClick={() => onClick(action)}
      {...props}
    >
      <CustomDropdown variant={variant} options={options} onSelect={(key)=>setAction(key)}/>

    </CustomIconButton>
  );
};

export const CustomSubmitButton = ({ ...props }) => {
  return (
    <CustomIconButton variant="success" icon="bi-check-circle-fill" text="Lưu" {...props}/>
  );
};

export const CustomIconButton = ({icon="", text="", children, variant, ...props}) => {
  return (
    <ButtonGroup {...props}>
      <Button variant={variant} active><i className={`bi ${icon}`}/></Button>
      <Button variant={variant} className="w-100">{text}</Button>
      {children}
    </ButtonGroup>
    
  );
}

export const CustomCancelButton = ({ ...props }) => {
  return (
    <CustomIconButton variant="danger" icon="bi-x-circle-fill" text="Hủy" {...props}/>
  );
};

export const CustomAddButton = ({ ...props }) => {
  return (
    <CustomIconButton variant="primary" size="sm" icon="bi-plus-circle-fill" text="Thêm" {...props}/>
  );
};

export const CustomExportButton = ({ ...props }) => {
  return (
    <CustomIconButton variant="primary" icon="bi-x-circle-fill" text="Xuất file" {...props}/>
  );
};

export const CustomDeleteButton = ({ ...props }) => {
  return (
    <button className="bi bi-trash-fill link-danger border-0 w-1" {...props}/>
  );
};

// #endregion




// #region picker
export const CustomFormSelect = ({
  data, 
  getValue = (item) => item.value,
  getLabel = (item) => item.label,
  label,
  controlId,
  error,
  placeholder,
  className,
  ...props
}) => {
  return (
    <FloatingLabel label={label} controlId={controlId} className={className}>
      <Form.Select
          isInvalid={!!error}
          {...props}
      >
        <option value="">Tất cả</option>
        {data?.map((item,index) => (
          <option key={index} value={getValue(item)}>
            {getLabel(item)}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
  )
};


export const CustomFormInput = ({
  label,
  controlId,
  error,
  placeholder,
  type = 'text',
  className,
  ...props
}) => {
  return (
    <FloatingLabel label={label} controlId={controlId} className={className}>
      <Form.Control
        type={type}
        placeholder={placeholder || label}
        isInvalid={!!error}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
  );
};


// #endregion

export const CustomToggle = ({...props }) => {
  return (
    <Form.Check type="switch" role="switch" {...props}/>
  );
};




export const CustomInputNoOutline = ({...props }) => {
  return (
    <Form.Text
      {...props}
      placeholder = "Đề tài chưa đặt tên"
    />
    
  )
}

export const CustomInputSearch = ({className, ...props }) => {
  return (
    <InputGroup className={className}>
      <Form.Control
        placeholder="Tìm kiếm..."
        {...props}
      />
      <span class="input-group-text"><i class="bi bi-search"/></span>
    </InputGroup>
    
  )
}
export const CustomFormControl = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return ( <></>
    // <Form.Group controlId={name} ref={ref} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    //   <Form.ControlLabel>{label} </Form.ControlLabel>
    //   <Form.Control name={name} accepter={accepter} placeholder={label} style={{width: "100%", flex: 1}} {...rest} />
    // </Form.Group>
  );
});

export const TextLink = ({ text, ...props }) => {
  const style = {
    fontStyle: !text ? "italic" : "normal",
    fontWeight: text ? "bold" : "normal",
  };

  const content = text || "Đề tài chưa đặt tên";

  return (
    <a
      style={style}
      {...props}
      className='link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover'
    >
      {content}
    </a>
  );
};


