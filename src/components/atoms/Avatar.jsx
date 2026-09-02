import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ src, alt, small = false }) {
  return (
    <img
      src={src}
      alt={alt}
      className={small ? 'avatar avatar--small' : 'avatar'}
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default Avatar;
