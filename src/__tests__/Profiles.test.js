//Michael Worrell
import React from 'react';
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import { createStore } from "redux";
import mainReducer from '../redux/reducers';
import ProfilePage from '../Components/Profile/ProfilePage';
import ProfileList from '../Components/Profile/ProfileList';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import { it } from 'date-fns/locale';


Enzyme.configure({ adapter: new Adapter() });

describe("Test profile page rendering", () => {


    let wrapper;

    test("Checking page", () => {
        let divFinder = wrapper.find("ProfileList");
        expect(divFinder).toBeTruthy();
    });



    beforeEach(() => {
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
        wrapper = mount(<Provider store={store}><ProfilePage /></Provider>);

        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })


})

describe("test profile list", () => {

    const mockClick = { preventDefault: jest.fn() };

    const detail = [{
        batchDeadline: null,
        associateCount: 20,
        neededCategories: null,
    }];

    const initialState = {
        batchReducer: {
            associateAssignments: [{
                associate: {
                    email: 'mock11.associatee298a9c4-9e50-49c5-986d-b834b9843a2c@mock.com',
                    firstName: 'Ben',
                    lastName: 'Talham',
                }
            }]
        },
        credReducer: {
            userObject: {
                userId: 1
            },
            token: "minority"
        }
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )


    jest.mock('axios', () => {
        const detail = [{
            batchDeadline: null,
            associateCount: 20,
            neededCategories: null,
        }];

        jest.mock('axios', () => {
            const detail = [{
                batchDeadline: null,
                associateCount: 20,
                neededCategories: null,
            }];
    
            return {
    
                get: jest.fn(() => Promise.resolve(detail))
                
            };
        });
        return {

            get: jest.fn(() => Promise.resolve(detail))
            
        };
    });

    let wrapper;
    const setTrigger = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [trigger, setTrigger]);

/*     test("Changing Textboxes", ()=>{
        const textFields = wrapper.find("TextField");
        let inputFields = wrapper.find("input");
        const submitButton = wrapper.find("button");
        expect(submitButton.props("onChange")(mockClick)).toBe()
    }); */
    test("Clicking Button", ()=>{
        const submitButton = wrapper.find("button");
        expect(submitButton.length).toBe(1);
        submitButton.simulate('click');
    });
    test("Changing text", () =>{
        const textField = wrapper.find("input");
        textField.at(0).simulate('change', { target: { value: 'Rico' } });
        textField.at(1).simulate('change', { target: { value: 'Sauves' } });

    })

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><ProfileList /></Provider>);
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());

        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });

    })



}) 