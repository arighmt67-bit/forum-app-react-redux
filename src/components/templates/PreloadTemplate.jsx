import React from 'react';
import LoadingBar from '../atoms/LoadingBar';

function PreloadTemplate() {
  return (
    <div className="app-preload">
      <LoadingBar />
      <p>Menyiapkan aplikasi...</p>
    </div>
  );
}

export default PreloadTemplate;
