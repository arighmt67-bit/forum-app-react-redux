import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../organisms/Navigation';
import LoadingBar from '../atoms/LoadingBar';

function AppLayout({ authUser = null, onSignOut, children }) {
  return (
    <div className="app">
      <LoadingBar />
      <Navigation authUser={authUser} onSignOut={onSignOut} />
      <main className="app__content">{children}</main>
      <footer className="app__footer">
        <p>Forum Diskusi &mdash; Submission React &amp; Redux Dicoding</p>
      </footer>
    </div>
  );
}

AppLayout.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  onSignOut: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppLayout;
