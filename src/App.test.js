import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";
import Header from "./component/header/header";
import HeadLine from "./component/headline/headline";
import { findByTestAtrr } from "./../Utils/index";

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
});
