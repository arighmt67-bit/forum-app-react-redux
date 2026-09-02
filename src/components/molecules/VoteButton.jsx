import React from 'react';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

function VoteButton({
  upVotesBy, downVotesBy, authUserId = null, onUpVote, onDownVote,
}) {
  const isUpVoted = authUserId !== null && upVotesBy.includes(authUserId);
  const isDownVoted = authUserId !== null && downVotesBy.includes(authUserId);

  return (
    <div className="vote-button">
      <Button
        ariaLabel="up vote"
        className={`vote-button__item ${isUpVoted ? 'vote-button__item--up-active' : ''}`}
        onClick={onUpVote}
      >
        &#9650;
        <span>{upVotesBy.length}</span>
      </Button>
      <Button
        ariaLabel="down vote"
        className={`vote-button__item ${isDownVoted ? 'vote-button__item--down-active' : ''}`}
        onClick={onDownVote}
      >
        &#9660;
        <span>{downVotesBy.length}</span>
      </Button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default VoteButton;
