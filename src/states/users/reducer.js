import { ActionType } from './action';

function usersReducer(users = [], action = {}) {
  if (action.type === ActionType.RECEIVE_USERS) {
    return action.payload.users;
  }

  return users;
}

export default usersReducer;
