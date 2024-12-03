import IconButton from 'rsuite/IconButton';
import 'rsuite/IconButton/styles/index.css';
import SendRoundIcon from '@rsuite/icons/SendRound';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import Toggle from 'rsuite/Toggle';
import 'rsuite/Toggle/styles/index.css';
export const CustomApproveButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      icon={<SendRoundIcon/>}
      style={{
        fontWeight: 'bold'
      }}
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
      icon={<CheckRoundIcon/>}
      style={{
        fontWeight: 'bold'
      }}
    >
      Lưu
    </IconButton>
  );
};

export const CustomDatePicker = ({ ...props }) => {
  return (
    <DatePicker
      {...props}
      size="md"
      format="HH:mm dd/MM/yyyy"
      style={{
        fontWeight: 'bold'
      }}
    />
  );
};


export const CustomToggle = ({ style, ...props }) => {
  return (
    <Toggle
      {...props}
      style={{
        flexGrow: 0,
        ...style,  
      }}
    />
  );
};


export default {
    CustomApproveButton,
    CustomSubmitButton,
    CustomDatePicker,
    CustomToggle
}