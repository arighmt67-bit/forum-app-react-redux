import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ authUser = null, onSignOut }) {
  return (
    <header className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__brand">
          Forum
          <span>Diskusi</span>
        </Link>
        <nav className="navigation__menu">
          <NavLink to="/" end>
            Threads
          </NavLink>
          <NavLink to="/leaderboards">Leaderboard</NavLink>
        </nav>
        {authUser ? (
          <div className="navigation__user">
            <img src={authUser.avatar} alt={authUser.name} className="avatar" />
            <span className="navigation__user-name">{authUser.name}</span>
            <button type="button" className="button button--ghost" onClick={onSignOut}>
              Keluar
            </button>
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
