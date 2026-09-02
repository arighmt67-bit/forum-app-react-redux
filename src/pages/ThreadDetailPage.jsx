import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
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
    return <p className="empty-state">Memuat diskusi...</p>;
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
    <section className="thread-detail-page">
      <ThreadDetail
        {...threadDetail}
        authUserId={authUser ? authUser.id : null}
        onUpVote={() => onThreadVote('up')}
        onDownVote={() => onThreadVote('down')}
      />
      <h3 className="section-title">
        Komentar (
        {threadDetail.comments.length}
        )
      </h3>
      {authUser ? (
        <CommentInput onSubmit={onAddComment} />
      ) : (
        <p className="empty-state">Masuk terlebih dahulu untuk berkomentar.</p>
      )}
      <CommentList
        comments={threadDetail.comments}
        authUserId={authUser ? authUser.id : null}
        onUpVote={(commentId) => onCommentVote(commentId, 'up')}
        onDownVote={(commentId) => onCommentVote(commentId, 'down')}
      />
    </section>
  );
}

export default ThreadDetailPage;
