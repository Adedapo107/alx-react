import { shallow, mount } from "enzyme";
import React from "react";
import { App, listNotificationsInitialState, mapStateToProps } from "./App";
import { StyleSheetTestUtils } from "aphrodite";
import AppContext, { user, logOut } from "./AppContext";

import { fromJS } from "immutable";
import { createStore } from "redux";
import { Provider } from "react-redux";
import uiReducer, { initialState } from "../reducers/uiReducer";

const store = createStore(uiReducer, initialState);

describe("<App />", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("App renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("should contain the Login component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Login")).toHaveLength(1);
  });

  it("CourseList is not displayed with isLoggedIn false by default", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("CourseList")).toHaveLength(0);
  });

  it("isLoggedIn is true", () => {
    const wrapper = shallow(<App isLoggedIn={true} />);

    expect(wrapper.find("Login")).toHaveLength(0);
    expect(wrapper.find("CourseList")).toHaveLength(1);
  });
});

describe("App Redux", () => {
  it("mapStateToProps returns the right object from user Login", () => {
    let state = {
      ui: fromJS({
        isUserLoggedIn: true,
      }),
    };

    const result = mapStateToProps(state);

    expect(result).toEqual({ isLoggedIn: true });
  });
  it("mapStateToProps returns the right object from display Drawer", () => {
    let state = {
      ui: fromJS({
        isNotificationDrawerVisible: true,
      }),
    };

    const result = mapStateToProps(state);

    expect(result).toEqual({ displayDrawer: true });
  });
});