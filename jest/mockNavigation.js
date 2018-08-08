/* @flow */
type ReturnValues = {
  [methodName: string]: {
    [param: string]: string,
  },
};

type MockNavigation = {
  getParam: (param: string, defaultId: string) => string,
};

const mockNavigation = (returnValues: ReturnValues) => ({
  getParam: jest.fn((param: string, defaultId: string) => {
    if (returnValues.getParam && returnValues.getParam[param]) {
      return returnValues.getParam[param];
    }
    return defaultId;
  }),
}: MockNavigation);

export default mockNavigation;
