import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'users/receive',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    const users = await api.getAllUsers();
    dispatch(receiveUsersActionCreator(users));
  };
}

export { ActionType, receiveUsersActionCreator, asyncReceiveUsers };
