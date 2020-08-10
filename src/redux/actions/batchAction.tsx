import { LOAD_ASSOCIATES } from './actionTypes';

export const selectBatch = (batch: object) => {
    return {
        type: LOAD_ASSOCIATES,
        payload: batch
    }
};