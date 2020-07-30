import { LOAD_ASSOCIATES } from './actionTypes';

export const selectBatch = (batch: object) => {
    console.log("You clicked on a batch: ", batch);
    return {
        type: LOAD_ASSOCIATES,
        payload: batch
    }
};