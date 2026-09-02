import React from 'react';
import PropTypes from 'prop-types';

function TextInput({
  id, type = 'text', value, onChange, required = false, minLength = null, placeholder = '',
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      placeholder={placeholder}
    />
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
};

export default TextInput;
