import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AuthTemplate({
  title, children, hintText, hintLinkTo, hintLinkLabel,
}) {
  return (
    <section className="auth-page">
      <h2>{title}</h2>
      {children}
      <p className="auth-page__hint">
        {hintText}
        {' '}
        <Link to={hintLinkTo}>{hintLinkLabel}</Link>
      </p>
    </section>
  );
}

AuthTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  hintText: PropTypes.string.isRequired,
  hintLinkTo: PropTypes.string.isRequired,
  hintLinkLabel: PropTypes.string.isRequired,
};

export default AuthTemplate;
