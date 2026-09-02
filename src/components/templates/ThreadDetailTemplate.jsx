import React from 'react';
import PropTypes from 'prop-types';
import ThreadDetail from '../organisms/ThreadDetail';
import CommentList from '../organisms/CommentList';
import CommentInput from '../organisms/CommentInput';
import EmptyState from '../atoms/EmptyState';

function ThreadDetailTemplate({
  threadDetail, authUserId = null, isLoggedIn, onThreadUpVote, onThreadDownVote,
  onCommentUpVote, onCommentDownVote, onAddComment,
}) {
  return (
    <section className="thread-detail-page">
      <ThreadDetail
        {...threadDetail}
        authUserId={authUserId}
        onUpVote={onThreadUpVote}
        onDownVote={onThreadDownVote}
      />
      <h3 className="section-title">
        Komentar (
        {threadDetail.comments.length}
        )
      </h3>
      {isLoggedIn ? (
        <CommentInput onSubmit={onAddComment} />
      ) : (
        <EmptyState message="Masuk terlebih dahulu untuk berkomentar." />
      )}
      <CommentList
        comments={threadDetail.comments}
        authUserId={authUserId}
        onUpVote={onCommentUpVote}
        onDownVote={onCommentDownVote}
      />
    </section>
  );
}

ThreadDetailTemplate.propTypes = {
  threadDetail: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  onThreadUpVote: PropTypes.func.isRequired,
  onThreadDownVote: PropTypes.func.isRequired,
  onCommentUpVote: PropTypes.func.isRequired,
  onCommentDownVote: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default ThreadDetailTemplate;
