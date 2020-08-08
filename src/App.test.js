import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";
import Header from "./component/header/header";
import { findByTestAtrr } from "./../Utils/index";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

test("renders learn react link", () => {
  const { getByText } = render(<App />);
});

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
