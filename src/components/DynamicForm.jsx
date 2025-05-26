import { useEffect, useRef, useState } from 'react';
import { CustomFormInput } from './CustomRsuite';
import { CustomFormSelect } from './CustomRsuite';
import { Form, Button } from 'react-bootstrap';

const DynamicForm = ({ 
  form, 
  setForm, 
  fieldProps, 
  onSubmit, 
  autoSubmit = false
}) => {

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    }
  };

  // Auto-submit effect when form changes
  useEffect(() => {
    if (autoSubmit) {
      handleSubmit();
    }
  }, [form, autoSubmit]);

  return (
    <Form className="row row-gap-3" onSubmit={handleSubmit}>
      {Object.keys(form).map((key) => {
        if (!fieldProps[key]) return null;

        const props = {
          name: key,
          onChange: handleFormChange,
          value: form[key] ?? '',
          ...fieldProps[key]
        };

        return (
          <div className="w-50" key={key}>
            {props.type ? (
              <CustomFormInput {...props} />
            ) : props.data ? (
              <CustomFormSelect {...props} />
            ) : null}
          </div>
        );
      })}

      {!autoSubmit && (
        <div className="mt-3">
          <Button variant="primary" type="submit">
            Lưu
          </Button>
        </div>
      )}
    </Form>
  );
};

export default DynamicForm;