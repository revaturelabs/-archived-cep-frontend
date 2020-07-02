import { STORE_CREDENTIALS } from './actionTypes';

export const dispatchToken = (token) => {
    console.log("You stored the token: ", token);
    return {
        type: STORE_CREDENTIALS,
        payload: token
    }
};