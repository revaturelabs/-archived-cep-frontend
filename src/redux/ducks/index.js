export const actionTypes = {
  ADD_TOKEN: 'ADD_TOKEN',
  ADD_USERID: 'ADD_USERID',
  ADD_ROLE: 'ADD_ROLE',
  ADD_LINK: 'ADD_LINK',
};

export const actions = {
  addToken: token => ({ type: actionTypes.ADD_TOKEN, payload: token }),
  addUserID: userID => ({ type: actionTypes.ADD_USERID, payload: userID }),
  addRole: role => ({ type: actionTypes.ADD_ROLE, payload: role }),
  addLink: link => ({ type: actionTypes.ADD_LINK, payload: link }),
};

const initialState = {
  token: null,
  userID: null,
  role: null,
  link: '/',
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      state.token = action.payload;
      return state;
    case 'ADD_USERID':
      state.userID = action.payload;
      return state;
    case 'ADD_ROLE':
      state.role = action.payload;
      return state;
    case 'ADD_LINK':
      state.link = action.payload;
      return state;
    default:
      return state;
  }
};

