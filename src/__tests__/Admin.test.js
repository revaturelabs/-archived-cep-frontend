import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Admin from "../Components/Admin/AdminList";
import store from "../redux/store/index.js";
import { Provider } from "react-redux";

//Doesn't work properly. Do not use. 
Enzyme.configure({ adapter: new Adapter() });

describe("renders inputs",()=>{

    const wrapper=mount( 
    <Provider store={store}>
        <Admin />
    </Provider>
    );
    it("Should show 3 buttons (testdata)",()=>{
        const Buttons = wrapper.find("button");
        expect(Buttons.length).toBe(3);
    });
    it("Should show 2 request titles (testdata)",()=>{
        const Titles=wrapper.find("h4");
        expect(Titles.length).toBe(2);
    });
})