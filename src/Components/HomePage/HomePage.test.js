import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from './HomePage';

Enzyme.configure({adapter:new Adapter()})

describe("Home Component", ()=>{
    it('should contain one divParent element',()=> {
        const wrapper = shallow(<HomePage/>);
        const parentDiv= wrapper.find('div');
        console.log(wrapper.debug());
        expect(parentDiv.length).toBe(1);
    })

    it('should contain two h1 elements',()=>{
        const wrapper = shallow(<HomePage/>);
        const headers= wrapper.find('h1');
        console.log(wrapper.debug());
        expect(headers.length).toBe(2);
    })
})