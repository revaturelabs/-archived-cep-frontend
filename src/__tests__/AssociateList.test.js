//Michael Worrell
import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Admin from "../Components/Admin/AdminList";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import AssociateList from '../Components/Batch/AssociateList/AssociateList';
import { ExpansionPanelActions } from '@material-ui/core';
import { createStore, compose, applyMiddleware } from "redux";
import batchReducer from '../redux/reducers/batchReducer';
import credReducer from '../redux/reducers/credReducer';
import mainReducer from '../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });

describe('testing associate list', () => {
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
            token: "minority"
        }
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )
    const wrapper = shallow(<Provider store={mockStore}><AssociateList batch={batch}></AssociateList></Provider>);

    it('grid length', () => {
        const grid = wrapper.find("Grid");
        expect(grid.length).toBe(0);
    })

    it('props', () => {
        const props = wrapper.find('div');
        expect(props).toBeTruthy();
    })
})

