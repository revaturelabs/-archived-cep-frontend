import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from '../Components/Common/Drawer/Drawer';
import store from '../redux/store/index';
import { Provider } from 'react-redux';

Enzyme.configure({adapter:new Adapter()})

describe("Home Component", ()=>{
    it('should contain 17 div elements',()=> {
        const wrapper = mount(<Provider store={store}><Drawer/></Provider>);
        const divider= wrapper.find('div');
        expect(divider.length).toBe(17);
    }) 
})