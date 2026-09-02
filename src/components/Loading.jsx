import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="loading">
      <LoadingBar style={{ backgroundColor: '#4f46e5', height: '4px' }} />
    </div>
  );
}

export default Loading;
