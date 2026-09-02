import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../molecules/FormField';
import TextAreaField from '../molecules/TextAreaField';
import Button from '../atoms/Button';
import useInput from '../../hooks/useInput';

function ThreadForm({ onSubmit }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, body, category });
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <FormField id="title" label="Judul" value={title} onChange={onTitleChange} required />
      <FormField
        id="category"
        label="Kategori"
        value={category}
        onChange={onCategoryChange}
        placeholder="misal: react"
      />
      <TextAreaField
        id="body"
        label="Isi diskusi"
        value={body}
        onChange={onBodyChange}
        rows={8}
        required
      />
      <Button isSubmit>Terbitkan</Button>
    </form>
  );
}

ThreadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ThreadForm;
