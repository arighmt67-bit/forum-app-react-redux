import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import VoteButton from './VoteButton';
import { postedAt, truncate } from '../utils';

function ThreadItem({
  id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments,
  owner, authUserId = null, onUpVote, onDownVote, onCategoryClick,
}) {
  const navigate = useNavigate();

  return (
    <article className="thread-item">
      <div className="thread-item__header">
        <button
          type="button"
          className="badge"
          onClick={() => onCategoryClick(category)}
        >
          #
          {category}
        </button>
        <span className="thread-item__date">{postedAt(createdAt)}</span>
      </div>
      <h3 className="thread-item__title">
        <Link to={`/threads/${id}`}>{title}</Link>
      </h3>
      <p className="thread-item__body">{truncate(body)}</p>
      <footer className="thread-item__footer">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
        <button
          type="button"
          className="thread-item__comments"
          onClick={() => navigate(`/threads/${id}`)}
        >
          {totalComments}
          {' '}
          komentar
        </button>
        <div className="thread-item__owner">
          <img src={owner.avatar} alt={owner.name} className="avatar avatar--small" />
          <span>{owner.name}</span>
        </div>
      </footer>
    </article>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default ThreadItem;
