import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from './Drawer';

Enzyme.configure({adapter:new Adapter()})

describe("Home Component", ()=>{
    it('should contain three div elements',()=> {
        const wrapper = shallow(<Drawer/>);
        const divider= wrapper.find('div');
        console.log(wrapper.debug());
        expect(divider.length).toBe(3);
    })
})