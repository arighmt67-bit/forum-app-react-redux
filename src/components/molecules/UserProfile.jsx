import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../atoms/Avatar';

function UserProfile({ name, avatar, className = 'user-profile' }) {
  return (
    <div className={className}>
      <Avatar src={avatar} alt={name} small />
      <span>{name}</span>
    </div>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default UserProfile;
