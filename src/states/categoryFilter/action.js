const ActionType = {
  SET_CATEGORY_FILTER: 'categoryFilter/set',
};

function setCategoryFilterActionCreator(category) {
  return {
    type: ActionType.SET_CATEGORY_FILTER,
    payload: { category },
  };
}

export { ActionType, setCategoryFilterActionCreator };
