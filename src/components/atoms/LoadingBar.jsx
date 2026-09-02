import React from 'react';
import ReduxLoadingBar from 'react-redux-loading-bar';

function LoadingBar() {
  return (
    <div className="loading">
      <ReduxLoadingBar style={{ backgroundColor: '#4f46e5', height: '4px' }} />
    </div>
  );
}

export default LoadingBar;
