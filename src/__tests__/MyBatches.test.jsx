import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MyBatches from "../Components/batches/MyBatches";
import MyBatchesList from "../Components/batches/MyBatchesList";
import { Provider } from 'react-redux';
import store from '../redux/store/index';

Enzyme.configure({ adapter: new Adapter() });

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





