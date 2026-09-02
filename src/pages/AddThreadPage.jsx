import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadForm from '../components/organisms/ThreadForm';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = async ({ title, body, category }) => {
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="add-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <ThreadForm onSubmit={onAddThread} />
    </section>
  );
}

export default AddThreadPage;
