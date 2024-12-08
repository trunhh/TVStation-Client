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
import { SectorConst,StatusConst,ObjectTypeConst } from '../../constants/constants';
export const CustomApproveButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      icon={<SendRound/>}
    >
      Duyệt theo ủy quyền
    </IconButton>
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
    CustomDatePicker,
    CustomDateRangePicker,
    CustomSectorPicker,
    CustomStatusPicker,
    CustomObjectTypePicker,
    CustomSitemapPicker,
    CustomToggle,
    CustomInputNoOutline,
    CustomInputSearch,
    TextLink
}