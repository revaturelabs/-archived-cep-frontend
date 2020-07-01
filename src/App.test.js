import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminItem from './Components/Admin/AdminItem';
import AdminList from './Components/Admin/AdminList';
import AdminPage from './Components/Admin/AdminPage';

Enzyme.configure({ adapter: new Adapter() });

describe('AdminItem', ()=>{
  it('should render correctly in "debug" mode', ()=>{
    const props = {
      data: {
        companyName: "Test",
        firstName: "Johnny",
        lastName: "Test",
        technology: "Java-React",
        date: "Jan 11, 2020",
        descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "Pending"
      }
    }
    const component = Enzyme.shallow(<AdminItem {...props} />);

    component.setProps({stats:"Complete"})
    expect(component).toMatchSnapshot();
  });
});

describe('AdminList', ()=>{
  it('should render correctly in "debug" mode', ()=>{
    const component = Enzyme.shallow(<AdminList debug />);

    expect(component).toMatchSnapshot();
  });
});

describe('AdminPage', ()=>{
  it('should render correctly in "debug" mode', ()=>{
    const component = Enzyme.shallow(<AdminPage debug />);

    expect(component).toMatchSnapshot();
  });
});

