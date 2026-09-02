import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h2>404</h2>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/" className="button">Kembali ke beranda</Link>
    </section>
  );
}

export default NotFoundPage;
