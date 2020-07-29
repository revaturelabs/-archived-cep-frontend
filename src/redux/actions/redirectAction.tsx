import { ADD_LINK } from "./actionTypes"

export const dispatchLink = (link: any) => {
    return {
        type: ADD_LINK,
        payload: link
    }
}