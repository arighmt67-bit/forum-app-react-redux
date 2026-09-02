import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../atoms/TextInput';

function FormField({
  id, label, type = 'text', value, onChange, required = false, minLength = null, placeholder = '',
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <TextInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
      />
    </>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
};

export default FormField;
