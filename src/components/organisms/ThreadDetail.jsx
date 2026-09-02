import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../atoms/Badge';
import VoteButton from '../molecules/VoteButton';
import UserProfile from '../molecules/UserProfile';
import { postedAt, stripHtml } from '../../utils';

function ThreadDetail({
  title, body, category, createdAt, owner, upVotesBy, downVotesBy,
  authUserId = null, onUpVote, onDownVote,
}) {
  return (
    <section className="thread-detail">
      <Badge label={category} />
      <h2 className="thread-detail__title">{title}</h2>
      <div className="thread-detail__body">{stripHtml(body)}</div>
      <div className="thread-detail__meta">
        <UserProfile
          name={owner.name}
          avatar={owner.avatar}
          className="thread-detail__owner"
        />
        <span className="thread-detail__date">{postedAt(createdAt)}</span>
      </div>
      <VoteButton
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        authUserId={authUserId}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    </section>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadDetail;
