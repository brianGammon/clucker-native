import { createStackNavigator } from 'react-navigation';
import AppTabs from './AppTabs';
import EggEditor from '../components/EggEditor';
import ChickenEditor from '../components/ChickenEditor';

export default createStackNavigator(
  {
    Tabs: AppTabs,
    EggEditor,
    ChickenEditor,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
