import { ActionType } from './action';

function isPreloadReducer(isPreload = true, action = {}) {
  if (action.type === ActionType.SET_IS_PRELOAD) {
    return action.payload.isPreload;
  }

  return isPreload;
}

export default isPreloadReducer;
