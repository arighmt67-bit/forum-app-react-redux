import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';
import EmptyState from '../atoms/EmptyState';

const threadShape = PropTypes.shape({
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
});

function ThreadList({
  threads, authUserId = null, onUpVote, onDownVote, onCategoryClick,
}) {
  if (threads.length === 0) {
    return <EmptyState message="Belum ada diskusi pada kategori ini." />;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(threadShape).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default ThreadList;
