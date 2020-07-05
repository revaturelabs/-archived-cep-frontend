import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MyBatches from "./MyBatches";
import { spy } from "sinon";
import MyBatchesList from "./MyBatchesList";
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-hooks';
import store from '../../redux/store/index.js';

Enzyme.configure({ adapter: new Adapter() });

describe("MyBatches Component", () => {
  const id = 1;
  const batch = {
    id: 1,
    name: "Java/React",
    startDate: "2019-12-03",
    endDate: "2020-03-15",
    skills: "Java and React",
    location: "Arlington, Texas",
    avgStats: 80,
    progress: "",
    week: 0,
  };
  let batchSpy = spy();
  const wrapper = mount(<Provider store={store}><MyBatches /></Provider>);
  const wrapper2 = shallow(
    <MyBatchesList key={id} batch={batch} handleClick={batchSpy} />
  );

  it("should titles/names of each batch", () => {
    const titles = wrapper.find('h4');
    expect(titles.length).toBe(8);
  });

  it('click button', () => {
    const mockCallBack = jest.fn();
    const wrapper3 = shallow((<MyBatchesList key={id} batch={batch} handleClick={mockCallBack} />));
    const submitButton = wrapper3.find('button');
    expect(submitButton.length).toBe(1);
    submitButton.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);

    //Can also use this
    //expect(mockCallBack).toHaveBeenCalled();


  });
});





