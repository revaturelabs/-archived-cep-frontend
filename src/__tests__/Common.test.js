import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../redux/store/index.ts";
import BlankPage from '../Components/Common/BlankPage';
import {Forbbiden, NotFound} from '../Components/Common/ErrorPages';
import GetInterventions from '../Components/Common/Intervention/GetInterventions';

Enzyme.configure({ adapter: new Adapter() });

describe('BlankPage Component', () => {

    const wrapper=mount( 
        <Provider store={store}>
            <BlankPage  />
        </Provider>
        );
  
    test('h1 component', () => {
        const h1 = wrapper.find("h1");
        expect(h1).toBeTruthy();
    });
  
});

describe('Forbidden Component', () => {

    const wrapper=mount( 
        <Provider store={store}>
            <Forbbiden  />
        </Provider>
        );
  
    test('card component', () => {
        const card = wrapper.find("Card");
        expect(card).toBeTruthy();
    });
  
});

describe('NotFound Component', () => {

    const wrapper=mount( 
        <Provider store={store}>
            <NotFound  />
        </Provider>
        );
  
    test('card component', () => {
        const card = wrapper.find("Card");
        expect(card).toBeTruthy();
    });
  
});

describe('GetInterventions Component', () => {

    const wrapper=mount( 
        <Provider store={store}>
            <GetInterventions  />
        </Provider>
        );
  
    test('button component', () => {
        const button = wrapper.find("Button");
        expect(button).toBeTruthy();
    });
  
});

