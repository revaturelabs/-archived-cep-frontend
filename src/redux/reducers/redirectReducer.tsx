import { ADD_LINK } from "../actions/actionTypes"

export default function (state = '/', action: { type: any; payload: string; }) {
    switch (action.type) {
        case ADD_LINK:
            state = action.payload;
            return state
        default:
            return state
    }
}