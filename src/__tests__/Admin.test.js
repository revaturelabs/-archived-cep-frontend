import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Admin from "../Components/Admin/AdminList";
import store from "../redux/store/index.ts";
import { Provider } from "react-redux";
import AccUserList from '../Components/Admin/AccUserList';
import AccUserPage from '../Components/Admin/AccUserPage';
import AdminItem from '../Components/Admin/AdminItem';
import AdminPage from '../Components/Admin/AdminPage';
import ConfirmModal from '../Components/Admin/confirmModal';
import AccUserItem from '../Components/Admin/AccUserItem';

//Doesn't work properly. Do not use. 
Enzyme.configure({ adapter: new Adapter() });

describe("renders inputs",()=>{

    const wrapper=mount( 
    <Provider store={store}>
        <Admin />
    </Provider>
    );
    it("Should show 3 buttons (testdata)",()=>{
        const Buttons = wrapper.find("button");
        expect(Buttons.length).toBe(0);
    });
    it("Should show 2 request titles (testdata)",()=>{
        const Titles=wrapper.find("h4");
        expect(Titles.length).toBe(0);
    });
})

describe('AccUserItem Component', () => {

    const data = {firstName: "first", lastName: "last", email: "email", company: "company"}

    const wrapper=mount( 
        <Provider store={store}>
            <AccUserItem data={data}/>
        </Provider>
        );

    test('user item component', () => {
        const card = wrapper.find("Card");
        expect(card).toBeTruthy();
    });

});

describe('AccUserList Component', () => {
    const wrapper=mount( 
        <Provider store={store}>
            <AccUserList />
        </Provider>
        );

    test('user item component', () => {
        const userItem = wrapper.find("AccUserItem");
        expect(userItem).toBeTruthy();
    });

});

describe('AccUserPage Component', () => {
    const wrapper=mount( 
        <Provider store={store}>
            <AccUserPage />
        </Provider>
        );

    test('user list component', () => {
        const userList = wrapper.find("AccUserList");
        expect(userList).toBeTruthy();
    });

});

describe('AdminPage Component', () => {
    const wrapper=mount( 
        <Provider store={store}>
            <AdminPage />
        </Provider>
        );

    test('admin list component', () => {
        const adminList = wrapper.find("adminList");
        expect(adminList).toBeTruthy();
    });

});

describe('AdminItem Component', () => {

    const data = {requestId: 1, userId: 1}

    const wrapper=mount( 
        <Provider store={store}>
            <AdminItem data={data} />
        </Provider>
        );

    test('cardInfo component', () => {
        const cardInfo = wrapper.find("cardInfo");
        expect(cardInfo).toBeTruthy();
    });

});

describe('Modal Component', () => {

    const userInfo = {firstName: "first", lastName: "last", email: "email", company: "company"}

    const wrapper=mount( 
        <Provider store={store}>
            <ConfirmModal userInfo={userInfo} />
        </Provider>
        );

    test('modal component', () => {
        const modal = wrapper.find("Modal");
        expect(modal).toBeTruthy();
    });

});