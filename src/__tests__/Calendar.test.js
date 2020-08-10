//Armondo Gomez
import React from 'react';
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import { createStore} from "redux";
import mainReducer from '../redux/reducers';
import GetInterventions from '../Components/Common/Intervention/GetInterventions';
import RequestForm from '../Components/Common/Intervention/Intervention';
import Calendar from '../Components/Common/Calendar/Calendar';
import { ExpansionPanelActions } from '@material-ui/core';
import CalModal from '../Components/Common/Calendar/Calmodal';
import Event from '../Components/Common/Calendar/Event';


Enzyme.configure({ adapter: new Adapter() });

describe("test calendar", () => {
    const details = [{
        batchId: 1,
        name: "test",
        startTime: "2020-10-08",
        endTime: "2016-04-01",
        isAllDay: true,
        status: "Pending",
        requestType: "Intervention",
        description: "testing"
    }];

    let wrapper;
    const setDetails = jest.fn();

    it("click buttons", () => {
        const currentYear = wrapper.find(".icon");
        expect(currentYear.at(0).text()).toBe("chevron_left");
        currentYear.at(0).simulate('click');
        expect(currentYear.at(1).text()).toBe("chevron_right");
        currentYear.at(1).simulate('click');
        expect(currentYear.at(2).text()).toBe("P");
        currentYear.at(2).simulate('click');
        expect(currentYear.at(3).text()).toBe("N");
        currentYear.at(3).simulate('click');
        const dayCell = wrapper.find(".cell");
        expect(dayCell.at(15).text()).toBe("10");
        dayCell.at(15).simulate('click');
      });

      beforeEach(() => {
        wrapper = mount(<Provider store={store}><Calendar/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })
})
describe("test calModal", () => {
    const details = [{
        batchId: 1,
        name: "test",
        startTime: "2020-10-08",
        endTime: "2016-04-01",
        isAllDay: true,
        status: "Pending",
        requestType: "Intervention",
        description: "testing"
    }];

    let wrapper;

    it("click event", () => {

      });

      beforeEach(() => {
        wrapper = mount(<Provider store={store}><CalModal Events={details}/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })
})
describe("test event component", () => {
    let details = [{
        batchId: 1,
        name: "test",
        startTime: "2020-10-08",
        endTime: "2020-10-08",
        isAllDay: true,
        status: "Pending",
        requestType: "Intervention",
        description: "testing",
        userId: 1
    },{
        batchId: 1,
        name: "test",
        startTime: "2020-10-08",
        endTime: "2020-10-08",
        isAllDay: true,
        status: "Pending",
        requestType: "Help",
        description: "testing",
        userId: 1
    },{
        batchId: 1,
        name: "test",
        startTime: "2020-10-08",
        endTime: "2020-10-08",
        isAllDay: true,
        status: "Pending",
        requestType: "Talent",
        description: "testing",
        userId: 1
    }];

    let wrapper;

    it("click buttons", () => {
        
        const eventDiv = wrapper.find("button");
        expect(eventDiv.text()).toBe("UserId: 1 BatchID 1");
        eventDiv.simulate('click');
      });

      beforeEach(() => {
        wrapper = mount(<Provider store={store}><Event eventItem={details[0]}/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })
    it("Testing colors", () => {
        
        const eventDiv = wrapper.find("button");
        expect(eventDiv.text()).toBe("UserId: 1 BatchID 1");
        eventDiv.simulate('click');
      });

      beforeEach(() => {
        wrapper = mount(<Provider store={store}><Event eventItem={details[1]}/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })
    it("Testing colors", () => {
        
        const eventDiv = wrapper.find("button");
        expect(eventDiv.text()).toBe("UserId: 1 BatchID 1");
        eventDiv.simulate('click');
      });

      beforeEach(() => {
        wrapper = mount(<Provider store={store}><Event eventItem={details[2]}/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })
})

/* describe("test if intervention is in the cell", () => {
    const details = [{
        batchId: 1,
        name: "test",
        startTime: "2020-10-08",
        endTime: "2016-04-01",
        isAllDay: true,
        status: "Pending",
        requestType: "Intervention",
        description: "testing"
    }];

    let wrapper;
    const setDetails = jest.fn();

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

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><Calendar/></Provider>);
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
    })

    test("get intervention", () => {
        wrapper.find('button').props().onClick();
        expect(setDetails).not.toHaveBeenCalledWith();

    })

    test("axios", ()=> {
        wrapper.find('button').props().onClick();
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

    wrapper = mount(<Provider store ={mockStore}><RequestForm batchId={batch.batchId} batch={batch}></RequestForm></Provider>)

    test("intervention info test", () => {
        wrapper.find('button').props().onClick();
    })

    test("intervention prop test", () => {
        const prop = wrapper.html();
        expect(prop).toBeTruthy();
    })
}) */