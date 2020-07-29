import { ADD_LINK } from "./actionTypes"

export const dispatchLink = (link) => {
    return {
        type: ADD_LINK,
        payload: link
    }
}