import React from 'react';
import PropTypes from 'prop-types';

function EmptyState({ message }) {
  return <p className="empty-state">{message}</p>;
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyState;
