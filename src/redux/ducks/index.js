export const actionTypes = {
  ADD_TOKEN: 'ADD_TOKEN',
};

export const actions = {
  addToken: token => ({ type: actionTypes.ADD_TOKEN, payload: token }),
};

const initialState = {
  token: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      state.token = action.payload;
      return state;
    default:
      return state;
  }
};

