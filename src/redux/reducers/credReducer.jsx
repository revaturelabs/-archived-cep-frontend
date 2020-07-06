import { STORE_CREDENTIALS, ADD_USERID, ADD_ROLE } from '../actions/actionTypes';

export default function (state = null, action) {
    switch (action.type) {
        case STORE_CREDENTIALS:
            return action.payload;
        case ADD_USERID:
            return action.payload;
        case ADD_ROLE:
            return action.payload;
        default:
            return state;
    }
}