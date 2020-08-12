import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr, checkProps } from "./../Utils/index";

import Header from "./component/header/header";
import HeadLine from "./component/headline/headline";
import SharedButton from "./component/button/button";
import App from "./App";
import ListItem from "./component/listItem/ListItem";

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

///////////////////BUTTON COMPONENT//////////////////

describe("Shared Component", () => {
  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {
        buttonText: "Example Button Text",
        emitEvent: () => {},
      };
      const propsError = checkProps(SharedButton, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });

  describe("Render", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        buttonText: "Example Button Text",
        emitEvent: mockFunc,
      };
      wrapper = shallow(<SharedButton {...props} />);
    });
    it("Should render button", () => {
      const button = findByTestAtrr(wrapper, "buttonComponent");
      expect(button.length).toBe(1);
    });

    it("Should emit callback on click event ", () => {
      const button = findByTestAtrr(wrapper, "buttonComponent");
      button.simulate("click");
      const callback = mockFunc.mock.calls.length;
      expect(callback).toBe(1);
    });
  });
});

///////////////////////////LIST ITEM STYLES////////////////
describe("ListItem Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        title: "Example Title",
        desc: "Example desc",
      };
      const propsError = checkProps(ListItem, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });

  describe("Component Renders", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        title: "Example Title",
        desc: "Some text",
      };
      wrapper = shallow(<ListItem {...props} />);
    });
    it("Should render without error", () => {
      const component = findByTestAtrr(wrapper, "listItemComponent");
      expect(component.length).toBe(1);
    });

    it("Should render a title", () => {
      const title = findByTestAtrr(wrapper, "componentTitle");
      expect(title.length).toBe(1);
    });

    it("Should render a desc", () => {
      const desc = findByTestAtrr(wrapper, "componentDesc");
      expect(desc.length).toBe(1);
    });
  });

  describe("Should NOT render", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        desc: "Some text",
      };
      wrapper = shallow(<ListItem {...props} />);
    });

    it("Component is not rendered", () => {
      const component = findByTestAtrr(wrapper, "listItemComponent");
      expect(component.length).toBe(0);
    });
  });
});

//////////////////////////////INTEGRATION TEST///////////////////////////////////////////
import moxios from "moxios";
import { testStore } from "./../Utils/index";
import { fetchPosts } from "./../src/actions/index";

describe("fetchPosts action", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly", () => {
    const expectedState = [
      {
        title: "Example title 1",
        body: "Some Text",
      },
      {
        title: "Example title 2",
        body: "Some Text",
      },
      {
        title: "Example title 3",
        body: "Some Text",
      },
    ];
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(fetchPosts()).then(() => {
      const newState = store.getState();
      expect(newState.posts).toBe(expectedState);
    });
  });
});
///////////////////////////////CONNECTED COMPONENT////////////////////////////////////////////////
const setUP = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("App Component", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      posts: [
        {
          title: "Example title1",
          body: "Some text",
        },
        {
          title: "Example title2",
          body: "Some text",
        },
      ],
    };
    wrapper = setUP(initialState);
  });

  it("Should render without errors", () => {
    const component = findByTestAtrr(wrapper, "appComponent");
    expect(component.length).toBe(1);
  });
});
