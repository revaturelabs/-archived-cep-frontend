import { LOAD_ASSOCIATES } from '../actions/actionTypes';

interface action {
    type: string,
    payload: object
}

export default function (state = null, action: action){
    switch (action.type) {
        case LOAD_ASSOCIATES:
            return action.payload;
        default:
            return state;
    }
}