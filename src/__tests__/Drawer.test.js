import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from '../Components/Common/Drawer/Drawer';

Enzyme.configure({adapter:new Adapter()})

describe("Home Component", ()=>{
    it('should contain two div elements',()=> {
        const wrapper = shallow(<Drawer/>);
        const divider= wrapper.find('div');
        expect(divider.length).toBe(2);
    })
})