import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BatchPage from '../Components/Batch/BatchPage';
import { Provider } from "react-redux";
import store from "../redux/store/index.ts";
import MyBatches from "../Components/batches/MyBatches";
import MyBatchesList from "../Components/batches/MyBatchesList";
import Progress from '../Components/Batch/BatchProgress/progress';

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

    test("Grid component", () => {
        const grid = wrapper.find("Grid")
        expect(grid).toBeTruthy();
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
