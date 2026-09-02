import React from 'react';
import PropTypes from 'prop-types';

function Badge({ label, active = false, onClick = null }) {
  const className = `badge ${active ? 'badge--active' : ''}`;

  if (onClick === null) {
    return (
      <span className={className}>
        #
        {label}
      </span>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      #
      {label}
    </button>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Badge;
