import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

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
      <label htmlFor="comment">Beri komentar</label>
      <textarea
        id="comment"
        rows="4"
        value={content}
        onChange={onContentChange}
        placeholder="Tulis komentarmu di sini..."
      />
      <button type="submit" className="button">Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentInput;
