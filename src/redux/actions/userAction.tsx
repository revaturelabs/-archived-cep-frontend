import { STORE_CREDENTIALS, ADD_USERID, ADD_ROLE, ADD_USER_OBJECT, LOGGED_IN, LOGGED_OUT, IS_RESET } from './actionTypes';

export const dispatchToken = (token: string) => {
    //console.log("You stored the token: ", token);
    return {
        type: STORE_CREDENTIALS,
        payload: token
    }
};

export const dispatchUserID = (userID: number) => {
    return {
        type: ADD_USERID,
        payload: userID
    }
}

export const dispatchRole = (role: string) => {
    return {
        type: ADD_ROLE,
        payload: role
    }
}

export const dispatchUserObject = (user: object) => {
    return {
        type: ADD_USER_OBJECT,
        payload: user
    }
}

export const dispatchLoggedIn= ()=>{
    return {type: LOGGED_IN}
}

export const dispatchLoggedOut= ()=>{
    return {type: LOGGED_OUT}
}

export const dispatchIsReset= (resetPassword: boolean)=>{
    return {
        type: IS_RESET,
        payload: resetPassword
    }
}