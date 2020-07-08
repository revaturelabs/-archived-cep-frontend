import { STORE_CREDENTIALS, ADD_USERID, ADD_ROLE, ADD_USER_OBJECT } from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    role: null,
    userObject: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case STORE_CREDENTIALS:
            state.token = action.payload
            return state;
        //Most likely will want to store userId and role alongside the JWT in an object in the store credentials action
        case ADD_USERID:
            state.userId = action.payload;
            return state;
        case ADD_ROLE:
            state.role = action.payload
            return state;
        case ADD_USER_OBJECT:
            state.userObject = action.payload
            return state;
        default:
            return state;
    }
}