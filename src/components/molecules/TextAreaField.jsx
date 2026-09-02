import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../atoms/TextArea';

function TextAreaField({
  id, label, value, onChange, rows = 4, required = false, placeholder = '',
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <TextArea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </>
  );
}

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextAreaField;
