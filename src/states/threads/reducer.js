import { ActionType } from './action';
import { applyVote } from '../voteHelper';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_VOTE_THREAD:
      return threads.map((thread) => (
        thread.id === action.payload.threadId
          ? applyVote(thread, action.payload.userId, action.payload.voteType)
          : thread
      ));
    default:
      return threads;
  }
}

export default threadsReducer;
