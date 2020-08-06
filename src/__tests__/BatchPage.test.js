import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BatchPage from '../Components/Batch/BatchPage';
import { Provider } from "react-redux";
import store from "../redux/store/index.ts";
import axios from 'axios';
import mockAxios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

describe("testing batch",()=>{

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

    const wrapper=shallow(<Provider store={store}><BatchPage /></Provider>);

    it("Div Length",()=>{
        const div = wrapper.find("div");
        expect(div.length).toBe(0);
    });

    it("Grid Length",()=>{
        const grid = wrapper.find("Grid");
        expect(grid.length).toBe(0);
    });

    it("Card Length",()=>{
        const card = wrapper.find("Card");
        expect(card.length).toBe(0);
    });

    it("Card Header Length",()=>{
        const cardHead = wrapper.find("CardHeader");
        expect(cardHead.length).toBe(0);
    });

    it("Card Content Length",()=>{
        const cardContent = wrapper.find("CardContent");
        expect(cardContent.length).toBe(0);
    });

    it("Batch Details Length",()=>{
        const batchDetails = wrapper.find("GetBatchDetails");
        expect(batchDetails.length).toBe(0);
    });

    it("Card Header Length",()=>{
        const title = wrapper.find("title");
        expect(title.length).toBe(0);
    });
})