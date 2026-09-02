import { ActionType } from './action';
import { applyVote } from '../voteHelper';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
      return applyVote(threadDetail, action.payload.userId, action.payload.voteType);
    case ActionType.TOGGLE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (
          comment.id === action.payload.commentId
            ? applyVote(comment, action.payload.userId, action.payload.voteType)
            : comment
        )),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
