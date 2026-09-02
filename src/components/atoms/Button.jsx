import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children, className = 'button', ariaLabel = null, onClick = null, isSubmit = false,
}) {
  if (isSubmit) {
    return (
      <button type="submit" className={className} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
  isSubmit: PropTypes.bool,
};

export default Button;
