import React from 'react';
import PropTypes from 'prop-types';

function PageHeader({ title, description = null }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {description === null ? null : <p>{description}</p>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default PageHeader;
