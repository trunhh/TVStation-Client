import IconButton from 'rsuite/IconButton';
import 'rsuite/IconButton/styles/index.css';
import SendRound from '@rsuite/icons/SendRound';
import CheckRound from '@rsuite/icons/CheckRound';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import Toggle from 'rsuite/Toggle';
import 'rsuite/Toggle/styles/index.css';
import Input from 'rsuite/Input';
import InputGroup from 'rsuite/InputGroup';
import 'rsuite/Input/styles/index.css';
import 'rsuite/InputGroup/styles/index.css';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';
import SelectPicker from 'rsuite/SelectPicker';
import 'rsuite/SelectPicker/styles/index.css';
import PlusRound from '@rsuite/icons/PlusRound';
import TrashIcon from '@rsuite/icons/Trash';
import SearchIcon from '@rsuite/icons/Search';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import EditRoundIcon from '@rsuite/icons/EditRound';
import { SectorConst,StatusConst,ObjectTypeConst, GenreConst, ActionConst, RoleActionConst} from '../../constants/constants';
import Popover from 'rsuite/Popover';
import Whisper from 'rsuite/Whisper';
import 'rsuite/Popover/styles/index.css';
import ButtonGroup from 'rsuite/ButtonGroup';
import 'rsuite/ButtonGroup/styles/index.css';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/Dropdown/styles/index.css';
import React, { useState, forwardRef } from 'react';
import Form from 'rsuite/Form';
import 'rsuite/Form/styles/index.css';
import 'rsuite/FormControl/styles/index.css';
import 'rsuite/FormControlLabel/styles/index.css';
import 'rsuite/FormErrorMessage/styles/index.css';
import 'rsuite/FormHelpText/styles/index.css';
import 'rsuite/FormGroup/styles/index.css';
export const CustomApproveButton = ({ role= "", status="", onClick, ...props }) => {
  let validActions = [];
  const roleActions = RoleActionConst[role];
  if (roleActions) {
    validActions = roleActions[status] || [];
  }

  
  const options = validActions
    .filter(key => ActionConst[key]) // Ensure only valid keys are used
    .map(key => ({ key, value: ActionConst[key] })); // Map to an array of objects

  const [action, setAction] = useState(options[0]?.key || ""); // Default to the first option's key or empty if no valid options

  if (validActions.length == 0) return null;

  return (
    <ButtonGroup style={{display: "flex"}}>
      <IconButton  
        {...props} 
        appearance="primary" 
        icon={<SendRound />} 
        style={{flexGrow: 1}}
        onClick={() => onClick(action)}
      >
        {ActionConst[action] || "Unknown Action"}
      </IconButton>

      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose();
            setAction(eventKey);
          };

          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                {options.map(({ key, value }, index) => (
                  <Dropdown.Item key={index} eventKey={key}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Popover>
          );
        }}
      >
        <IconButton appearance="primary" icon={<ArrowDownIcon />} />
      </Whisper>
    </ButtonGroup>
  );
};

export const CustomSubmitButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      color='green'
      icon={<CheckRound/>}
    >
      Lưu
    </IconButton>
  );
};

export const CustomCancelButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      color='red'
      icon={<WarningRoundIcon/>}
    >
      Hủy
    </IconButton>
  );
};

export const CustomAddButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      icon={<PlusRound/>}
    >
      Thêm
    </IconButton>
  );
};

export const CustomExportButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      icon={<EditRoundIcon/>}
    >
      Xuất file
    </IconButton>
  );
};


export const CustomDeleteButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='link'
      color='red'
      icon={<TrashIcon/>}
    />
  );
};

export const CustomDatePicker = ({ ...props }) => {
  const today = new Date(); // Get the current date and time
  // Remove time parts to set the min date to midnight today
  today.setHours(0, 0, 0, 0);

  return (
      <DatePicker
        {...props}
        size="lg"
        format="HH:mm dd/MM/yyyy"
        disabledDate={(date) => date < today}
        cleanable={false}
      />
  );
};

