//Worked on by Michael Worrel
import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BatchPage from '../Components/Batch/BatchPage';
import { Provider } from "react-redux";
import store from "../redux/store/index.ts";
import MyBatches from "../Components/batches/MyBatches";
import MyBatchesList from "../Components/batches/BatchComponent";
import Progress from '../Components/Batch/BatchProgress/progress';
import { createStore, compose, applyMiddleware } from "redux";
import batchReducer from '../redux/reducers/batchReducer';
import credReducer from '../redux/reducers/credReducer';
import mainReducer from '../redux/reducers';
import GetBatchDetails from '../Components/Batch/GetBatches';

Enzyme.configure({ adapter: new Adapter() });

describe("testing batch", () => {

    const id = 1;
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
            token: "minority",
            userId: 1
        }
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )

    beforeEach(() => {
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' })
    })

    const wrapper = shallow(<Provider store={mockStore}><BatchPage /></Provider>);

    it("Div Length", () => {
        const div = wrapper.find("div");
        expect(div.length).toBe(0);
    });

    it("Grid Length", () => {
        const grid = wrapper.find("Grid");
        expect(grid.length).toBe(0);
    });

    it("Card Length", () => {
        const card = wrapper.find("Card");
        expect(card.length).toBe(0);
    });

    it("Card Header Length", () => {
        const cardHead = wrapper.find("CardHeader");
        expect(cardHead.length).toBe(0);
    });

    it("Card Content Length", () => {
        const cardContent = wrapper.find("CardContent");
        expect(cardContent.length).toBe(0);
    });

    it("Batch Details Length", () => {
        const batchDetails = wrapper.find("GetBatchDetails");
        expect(batchDetails.length).toBe(0);
    });

    it("Card Header Length", () => {
        const title = wrapper.find("title");
        expect(title.length).toBe(0);
    });

    test("Grid component", () => {
        const grid = wrapper.find("Grid")
        expect(grid).toBeTruthy();
    })

    test("props", () => {
        const prop = wrapper.html();
        expect(prop).toBeTruthy();
    })
})

describe("MyBatches Component", () => {
    const id = 1;
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
    const wrapper = mount(<Provider store={store}><MyBatches /></Provider>);

    it("should titles/names of each batch", () => {
        const titles = wrapper.find('div');
        expect(titles.length).toBe(2);
    });

    it('click batch', () => {
        const mockCallBack = jest.fn();
        const wrapper2 = shallow((<MyBatchesList key={id} batch={batch} handleClick={mockCallBack} />));
        const submitButton = wrapper2.find('Link');
        expect(submitButton.length).toBe(1);
        submitButton.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);

        //Can also use this
        //expect(mockCallBack).toHaveBeenCalled();

    });
});

describe("Get Batches Test", () => {
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
            token: "minority",
            userId: 1
        }
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )

    const batch = [{
        batchId: 1,
        name: "Java/React",
        startDate: "2019-12-03",
        endDate: "2020-03-15",
        skill: "Java and React",
        location: "Arlington, Texas",
        avgStats: 80,
        progress: "",
        week: 0,
    }];

    beforeEach(() => {
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' })
    })

    const wrapper3 = shallow(<Provider store ={mockStore}><GetBatchDetails batches ={batch}></GetBatchDetails></Provider>)

    it('props', () => {
        const props = wrapper3.html();
        expect(props).toBeTruthy();
    })

})
