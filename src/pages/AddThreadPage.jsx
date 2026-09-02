import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="add-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <form className="thread-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Judul</label>
        <input id="title" type="text" value={title} onChange={onTitleChange} required />
        <label htmlFor="category">Kategori</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={onCategoryChange}
          placeholder="misal: react"
        />
        <label htmlFor="body">Isi diskusi</label>
        <textarea id="body" rows="8" value={body} onChange={onBodyChange} required />
        <button type="submit" className="button">Terbitkan</button>
      </form>
    </section>
  );
}

export default AddThreadPage;
