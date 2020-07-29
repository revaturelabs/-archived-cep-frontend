import { LOAD_ASSOCIATES } from './actionTypes';

export const selectBatch = (batch) => {
    console.log("You clicked on a batch: ", batch);
    return {
        type: LOAD_ASSOCIATES,
        payload: batch
    }
};