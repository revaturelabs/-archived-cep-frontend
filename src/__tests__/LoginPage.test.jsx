import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginPage from "../Components/login/LoginPage";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

describe("renders input", () => {
  const mockEvent = { preventDefault: jest.fn() };
  const wrapper = mount(
    <Provider store={store}>
      <LoginPage />
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
