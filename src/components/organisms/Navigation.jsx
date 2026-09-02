import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationMenu from '../molecules/NavigationMenu';
import UserProfile from '../molecules/UserProfile';
import Button from '../atoms/Button';

function Navigation({ authUser = null, onSignOut }) {
  return (
    <header className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__brand">
          Forum
          <span>Diskusi</span>
        </Link>
        <NavigationMenu />
        {authUser ? (
          <div className="navigation__user">
            <UserProfile
              name={authUser.name}
              avatar={authUser.avatar}
              className="navigation__user-name"
            />
            <Button className="button button--ghost" onClick={onSignOut}>
              Keluar
            </Button>
          </div>
        ) : (
          <div className="navigation__user">
            <Link to="/login" className="button button--ghost">
              Masuk
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
