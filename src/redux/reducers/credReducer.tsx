import { STORE_CREDENTIALS, ADD_USERID, ADD_ROLE, ADD_USER_OBJECT, LOGGED_IN, LOGGED_OUT, IS_RESET } from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    role: null,
    userObject: null,
    isLoggedIn: false
}

interface action {
    type: string,
    payload: any
}

export default function (state = initialState, action: action) {
    switch (action.type) {
        case STORE_CREDENTIALS:
            //state.token = action.payload
            return { ...state, token: action.payload };
        //Most likely will want to store userId and role alongside the JWT in an object in the store credentials action
        case ADD_USERID:
            //state.userId = action.payload;
            return { ...state, userId: action.payload };
        case ADD_ROLE:
            //state.role = action.payload
            return { ...state, role: action.payload };
        case ADD_USER_OBJECT:
            //state.userObject = action.payload
            return { ...state, userObject: action.payload };
        case LOGGED_IN:
            //state.isLoggedIn = true;
            return { ...state, isLoggedIn: true };
        case LOGGED_OUT:
            //state.isLoggedIn = false;
            return { ...state, isLoggedIn: false };
        case IS_RESET:
            //state.isLoggedIn = false;
            return { ...state, isReset: action.payload };
        default:
            return state;
    }
}