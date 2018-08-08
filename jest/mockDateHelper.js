import moment from 'moment';
import '../src/utils/dateHelper';

jest.mock('../src/utils/dateHelper', () => {
  const module = require.requireActual('../src/utils/dateHelper');
  module.nowAsMoment = () => moment.utc('2018-05-15');
  return module;
});
