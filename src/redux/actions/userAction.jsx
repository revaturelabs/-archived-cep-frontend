import { STORE_CREDENTIALS, ADD_USERID, ADD_ROLE } from './actionTypes';

export const dispatchToken = (token) => {
    console.log("You stored the token: ", token);
    return {
        type: STORE_CREDENTIALS,
        payload: token
    }
};

export const dispatchUserID = (userID) => {
    return {
        type: ADD_USERID,
        payload: userID
    }
}

export const dispatchRole = (role) => {
    return {
        type: ADD_ROLE,
        payload: role
    }
}