export const CustomWeekPicker = ({ ...props }) => {

  const disableNonSundays = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  return (
      <DatePicker
        showWeekNumbers
        {...props}
        size="lg"
        format="dd/MM/yyyy"
        shouldDisableDate={disableNonSundays}
        cleanable={true}
        placeholder="Tuần"
      />
  );
};


export const CustomYearPicker = ({ value, onChange, ...props }) => {
  // Get current year
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, index) => {
      const year = currentYear - 1 + index;
      return { label: `Năm ${year}`, value: year };
  });

  return (
      <SelectPicker
          {...props}
          size="lg"
          data={years} 
          value={value}
          onChange={onChange}
          placeholder="Năm"
      />
  );
};



export const CustomDateRangePicker = ({ ...props }) => {
  return (
      <DateRangePicker
          {...props}
          size="lg"
          format="dd/MM/yyyy"
      />
  );
};

export const CustomSectorPicker = ({ ...props }) => {
  return (
      <SelectPicker
          {...props}
          data= {SectorConst}
          searchable={false}
          size="lg"
          placeholder="Loại hình"
      />
  );
};

export const CustomStatusPicker = ({ ...props }) => {
  return (
      <SelectPicker
          {...props}
          data= {StatusConst}
          searchable={false}
          size="lg"
          placeholder="Trạng thái"
      />
  );
};

export const CustomObjectTypePicker = ({ ...props }) => {
  return (
      <SelectPicker
          {...props}
          data= {ObjectTypeConst}
          searchable={false}
          size="lg"
          placeholder="Nguồn"
      />
  );
};

export const CustomGenrePicker = ({ ...props }) => {
  return (
      <SelectPicker
          {...props}
          data= {GenreConst}
          size="lg"
          placeholder="Thể loại"
      />
  );
};

export const CustomSitemapPicker = ({ data, ...props }) => {
  const transformedData = data?.map(item => ({
    label: item.name,
    value: item.id
  }));
  return (
      <SelectPicker
          {...props}
          data= {transformedData}
          size="lg"
          placeholder="Phòng ban"
      />
  );
};

export const CustomUserPicker = ({ data, ...props }) => {
  const transformedData = data?.map(item => ({
    label: item.name,
    value: item.userName
  }));
  return (
      <SelectPicker
          {...props}
          data= {transformedData}
          size="lg"
          placeholder="Người dùng"
      />
  );
};

export const CustomToggle = ({...props }) => {
  return (
    <Toggle
      {...props}
      style={{
        flexGrow: 0
      }}
    />
  );
};

export const CustomInputNoOutline = ({...props }) => {
  return (
    <InputGroup size='lg' style={{border: 'none'}}>
      <Input style={{
        fontWeight: "bold"
      }}
        {...props}
        placeholder = "Đề tài chưa đặt tên"
      />  
    </InputGroup>
    
  )
}

export const CustomInputSearch = ({...props }) => {
  return (
    <InputGroup inside size='lg'>
      <Input
      {...props}
      placeholder="Tìm kiếm..."
      />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
    
  )
}
export const CustomFormControl = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={name} ref={ref} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} placeholder={label} style={{width: "100%", flex: 1}} {...rest} />
    </Form.Group>
  );
});
export const TextLink = ({ onRowClick, text, ...props }) => {
  const handleMouseEnter = (e) => {
    e.target.style.textDecoration = "underline";
  };

  const handleMouseLeave = (e) => {
    e.target.style.textDecoration = "none";
  };


  const style = {
    fontStyle: !text ? "italic" : "normal",
    fontWeight: text ? "bold" : "normal",
    textDecoration: "none",
    cursor: "pointer",
    width: "fit-content"
  };

  const content = text || "Đề tài chưa đặt tên";

  return (
    <div
      style={style}
      onClick={onRowClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </div>
  );
};



export default {
    CustomApproveButton,
    CustomSubmitButton,
    CustomAddButton,
    CustomExportButton,
    CustomDatePicker,
    CustomWeekPicker,
    CustomDateRangePicker,
    CustomSectorPicker,
    CustomStatusPicker,
    CustomObjectTypePicker,
    CustomGenrePicker,
    CustomSitemapPicker,
    CustomToggle,
    CustomInputNoOutline,
    CustomInputSearch,
    CustomFormControl,
    TextLink
}