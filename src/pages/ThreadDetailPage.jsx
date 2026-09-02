import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ThreadDetailTemplate from '../components/templates/ThreadDetailTemplate';
import EmptyState from '../components/atoms/EmptyState';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
} from '../states/threadDetail/action';
import { nextVoteType } from '../states/voteHelper';

function ThreadDetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (threadDetail === null) {
    return <EmptyState message="Memuat diskusi..." />;
  }

  const requireAuth = () => {
    if (authUser === null) {
      navigate('/login');
      return false;
    }

    return true;
  };

  const onThreadVote = (direction) => {
    if (!requireAuth()) {
      return;
    }

    dispatch(asyncToggleVoteThreadDetail(nextVoteType(threadDetail, authUser.id, direction)));
  };

  const onCommentVote = (commentId, direction) => {
    if (!requireAuth()) {
      return;
    }

    const comment = threadDetail.comments.find((item) => item.id === commentId);
    dispatch(asyncToggleVoteComment({
      commentId,
      voteType: nextVoteType(comment, authUser.id, direction),
    }));
  };

  const onAddComment = (content) => {
    if (!requireAuth()) {
      return;
    }

    dispatch(asyncAddComment({ threadId: id, content }));
  };

  return (
    <ThreadDetailTemplate
      threadDetail={threadDetail}
      authUserId={authUser ? authUser.id : null}
      isLoggedIn={authUser !== null}
      onThreadUpVote={() => onThreadVote('up')}
      onThreadDownVote={() => onThreadVote('down')}
      onCommentUpVote={(commentId) => onCommentVote(commentId, 'up')}
      onCommentDownVote={(commentId) => onCommentVote(commentId, 'down')}
      onAddComment={onAddComment}
    />
  );
}

export default ThreadDetailPage;
