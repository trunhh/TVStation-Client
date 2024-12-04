import IconButton from 'rsuite/IconButton';
import 'rsuite/IconButton/styles/index.css';
import SendRound from '@rsuite/icons/SendRound';
import CheckRound from '@rsuite/icons/CheckRound';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import Toggle from 'rsuite/Toggle';
import 'rsuite/Toggle/styles/index.css';
import Input from 'rsuite/Input';
import 'rsuite/Input/styles/index.css';
export const CustomApproveButton = ({ ...props }) => {
  return (
    <IconButton
      {...props}
      appearance='primary'
      icon={<SendRound/>}
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
      icon={<CheckRound/>}
      style={{
        fontWeight: 'bold'
      }}
    >
      Lưu
    </IconButton>
  );
};

export const CustomDatePicker = ({ ...props }) => {
  const today = new Date(); // Get the current date and time
  // Remove time parts to set the min date to midnight today
  today.setHours(0, 0, 0, 0);

  return (
      <DatePicker
          {...props}
          size="md"
          format="HH:mm dd/MM/yyyy"
          style={{
              fontWeight: 'bold',
          }}
          // Disable dates before today's date
          disabledDate={(date) => date < today}
          cleanable={false}
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
    <Input
      {...props}
      size="md" // Small size for the input
      style={{
        border: 'none',
        fontWeight: 'bold'
      }}
    />
  )
}

export default {
    CustomApproveButton,
    CustomSubmitButton,
    CustomDatePicker,
    CustomToggle,
    CustomInputNoOutline
}