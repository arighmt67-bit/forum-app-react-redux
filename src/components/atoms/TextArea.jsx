import React from 'react';
import PropTypes from 'prop-types';

function TextArea({
  id, value, onChange, rows = 4, required = false, placeholder = '',
}) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  );
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextArea;
