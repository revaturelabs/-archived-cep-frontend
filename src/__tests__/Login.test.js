import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../Components/landing/Login";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import LandingPage from "../Components/landing/LandingPage";
import Register from "../Components/landing/Register";
import ResetPage from "../Components/landing/ResetPassword";

Enzyme.configure({ adapter: new Adapter() });

describe("renders input", () => {
  const mockEvent = { preventDefault: jest.fn() };
  const wrapper = mount(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  it("should have input fields", () => {
    const inputs = wrapper.find("label");
    expect(inputs.length).toBe(2);
  });

  it("click button", () => {
    const submitButton = wrapper.find("button");
    expect(submitButton.length).toBe(1);
    const form = wrapper.find("form");
    expect(form.length).toBe(1);
    expect(form.prop("onSubmit")(mockEvent)).toBe();
  });
}); 

describe('LandingPage Component', () => {


  const wrapper=mount( 
      <Provider store={store}>
          <LandingPage  />
      </Provider>
      );

  test('grid component', () => {
      const grid = wrapper.find("Grid");
      expect(grid).toBeTruthy();
  });

  test('register component', () => {
    const register = wrapper.find("Register");
    expect(register).toBeTruthy();
});

});

describe('Register Component', () => {

  const wrapper=mount( 
      <Provider store={store}>
          <Register  />
      </Provider>
      );

  test('textField component', () => {
      const text = wrapper.find("TextField");
      expect(text).toBeTruthy();
  });

});

describe('ResetPage Component', () => {

  const wrapper=mount( 
      <Provider store={store}>
          <ResetPage  />
      </Provider>
      );

  test('textField component', () => {
      const text = wrapper.find("TextField");
      expect(text).toBeTruthy();
  });

});