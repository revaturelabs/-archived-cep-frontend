import { ADD_LINK } from "./actionTypes"

export const dispatchLink = (link: string) => {
    return {
        type: ADD_LINK,
        payload: link
    }
}