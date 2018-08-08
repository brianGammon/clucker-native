import React from "react";
import { Text, Linking } from "react-native";
import configureStore from "redux-mock-store";
import withLinking from "../withLinking";

const middlewares = [];
const mockStore = configureStore(middlewares);

const mockNavigation = {
  dispatch: jest.fn()
};

const action = {
  action1: "test",
  action: {
    action2: "test2",
    action: {
      action3: "test3"
    }
  }
};

const router = {
  getActionForPathAndParams: jest.fn()
};

beforeEach(() => {
  mockNavigation.dispatch.mockClear();
  router.getActionForPathAndParams = jest.fn();
});

test("withLinking wraps navigation component", () => {
  const store = mockStore({
    initialUrl: "clucker://test"
  });

  router.getActionForPathAndParams = jest.fn(() => action.action.action);
  const mock = () => <Text>Test Component</Text>;
  mock.router = router;

  // No uriPrefix for coverage
  const MockComponent = withLinking(mock);
  const wrapper = shallow(
    <MockComponent store={store} navigation={mockNavigation} />
  ).dive();
  expect(wrapper).toMatchSnapshot();
  expect(router.getActionForPathAndParams).toBeCalledWith("test", {});
  // Tests have a 1 level deep navigation action
  expect(mockNavigation.dispatch).toBeCalledWith(action.action.action);
  // For coverage of componentWillUnmount
  wrapper.instance().componentWillUnmount();
});

test("No initialUrl", () => {
  const store = mockStore({
    initialUrl: ""
  });

  const mock = () => <Text>Test Component</Text>;
  mock.router = router;

  const MockComponent = withLinking(mock, "clucker://");
  shallow(<MockComponent store={store} navigation={mockNavigation} />).dive();
  expect(Linking.addEventListener).toBeCalledWith("url", expect.anything());
  expect(router.getActionForPathAndParams).not.toBeCalled();
  expect(mockNavigation.dispatch).not.toBeCalled();
});

test("No prefix in initialUrl, and double action", () => {
  const store = mockStore({
    initialUrl: "test/test2"
  });

  router.getActionForPathAndParams = jest.fn(() => action.action);
  const mock = () => <Text>Test Component</Text>;
  mock.router = router;

  const MockComponent = withLinking(mock, "clucker://");
  shallow(<MockComponent store={store} navigation={mockNavigation} />).dive();
  expect(router.getActionForPathAndParams).toBeCalledWith("test/test2", {});
  expect(mockNavigation.dispatch).toBeCalledWith(action.action.action);
});

test("Triple action", () => {
  const store = mockStore({
    initialUrl: "test/test2/test3"
  });

  router.getActionForPathAndParams = jest.fn(() => action);

  const mock = () => <Text>Test Component</Text>;
  mock.router = router;

  const MockComponent = withLinking(mock, "clucker://");
  shallow(<MockComponent store={store} navigation={mockNavigation} />).dive();
  expect(mockNavigation.dispatch).toBeCalledWith(action.action.action);
});

test("No action found", () => {
  const store = mockStore({
    initialUrl: "someBadPath"
  });

  const mock = () => <Text>Test Component</Text>;
  mock.router = router;

  const MockComponent = withLinking(mock, "clucker://");
  shallow(<MockComponent store={store} navigation={mockNavigation} />).dive();
  expect(mockNavigation.dispatch).not.toBeCalled();
});
