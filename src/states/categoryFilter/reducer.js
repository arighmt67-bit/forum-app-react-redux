import { ActionType } from './action';

function categoryFilterReducer(category = '', action = {}) {
  if (action.type === ActionType.SET_CATEGORY_FILTER) {
    return action.payload.category;
  }

  return category;
}

export default categoryFilterReducer;
