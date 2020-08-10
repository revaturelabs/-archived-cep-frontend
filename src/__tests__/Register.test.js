//Michael Worrell
import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { createStore} from "redux";
import mainReducer from '../redux/reducers';
import Register from '../Components/landing/Register';
import ResetPage from '../Components/landing/ResetPassword';

Enzyme.configure({ adapter: new Adapter() });

describe("register comp test", () => {

    const initialState = {
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )

    const userInformation = {
        email: "test@test.com",
        firstName: "test",
        lastName: "est",
        company: "tester",
        phone: "t-e-s-t",
        message: "it's a test",
    }

    let wrapper;
    const setInformation = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [userInformation, setInformation]);

    beforeEach(() => {
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' })
    })

    wrapper = mount(<Provider store={mockStore}><Register></Register></Provider>)

    test("Register components present", () => {
        const comp = wrapper.find('h1').text()

        //console.log("Help: " + comp)

        expect(comp).toBe("Apply for a new account here!");
    })

    test("Register html", () => {
        const html = wrapper.html();

        expect(html).toBeTruthy();
    })
})

describe("reset password test", () => {
    const initialState = {
        credReducer: {
            userObject: {
                userId: 1
            },
            token: "minority"
        }
    }
    const mockStore = createStore(
        mainReducer,
        initialState,
    )

    const userPassword = {
        newPassword: "test",
        rePassword: "test",
        message: "t",
        handleSubmit: jest.fn(),
    }

    let wrapper;
    const setPassword = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [userPassword, setPassword]);

    beforeEach(() => {
        process.env = Object.assign(process.env, { REACT_APP_ZUUL_ROUTE: 'http://localhost:9015' })
    })

    wrapper = shallow(<Provider store ={mockStore}><ResetPage oldPassword={"oldPass"} {...userPassword}></ResetPage></Provider>);

    test("ResetPass Page html", () => {
        const html = wrapper.html();

        expect(html).toBeTruthy();
    })

    test("ResetPass Page new and old pass compare", () => {
        //wrapper.find('Button').simulate('click');

        //expect(userPassword.handleSubmit).toHaveBeenCalledTimes(1);
        //expect(userPassword.handleSubmit).toBeCalledWith({newPassword: userPassword.newPassword, rePassword: userPassword.rePassword, message: userPassword.message})
    })
})