/* @flow */
type ReturnVals = {
  [methodName: string]: {
    [param: string]: string,
  },
};

type MockNavigation = {
  getParam: (param: string, defaultId: string) => string,
};

const mockNavigation = (returnVals: ReturnVals) => ({
  getParam: jest.fn((param: string, defaultId: string) => {
    if (returnVals.getParam && returnVals.getParam[param]) {
      return returnVals.getParam[param];
    }
    return defaultId;
  }),
}: MockNavigation);

export default mockNavigation;
