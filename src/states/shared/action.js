import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncReceiveUsers } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import api from '../../utils/api';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const [threads] = await Promise.all([api.getAllThreads(), dispatch(asyncReceiveUsers())]);
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      window.alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export default asyncPopulateUsersAndThreads;
