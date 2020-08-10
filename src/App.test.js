import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr, checkProps } from "./../Utils/index";

import Header from "./component/header/header";
import HeadLine from "./component/headline/headline";

import { types } from "./actions/types";
import postReducer from "./reducers/posts/reducer";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

///////////////////////////////FOR HEADER////////////////////
const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};
/////////////////////////FOR HEADLINE/////////////////////////////
const setUp1 = (props = {}) => {
  const comp = shallow(<HeadLine {...props} />);
  return comp;
};

///////////////////////////////FOR HEADER////////////////////
describe("Header Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAtrr(component, "headerComponent");
    expect(wrapper.length).toBe(1);
  });

  it("Should render Logo", () => {
    const logo = findByTestAtrr(component, "logoIMG");
    //  const logo = component.find(`[data-test="logoIMG"]`);
    expect(logo.length).toBe(1);
  });
});

/////////////////////////FOR HEADLINE/////////////////////////////
describe("Headline Component", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        header: "Test Header",
        desc: "Test Desc",
      };
      wrapper = setUp1(props);
    });

    it("Should render without errors", () => {
      const component = findByTestAtrr(wrapper, "HeadlineComponent");
      expect(component.length).toBe(1);
    });

    it("Should render without errors", () => {
      const h1 = findByTestAtrr(wrapper, "header");
      expect(h1.length).toBe(1);
    });

    it("Should render without errors", () => {
      const desc = findByTestAtrr(wrapper, "desc");
      expect(desc.length).toBe(1);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });

    it("Should not render", () => {
      const component = findByTestAtrr(wrapper, "HeadlineComponent");
      expect(component.length).toBe(0);
    });
  });

  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        header: "Test Header",
        desc: "Test Desc",
        tempArr: [
          {
            fName: "Test fName",
            lName: "Test lName",
            email: "Test email",
            age: 23,
            onlineStatus: true,
          },
        ],
      };

      const propsErr = checkProps(HeadLine, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
});

/////////////////////REDUCERS STATE////////////
describe("Post Reducers", () => {
  it("Should return default state", () => {
    const newState = postReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it("Should return new state if recieving type", () => {
    const posts = [{ title: "Test 1" }, { title: "Test 2" }];

    const newState = postReducer(undefined, {
      type: types.GET_POSTS,
      payload: posts,
    });
    expect(newState).toEqual(posts);
  });
});
