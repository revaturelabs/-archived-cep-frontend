import { STORE_CREDENTIALS } from '../actions/actionTypes';

export default function (state = null, action) {
    switch (action.type) {
        case STORE_CREDENTIALS:
            return action.payload;
        default:
            return state;
    }
}