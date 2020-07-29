import { ADD_LINK } from "../actions/actionTypes"

<<<<<<< HEAD:src/redux/reducers/redirectReducer.tsx
export default function (state = '/', action: { type: any; payload: string; }) {
=======

export default function (state = '/', action: any) {
>>>>>>> TSX-Conversion:src/redux/reducers/redirectReducer.jsx
    switch (action.type) {
        case ADD_LINK:
            state = action.payload;
            return state
        default:
            return state
    }
}