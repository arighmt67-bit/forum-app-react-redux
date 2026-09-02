import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'threadDetail/addComment',
  TOGGLE_VOTE_THREAD_DETAIL: 'threadDetail/toggleVote',
  TOGGLE_VOTE_COMMENT: 'threadDetail/toggleVoteComment',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
    payload: { threadDetail: null },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function toggleVoteThreadDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}

function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: { commentId, userId, voteType },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      window.alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      window.alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThreadDetail(voteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(toggleVoteThreadDetailActionCreator({ userId: authUser.id, voteType }));

    try {
      await api.voteThread({ threadId: threadDetail.id, voteType });
    } catch (error) {
      dispatch(receiveThreadDetailActionCreator(threadDetail));
      throw error;
    }
  };
}

function asyncToggleVoteComment({ commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(toggleVoteCommentActionCreator({ commentId, userId: authUser.id, voteType }));

    try {
      await api.voteComment({ threadId: threadDetail.id, commentId, voteType });
    } catch (error) {
      dispatch(receiveThreadDetailActionCreator(threadDetail));
      throw error;
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleVoteThreadDetailActionCreator,
  toggleVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
};
