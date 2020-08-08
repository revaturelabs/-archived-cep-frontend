//Michael Worrell
import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import { createStore} from "redux";
import mainReducer from '../redux/reducers';
import GetInterventions from '../Components/Common/Intervention/GetInterventions';
import RequestForm from '../Components/Common/Intervention/Intervention';


Enzyme.configure({ adapter: new Adapter() });

describe("get intervention test", () => {
    const details = [{
        batchId: 1,
        name: "test",
        startTime: "2016-03-01",
        endTime: "2016-04-01",
        isAllDay: true,
        status: "Pending",
        requestType: "Intervention",
        description: "testing"
    }];

    let wrapper;
    const setDetails = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [details, setDetails]);

    jest.mock('axios', () => {
        const detail = [{
            batchId: 1,
            name: "test",
            startTime: "2016-03-01",
            endTime: "2016-04-01",
            isAllDay: true,
            status: "Pending",
            requestType: "Intervention",
            description: "testing"
        }];

        return {
            get: jest.fn(() => Promise.resolve(detail))
        };
    });

    //const axios = require('axios');

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><GetInterventions/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })

    test("get intervention", () => {
        wrapper.find('button').props().onClick();
        //const comp = wrapper.find('Button').text();
        expect(setDetails).not.toHaveBeenCalledWith();
        //console.log("Wrapper: " + wrapper.debug());
        //console.log("Wrapper: " + comp);
    })

    test("axios", ()=> {
        wrapper.find('button').props().onClick();
        //console.log("wrapper: " + wrapper.html())
    })
})

describe("intervention comp test", () => {

    const batch = {
        batchId: 1,
        name: "Java/React",
        startDate: "2019-12-03",
        endDate: "2020-03-15",
        skill: "Java and React",
        location: "Arlington, Texas",
        avgStats: 80,
        progress: "",
        week: 0,
    };

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

    const trigger = [{
        batchId: 1,
        userId: 1,
        startTime: null,
        endTime: null,
        isAllDay: true,
        status: "Pending",
        requestType: "test",
        description: "testing"
    }];

    let wrapper;
    const setTrigger = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [trigger, setTrigger]);

    beforeEach(() => {
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' })
    })

    wrapper = mount(<Provider store ={mockStore}><RequestForm batchId={batch.batchId}></RequestForm></Provider>)

    test("intervention info test", () => {
        wrapper.find('button').props().onClick();
        
        //console.log('OOF: ' + wrapper.html());

        //expect(setTrigger).toHaveBeenCalledWith(1);

        //console.log("This: " + wrapper.find('InputLabel'))
    })

    test("intervention prop test", () => {
        const prop = wrapper.html();

        expect(prop).toBeTruthy();
    })
})