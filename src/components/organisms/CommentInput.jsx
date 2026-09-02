import React from 'react';
import PropTypes from 'prop-types';
import TextAreaField from '../molecules/TextAreaField';
import Button from '../atoms/Button';
import useInput from '../../hooks/useInput';

function CommentInput({ onSubmit }) {
  const [content, onContentChange, setContent] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content.trim() === '') {
      return;
    }

    onSubmit(content);
    setContent('');
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <TextAreaField
        id="comment"
        label="Beri komentar"
        value={content}
        onChange={onContentChange}
        placeholder="Tulis komentarmu di sini..."
      />
      <Button isSubmit>Kirim</Button>
    </form>
  );
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentInput;
