//Armondo Gomez
import React from 'react';
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import Calendar from '../Components/Common/Calendar/Calendar';
// import CalModal from '../Components/Common/Calendar/Calmodal';
import Event from '../Components/Common/Calendar/Event';


Enzyme.configure({ adapter: new Adapter() });

describe("test calendar", () => {
    // const details = [{
    //     batchId: 1,
    //     name: "test",
    //     startTime: "2020-10-08",
    //     endTime: "2016-04-01",
    //     isAllDay: true,
    //     status: "Pending",
    //     requestType: "Intervention",
    //     description: "testing"
    // }];

    let wrapper;
    // const setDetails = jest.fn();

    it("click buttons", () => {
        const currentYear = wrapper.find(".chevron");
        expect(currentYear.at(0).text()).toBe("<");
        currentYear.at(0).simulate('click');
        expect(currentYear.at(1).text()).toBe(">");
        currentYear.at(1).simulate('click');
        expect(currentYear.at(2).text()).toBe("<");
        currentYear.at(2).simulate('click');
        expect(currentYear.at(3).text()).toBe(">");
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
// describe("test calModal", () => {
//     const details = [{
//         batchId: 1,
//         name: "test",
//         startTime: "2020-10-08",
//         endTime: "2016-04-01",
//         isAllDay: true,
//         status: "Pending",
//         requestType: "Intervention",
//         description: "testing"
//     }];

//     let wrapper;

//     it("click event", () => {

//       });

//       beforeEach(() => {
//         wrapper = mount(<Provider store={store}><CalModal Events={details}/></Provider>);
//         process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' });
//     })
// })
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
