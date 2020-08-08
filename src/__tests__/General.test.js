import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from 'react-redux';
import { createStore} from "redux";
import mainReducer from '../redux/reducers';
import App from "../Components/App";

describe("App.tsx test", () => {
    const initialState = {
        credReducer: {
            token: "minority",
            userId: 1,
            isLoggedIn: true,
            isReset: false,
        }
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )

    const wrapper =  shallow(<Provider store={mockStore}><App></App></Provider>);
    
    test("getting div elements",()=> {
        const myDiv = wrapper.find("div div");
        expect(myDiv).not.toBeNull();
    })
})