import { LOAD_ASSOCIATES } from '../actions/actionTypes';

<<<<<<< HEAD:src/redux/reducers/batchReducer.tsx
export default function (state = null, action: { type: any; payload: any; }) {
=======
export default function (state = null, action: any){
>>>>>>> TSX-Conversion:src/redux/reducers/batchReducer.jsx
    switch (action.type) {
        case LOAD_ASSOCIATES:
            return action.payload;
        default:
            return state;
    }
}