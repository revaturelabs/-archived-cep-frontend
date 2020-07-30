import { ADD_LINK } from "../actions/actionTypes"

interface action {
    type: string,
    payload: string
}

export default function (state = '/', action: action) {
    switch (action.type) {
        case ADD_LINK:
            state = action.payload;
            return state
        default:
            return state
    }
}